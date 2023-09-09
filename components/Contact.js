import { Box, FormControl, FormLabel, Input, SelectField, Button, Grid, Container, Heading, Text, Stack } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Router from 'next/router';

import ContactTextES from '../public/langs/es/Contact.json'
import ContactTextEN from '../public/langs/en/Contact.json'



const ContactForm = () => {
    const [telefono, setTelefono] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [reCaptchaResponse, setReCaptchaResponse] = useState("");
    const [contactText, setContactText] = useState(ContactTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setContactText(ContactTextEN);
        } else {
            setContactText(ContactTextES);
        }
    }, []);

    const reCaptchaRef = createRef();

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required(contactText.form.validationSchema.name),
        apellido: Yup.string().required(contactText.form.validationSchema.lastname),
        correo: Yup.string().email(contactText.form.validationSchema.invalidEmail).required(contactText.form.validationSchema.email),
        empresa: Yup.string().required(contactText.form.validationSchema.company),
        opcion: Yup.string().required(contactText.form.validationSchema.option),
        sitioWeb: Yup.string(),
        edad: Yup.string(), // This field is hidden and is used to check if the user is a bot
    });


    useEffect(() => {
        // Get the IP address
        const ip = localStorage.getItem('ip');

        // Check if the IP address is in the local storage
        if (ip) {
            // block the access to the website by changing the location to the 404 page
            window.location.href = '/404';
        }
    }, []);

    const initialValues = {
        nombre: '',
        apellido: '',
        correo: '',
        empresa: '',
        opcion: '',
        sitioWeb: '',
        edad: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        const { nombre, apellido, correo, empresa, opcion, sitioWeb } = values;
        
        const data = {
            "name": nombre,
            "lastname": apellido,
            "phoneNumber": telefono,
            "email": correo,
            "company": empresa,
            "option": opcion ? opcion : 'No hay opción',
            "webSite": sitioWeb ? sitioWeb : 'No hay sitio web',
            "reCaptchaResponse": reCaptchaResponse,
            "uri": "/home"
        };


        // Check if the user is a bot
        if (values.edad) {
            // Store the IP address to block the access to the website
            const ip = await axios.get('https://api.ipify.org?format=json')
                .then((response) => response.data.ip).catch((error) => {
                    localStorage.setItem('ip', 'isBot');
                });
            localStorage.setItem('ip', ip);

            // cookie.set('ip', ip, { expires: 1 });
            // block the access to the website by changing the location to the 404 page and send an email to the admin
            window.location.href = '/404';

            return;
        }

        // check if all the fields are filled
        if (!nombre || !apellido || !telefono || !correo || !empresa || !opcion || !reCaptchaResponse) {
            Swal.fire({
                title: contactText.form.alerts.error.missingFields.title,
                text: contactText.form.alerts.error.missingFields.description,
                icon: 'error',
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                toast: true,
            });
            return;
        }


        try {
            const response = await axios.post('/api/sendMail', data);
            if (response.status === 200) {
                Swal.fire({
                    title: contactText.form.alerts.success.title,
                    icon: 'success',
                    text: contactText.form.alerts.success.description,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    toast: true,
                }).then(() => {
                    setTelefono("")
                    resetForm();
                    // desmarcar el captcha
                    setReCaptchaResponse("");
                    setIsDisabled(true);
                    reCaptchaRef.current.reset();
                });
            } else {
                Swal.fire({
                    title: contactText.form.alerts.error.onSend.title,
                    text: contactText.form.alerts.error.onSend.description,
                    icon: 'error',
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                }).then(() => {
                    setTelefono("")
                    resetForm();
                    // desmarcar el captcha
                    setReCaptchaResponse("");
                    setIsDisabled(true);
                    reCaptchaRef.current.reset();
                });
            }
        } catch (error) {
            Swal.fire({
                title: contactText.form.alerts.error.onSend.title,
                text: contactText.form.alerts.error.onSend.description,
                icon: 'error',
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                toast: true,
            }).then(() => {
                setTelefono("")
                resetForm();
                // desmarcar el captcha
                setReCaptchaResponse("");
                setIsDisabled(true);
                reCaptchaRef.current.reset();
            });
        }
    };

    const handlePhone = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        setTelefono(numericValue);
        initialValues.telefono = telefono;
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form>
                    <Box as={Container} maxW={'6xl'} margin="0 auto">
                        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                                {contactText.heading}
                            </Heading>
                            <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                                {contactText.description}
                            </Text>
                        </Stack>
                        <Grid templateColumns="repeat(2, 1fr)" gap="4">
                            <Field name="nombre">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            {contactText.fields.labels.name}
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="text" placeholder={contactText.fields.placeholders.name} />
                                        <ErrorMessage name="nombre" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="apellido">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            {contactText.fields.labels.lastname}
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="text" placeholder={contactText.fields.placeholders.lastname} />
                                        <ErrorMessage name="apellido" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="telefono">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            {contactText.fields.labels.phone}
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="tel" value={telefono} onChange={handlePhone} minLength={10} maxLength={10} placeholder={contactText.fields.placeholders.phone} />
                                        <ErrorMessage name="telefono" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                        {telefono.length < 10 && telefono.length > 0 && (
                                            <span style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }}>
                                                {contactText.form.validationSchema.invalidphone}
                                            </span>
                                        )}
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="empresa">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            {contactText.fields.labels.company}
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="text" minLength={3} placeholder={contactText.fields.placeholders.company} />
                                        <ErrorMessage name="empresa" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="correo">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            {contactText.fields.labels.email}
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="email" placeholder={contactText.fields.placeholders.email} />
                                        <ErrorMessage name="correo" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="sitioWeb">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            {contactText.fields.labels.website}
                                        </FormLabel>
                                        <Input {...field} type="text" placeholder={contactText.fields.placeholders.website} />
                                        <ErrorMessage name="sitioWeb" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                        </Grid>
                        <Field name="opcion">
                            {({ field }) => (
                                <FormControl marginTop="4" marginBottom="4">
                                    <FormLabel>
                                        {contactText.fields.labels.option}
                                        <span style={{ color: '#000' }}>*</span>
                                    </FormLabel>
                                    <SelectField {...field} placeholder={contactText.fields.placeholders.optiondefault}
                                        w={{ base: '100%', sm: '100%' }}
                                        h={'10'}
                                        border={'1px solid'}
                                        borderRadius={'5px'}
                                        borderColor={'gray.200'}
                                    >
                                        {/* forEach */}
                                        {
                                            contactText.fields.placeholders.option.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))
                                        }
                                    </SelectField>
                                    <ErrorMessage name="opcion" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="edad" style={{ display: 'none' }}>
                            {({ field }) => (
                                <FormControl>
                                    <Input {...field} type="text" style={{ display: 'none' }} />
                                </FormControl>
                            )}
                        </Field>

                        <ReCAPTCHA
                            sitekey="6LcF7egnAAAAAAATcdv4rJ4ge3DeEgA3Zt7nY-zj"
                            onChange={(value) => {
                                initialValues.reCaptchaResponse = value;
                                setReCaptchaResponse(value);
                                setIsDisabled(!isDisabled);
                            }}
                            onExpired={() => {
                                initialValues.reCaptchaResponse = "";
                                setReCaptchaResponse("");
                                setIsDisabled(true);
                            }}
                            name="reCaptchaResponse"
                            id='reCaptchaResponse'
                            ref={reCaptchaRef}
                        />

                        <Button colorScheme="green"
                            size="lg"
                            mx="auto"
                            display="block"
                            mt={4}
                            type="submit"
                            isDisabled={isDisabled || !isValid || !dirty}
                        >
                            {contactText.fields.labels.submit}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
