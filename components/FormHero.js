import React, { useState, createRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha'; 
import { Box, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const FormComponent = (formTexts) => {
    console.log(formTexts);
    const [telefono, setTelefono] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [reCaptchaResponse, setReCaptchaResponse] = useState('');

    const reCaptchaRef = createRef();

    const initialValues = {
        name: '',
        email: '',
    };

    const handlePhone = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        setTelefono(numericValue);
    };


    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email(formTexts.texts.validationSchema.emailInvalid).required(formTexts.texts.validationSchema.email),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const { name, email } = values;

        const data = {
            name,
            email,
            "phoneNumber": telefono,
            reCaptchaResponse,
            "uri": "/hero"
        };

        if (!name || !email || !telefono) {
            Swal.fire({
                title: formTexts.texts.alerts.error.missingFields.title,
                text: formTexts.texts.alerts.error.missingFields.description,
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
                    title: formTexts.texts.alerts.success.title,
                    icon: 'success',
                    text: formTexts.texts.alerts.success.description,
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
                    title: formTexts.texts.alerts.error.onSend.title,
                    text: formTexts.texts.alerts.error.onSend.description,
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
                title: formTexts.texts.alerts.error.onSend.title,
                text: formTexts.texts.alerts.error.onSend.description,
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

    return (
        <Box
            position={'relative'}
            minH={'400px'}
            maxH={'auto'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
            padding={'20px'}
            textAlign={'center'}
            bg={useColorModeValue('white', 'gray.900')}
            shadow={'xl'}
        >
            <Heading as={'h2'} size={'md'} marginBottom={'30px'}>
                {formTexts.texts.heading}
            </Heading>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                {formTexts.texts.fields.labels.name}
                            </Text>
                            <Field type="text" name="name" placeholder={formTexts.texts.fields.placeholders.name} className="form-control mb-3" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                {formTexts.texts.fields.labels.phone}
                            </Text>
                            <Field type="tel" name="phoneNumber" placeholder={formTexts.texts.fields.placeholders.phone} className="form-control mb-3"
                                maxLength={10}
                                minLength={10}
                                inputMode="numeric"
                                onChange={handlePhone}
                                value={telefono}
                            />
                            {telefono.length < 10 && telefono.length > 0 && (
                                <span style={{ color: '#EB1111', fontSize: '1rem', marginLeft: 5 }}>
                                    {formTexts.texts.validationSchema.phoneInvalid}
                                </span>
                            )}
                        </div>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                {formTexts.texts.fields.labels.email}
                            </Text>
                            <Field type="email" name="email" placeholder={formTexts.texts.fields.placeholders.email} className="form-control mb-3" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <ReCAPTCHA
                            sitekey="6LcF7egnAAAAAAATcdv4rJ4ge3DeEgA3Zt7nY-zj"
                            onChange={(value) => {
                                setIsDisabled(!isDisabled);
                                setReCaptchaResponse(value);
                            }}
                            onExpired={() => {
                                setIsDisabled(true);
                                setReCaptchaResponse('');
                            }}
                            name="reCaptchaResponse"
                            id='reCaptchaResponse'
                            ref={reCaptchaRef}
                        />

                        <Button
                            type="submit"
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                            colorScheme={'green'}
                            bg={'green.400'}
                            _hover={{ bg: 'green.500' }}
                            mx={'auto'}
                            marginTop={'10px'}
                            isDisabled={isDisabled}
                            isLoading={isSubmitting}
                        >
                            {formTexts.texts.fields.labels.send}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default FormComponent;