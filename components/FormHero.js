import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha'; 
import { Box, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const FormComponent = (formTexts) => {
    const [telefono, setTelefono] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [reCaptchaResponse, setReCaptchaResponse] = useState('');
    const [reCaptchaResponsev3, setReCaptchaResponsev3] = useState('');

    const reCaptchaRef = useRef();

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
        email: Yup.string().email(formTexts.formTexts.validationSchema.emailInvalid).required(formTexts.formTexts.validationSchema.email),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const { name, email } = values;

        if (!name || !email || !telefono) {
            Swal.fire({
                title: formTexts.formTexts.alerts.error.missingFields.title,
                text: formTexts.formTexts.alerts.error.missingFields.description,
                icon: 'error',
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                toast: true,
            });

            reCaptchaRef.current.reset();

            return;
        }

        grecaptcha.ready(() => {
            grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3, { action: 'submit' }).then((token) => {
                setReCaptchaResponsev3(token);
                console.log(token);
            });
        });

        const data = {
            "name": name,
            "email": email,
            "phoneNumber": telefono,
            "reCaptchaResponse": reCaptchaResponse,
            "reCaptchaResponsev3": reCaptchaResponsev3,
            "uri": "/hero"
        };

        console.log(data);

        try {
            const response = await axios.post('/api/sendMail', data);

            if (response.status === 200) {
                Swal.fire({
                    title: formTexts.formTexts.alerts.success.title,
                    icon: 'success',
                    text: formTexts.formTexts.alerts.success.description,
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
                    title: formTexts.formTexts.alerts.error.onSend.title,
                    text: formTexts.formTexts.alerts.error.onSend.description,
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
            console.log(error);
            Swal.fire({
                title: formTexts.formTexts.alerts.error.onSend.title,
                text: formTexts.formTexts.alerts.error.onSend.description,
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
                {formTexts.formTexts.heading}
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
                                {formTexts.formTexts.fields.labels.name}
                            </Text>
                            <Field type="text" name="name" placeholder={formTexts.formTexts.fields.placeholders.name} className="form-control mb-3" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                {formTexts.formTexts.fields.labels.phone}
                            </Text>
                            <Field type="tel" name="phoneNumber" placeholder={formTexts.formTexts.fields.placeholders.phone} className="form-control mb-3"
                                maxLength={10}
                                minLength={10}
                                inputMode="numeric"
                                onChange={handlePhone}
                                value={telefono}
                            />
                            {telefono.length < 10 && telefono.length > 0 && (
                                <span style={{ color: '#EB1111', fontSize: '1rem', marginLeft: 5 }}>
                                    {formTexts.formTexts.validationSchema.phoneInvalid}
                                </span>
                            )}
                        </div>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                {formTexts.formTexts.fields.labels.email}
                            </Text>
                            <Field type="email" name="email" placeholder={formTexts.formTexts.fields.placeholders.email} className="form-control mb-3" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={(value) => {
                                setIsDisabled(!isDisabled);
                                setReCaptchaResponse(value);
                            }}
                            onExpired={() => {
                                setIsDisabled(true);
                                setReCaptchaResponse('');
                            }}
                            ref={reCaptchaRef}
                            name="reCaptchaResponse"
                            id='reCaptchaResponse'
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
                            isDisabled={isDisabled || !isValid || !dirty}
                            isLoading={isSubmitting}
                        >
                            {formTexts.formTexts.fields.labels.send}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default FormComponent;