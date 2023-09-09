import { Container, Stack, Flex, Box, Heading, Text, Button, Icon, Image } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useState, createRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import HeroTextsEN from '../public/langs/en/Hero.json';
import HeroTextsES from '../public/langs/es/Hero.json';
import Router from 'next/router';

export default function CallToActionWithVideo() {
    const [heroTexts, setHeroTexts] = useState(HeroTextsES);
    useEffect(() => {
        console.log(Router.locale);
        if (Router.locale === 'en') {
            setHeroTexts(HeroTextsEN);
        } else {
            setHeroTexts(HeroTextsES);
        }
    }, []);
    return (
        <>
            <Container maxW={'7xl'}>
                <Stack align={'center'} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }} direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                        <Heading as={'h1'} lineHeight={1.1} fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                            <Text as={'span'} position={'relative'} _after={{ content: "''", width: 'full', height: '30%', position: 'absolute', bottom: 1, left: 0, bg: 'green.400', zIndex: -1 }}>
                                {heroTexts.h1}
                            </Text>
                            <br />
                            <Text as={'span'} color={'green.400'}>
                                {heroTexts.h1Underline}
                            </Text>
                        </Heading>
                        <Text color={'gray.800'} textAlign={'justify'}>
                            {heroTexts.description}
                        </Text>
                        <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
                            <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'green'} bg={'green.400'} _hover={{ bg: 'green.500' }} onClick={
                                () => {
                                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                }
                            }>
                                {heroTexts.firstCTA}
                            </Button>
                            <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'green'}
                                bg={'green.400'} _hover={{ bg: 'green.500' }}
                                zIndex={999999}
                                onClick={
                                    () => {
                                        Calendly.initPopupWidget({ url: 'https://calendly.com/tersoft' }); return false;
                                    }}
                            >
                                {heroTexts.secondCTA}
                            </Button>
                        </Stack>
                    </Stack>
                    <Flex flex={1} justify={'center'} align={'center'} position={'relative'} w={'full'}>
                        <Blob w={'150%'} h={'150%'} position={'absolute'} top={'1%'} left={0} zIndex={-1} color={useColorModeValue('green.200', 'green.400')} />
                        <Box
                            position={'relative'}
                            height={'300px'}
                            rounded={'2xl'}
                            boxShadow={'2xl'}
                            width={'full'}
                            overflow={'hidden'}>
                            <Image
                                alt={'Hero Image'}
                                fit={'cover'}
                                align={'center'}
                                w={'100%'}
                                h={'100%'}
                                src={
                                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                                }
                            />
                        </Box>
                    </Flex>
                </Stack>
            </Container>
        </>
    );
}

const Blob = (props) => {
    return (
        <Icon width={'100%'} viewBox="0 0 578 440" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    );
};

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
