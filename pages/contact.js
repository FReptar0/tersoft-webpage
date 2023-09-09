import React, { useState, createRef, useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    useColorModeValue,
    VStack,
    Image,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Swal from 'sweetalert2';
import Router from 'next/router';

import FirstContactTextES from '../public/langs/es/FirstContact.json'
import FirstContactTextEN from '../public/langs/en/FirstContact.json'


const ERPForm = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [reCaptchaResponse, setReCaptchaResponse] = useState('');
    const [telefono, setTelefono] = useState("");
    const reCaptchaRef = createRef();
    const [firstContactText, setFirstContactText] = useState(FirstContactTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setFirstContactText(FirstContactTextEN);
        } else {
            setFirstContactText(FirstContactTextES);
        }
    }, []);

    const modulesOptions = firstContactText.form.modulesOptions
    const companyTypes = firstContactText.form.companyTypes
    const evaluatingERPsOptions = firstContactText.form.evaluatingERPsOptions


    const initialValues = {
        email: '',
        fullName: '',
        jobTitle: '',
        company: '',
        description: '',
        operations: '',
        software: '',
        userCount: '',
        modules: [],
        timeline: '',
        invoiceCount: '',
        improvements: '',
        budget: '',
        companyType: '',
        trainingMethod: '',
        evaluatingERPs: [],
    };

    const FormSchema = Yup.object().shape({
        email: Yup.string().email(firstContactText.form.validationSchema.invalid).required(firstContactText.form.validationSchema.required),
        fullName: Yup.string().required(firstContactText.form.validationSchema.required),
        jobTitle: Yup.string().required(firstContactText.form.validationSchema.required),
        company: Yup.string().required(firstContactText.form.validationSchema.required),
        description: Yup.string().required(firstContactText.form.validationSchema.required),
        operations: Yup.string().required(firstContactText.form.validationSchema.required),
        software: Yup.string().required(firstContactText.form.validationSchema.required),
        userCount: Yup.string().required(firstContactText.form.validationSchema.required),
        modules: Yup.array().required(firstContactText.form.validationSchema.array),
        timeline: Yup.string().required(firstContactText.form.validationSchema.required),
        invoiceCount: Yup.number().required(firstContactText.form.validationSchema.required),
        improvements: Yup.string().required(firstContactText.form.validationSchema.required),
        budget: Yup.string().required(firstContactText.form.validationSchema.required),
        companyType: Yup.string().required(firstContactText.form.validationSchema.required),
        trainingMethod: Yup.string().required(firstContactText.form.validationSchema.required),
        evaluatingERPs: Yup.array().required(firstContactText.form.validationSchema.array),
    });

    const handleSubmit = async (values, { resetForm }) => {
        //console.log(values)
        // eliminar phone del objeto values
        delete values.phone;
        const data = {
            ...values,
            modules: values.modules.join(', '),
            evaluatingERPs: values.evaluatingERPs.join(', '),
            reCaptchaResponse: reCaptchaResponse,
            phoneNumber: telefono,
            uri: '/contact'
        };


        try {
            const response = await axios.post('/api/sendMail', data);

            if (response.status === 200) {
                Swal.fire({
                    title: firstContactText.form.alerts.success.title,
                    icon: 'success',
                    text: firstContactText.form.alerts.success.text,
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
                    title: firstContactText.form.alerts.error.onSend.title,
                    text: firstContactText.form.alerts.error.onSend.text,
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
                title: firstContactText.form.alerts.error.onSend.title, 
                text: firstContactText.form.alerts.error.onSend.text,
                icon: 'error',
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                toast: true,
            }).then(() => {
                resetForm();
                setTelefono("")
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
    };

    return (
        <React.Fragment>
            <Header />
            <Box bg="gray.100">
                <Image src='https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt="Cover Image" objectFit="cover" w="100%" h={300} />
            </Box>
            <Container maxW={'3xl'} marginBottom={10} marginTop={-10}>
                <Box bg="green.300"
                    w="100%"
                    p={4}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '100px',
                    }}
                >
                    <Heading as="h1" size="xl" textAlign="center" color={useColorModeValue('black.600', 'black.300')}>
                        {firstContactText.heading}
                    </Heading>
                </Box>
                <Formik initialValues={initialValues} validationSchema={FormSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, isValid, dirty }) => (
                        <Form>
                            <Stack spacing={5} mt={8}>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel htmlFor="email">
                                                {firstContactText.form.fields.mail}
                                            </FormLabel>
                                            <Input {...field} id="email" placeholder={firstContactText.form.placeholders.mail} />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="fullName">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.fullName && form.touched.fullName}>
                                            <FormLabel htmlFor="fullName">
                                                {firstContactText.form.fields.name}
                                            </FormLabel>
                                            <Input {...field} id="fullName" placeholder={firstContactText.form.placeholders.name} />
                                            <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="phone">
                                    {({ field }) => (
                                        <FormControl
                                            inputMode="numeric"
                                        >
                                            <FormLabel htmlFor="phone">
                                                {firstContactText.form.fields.phone}
                                            </FormLabel>
                                            <Input {...field} value={telefono} onChange={handlePhone} minLength={10} maxLength={10} placeholder={firstContactText.form.placeholders.phone} />
                                            {telefono.length < 10 && telefono.length > 0 && (
                                                <span style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }}>
                                                    {firstContactText.form.validationSchema.invalid}
                                                </span>
                                            )}
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="jobTitle">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.jobTitle && form.touched.jobTitle}>
                                            <FormLabel htmlFor="jobTitle">
                                                {firstContactText.form.fields.charge}
                                            </FormLabel>
                                            <Input {...field} id="jobTitle" placeholder={firstContactText.form.placeholders.charge} />
                                            <FormErrorMessage>{form.errors.jobTitle}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="company">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.company && form.touched.company}>
                                            <FormLabel htmlFor="company">
                                                {firstContactText.form.fields.companyName}
                                            </FormLabel>
                                            <Input {...field} id="company" placeholder={firstContactText.form.placeholders.companyName} />
                                            <FormErrorMessage>{form.errors.company}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="description">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.description && form.touched.description}>
                                            <FormLabel htmlFor="description">
                                                {firstContactText.form.fields.description}
                                            </FormLabel>
                                            <Textarea {...field} id="description" placeholder={firstContactText.form.placeholders.description} />
                                            <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="operations">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.operations && form.touched.operations}>
                                            <FormLabel htmlFor="operations">
                                                {firstContactText.form.fields.operations}
                                            </FormLabel>
                                            <Textarea {...field} id="operations" placeholder={firstContactText.form.placeholders.operations} />
                                            <FormErrorMessage>{form.errors.operations}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="software">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.software && form.touched.software}>
                                            <FormLabel htmlFor="software">
                                                {firstContactText.form.fields.software}
                                            </FormLabel>
                                            <Textarea {...field} id="software" placeholder={firstContactText.form.placeholders.software} />
                                            <FormErrorMessage>{form.errors.software}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="userCount">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.userCount && form.touched.userCount}>
                                            <FormLabel htmlFor="userCount">
                                                {firstContactText.form.fields.users}
                                            </FormLabel>
                                            <Textarea {...field} id="userCount" placeholder={firstContactText.form.placeholders.users} />
                                            <FormErrorMessage>{form.errors.userCount}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="modules">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.modules && form.touched.modules}>
                                            <FormLabel>
                                                {firstContactText.form.fields.modules}
                                            </FormLabel>
                                            <VStack
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                {modulesOptions.map((option, index) => (
                                                    <Checkbox key={index} {...field} value={option}>
                                                        {option}
                                                    </Checkbox>
                                                ))}
                                            </VStack>
                                            <FormErrorMessage>{form.errors.modules}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="timeline">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.timeline && form.touched.timeline}>
                                            <FormLabel htmlFor="timeline">
                                                {firstContactText.form.fields.timeline}
                                            </FormLabel>
                                            <Textarea {...field} id="timeline" placeholder={firstContactText.form.placeholders.timeline} />
                                            <FormErrorMessage>{form.errors.timeline}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="invoiceCount">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.invoiceCount && form.touched.invoiceCount}>
                                            <FormLabel htmlFor="invoiceCount">
                                                {firstContactText.form.fields.invoices}
                                            </FormLabel>
                                            <Input {...field} id="invoiceCount" placeholder={firstContactText.form.placeholders.invoices}
                                                onKeyDown={(e) => {
                                                    // Regex para permitir solo numeros, backspace, delete, flechas y tab
                                                    const regex = /[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/;

                                                    if (!regex.test(e.key)) {
                                                        e.preventDefault();
                                                    }

                                                }}
                                            />
                                            <FormErrorMessage>{form.errors.invoiceCount}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="improvements">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.improvements && form.touched.improvements}>
                                            <FormLabel htmlFor="improvements">
                                                {firstContactText.form.fields.improvements}
                                            </FormLabel>
                                            <Textarea {...field} id="improvements" placeholder={firstContactText.form.placeholders.improvements} />
                                            <FormErrorMessage>{form.errors.improvements}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="budget">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.budget && form.touched.budget}>
                                            <FormLabel htmlFor="budget">
                                                {firstContactText.form.fields.budget}
                                            </FormLabel>
                                            <Input {...field} id="budget" placeholder={firstContactText.form.placeholders.budget}
                                                onKeyDown={(e) => {
                                                    // Regex para permitir solo numeros, backspace, delete, flechas y tab
                                                    const regex = /[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/;

                                                    if (!regex.test(e.key)) {
                                                        e.preventDefault();
                                                    }

                                                }}
                                            />
                                            <FormErrorMessage>{form.errors.budget}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="companyType">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.companyType && form.touched.companyType}>
                                            <FormLabel>
                                                {firstContactText.form.fields.companyType}
                                            </FormLabel>
                                            <RadioGroup {...field} id="companyType" placeholder="Tipo de empresa"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                {companyTypes.map((option, index) => (
                                                    <Radio key={index} {...field} value={option} m={'5px'}>
                                                        {option}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                            <FormErrorMessage>{form.errors.companyType}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="trainingMethod">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.trainingMethod && form.touched.trainingMethod}>
                                            <FormLabel>
                                                {firstContactText.form.fields.training}
                                            </FormLabel>
                                            <Textarea {...field} id="trainingMethod" placeholder={firstContactText.form.placeholders.training} />
                                            <FormErrorMessage>{form.errors.trainingMethod}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="evaluatingERPs">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.evaluatingERPs && form.touched.evaluatingERPs}>
                                            <FormLabel>
                                                {firstContactText.form.fields.evaluatingERPs}
                                            </FormLabel>
                                            <VStack
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                {evaluatingERPsOptions.map((option, index) => (
                                                    <Checkbox key={index} {...field} value={option}>
                                                        {option}
                                                    </Checkbox>
                                                ))}
                                            </VStack>
                                            <FormErrorMessage>{form.errors.evaluatingERPs}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <ReCAPTCHA
                                    sitekey="6LcF7egnAAAAAAATcdv4rJ4ge3DeEgA3Zt7nY-zj"
                                    onChange={(value) => {
                                        initialValues.reCaptchaResponse = value;
                                        setIsDisabled(!isDisabled);
                                        setReCaptchaResponse(value);
                                    }}
                                    onExpired={() => {
                                        setIsDisabled(true);
                                        setReCaptchaResponse('');
                                        initialValues.reCaptchaResponse = '';
                                    }}
                                    name="reCaptchaResponse"
                                    id='reCaptchaResponse'
                                    ref={reCaptchaRef}
                                />

                                <Button
                                    type="submit"
                                    colorScheme="green"
                                    size="lg"
                                    isDisabled={isDisabled}
                                    isLoading={isSubmitting}
                                >
                                    {firstContactText.form.fields.send}
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default ERPForm;
