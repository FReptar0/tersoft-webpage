import React, { useState, createRef } from 'react';
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
import Imagen from '../public/cover.avif';

const FormSchema = Yup.object().shape({
    email: Yup.string().email('Formato de correo inválido').required('Campo requerido'),
    fullName: Yup.string().required('Campo requerido'),
    jobTitle: Yup.string().required('Campo requerido'),
    company: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    operations: Yup.string().required('Campo requerido'),
    software: Yup.string().required('Campo requerido'),
    userCount: Yup.string().required('Campo requerido'),
    modules: Yup.array().required('Debe seleccionar al menos un módulo'),
    timeline: Yup.string().required('Campo requerido'),
    invoiceCount: Yup.number().required('Campo requerido'),
    improvements: Yup.string().required('Campo requerido'),
    budget: Yup.string().required('Campo requerido'),
    companyType: Yup.string().required('Campo requerido'),
    trainingMethod: Yup.string().required('Campo requerido'),
    evaluatingERPs: Yup.array().required('Debe seleccionar al menos un ERP'),
});

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

const modulesOptions = ['Cuentas por cobrar', 'Cuentas por pagar', 'Libro Mayor', 'Ingreso de Ordenes (ventas)', 'Ordenes de compra', 'Inventarios', 'Facturacion electronica', 'Contabilidad Electronica', 'Proyectos', 'Activos Fijos', 'Dispersión automática de pagos a proveedores', 'Autorizacion de ordenes de compra'];
const companyTypes = ['Somos una empresa en pleno crecimiento que usa excel o algun otro software para la administracion de mi negocio ya no nos es funciona', 'Somos una empresa que se ha consolidado en nuestra industria y tenemos operaciones en varias monedas, llevamos proyectos y estamos en planes de expansion', 'Nuestra empresa es multinacional, tiene oficinas en varios paises y necesitamos consolidar informacion de varias empresas.', 'Otra'];
const evaluatingERPsOptions = ['SAP Business One', 'Oracle Netsuite', 'Microsoft Dynamics 365 Business Central', 'Infor ERP LN', 'Epicor ERP', 'Odoo', 'Acumatica ERP', 'Otro'];

const ERPForm = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [reCaptchaResponse, setReCaptchaResponse] = useState('');
    const [telefono, setTelefono] = useState("");
    const reCaptchaRef = createRef();

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

        console.log(data);

        try {
            const response = await axios.post('/api/sendMail', data);

            if (response.status === 200) {
                Swal.fire({
                    title: 'Correo electrónico enviado',
                    icon: 'success',
                    text: 'Muchas gracias, su información ha sido enviada correctamente',
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
                console.log("else");
                Swal.fire({
                    title: 'Error',
                    text: 'Lo sentimos, ha ocurrido un error al enviar su información, inténtelo más tarde',
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
                title: 'Error',
                text: 'Lo sentimos, ha ocurrido un error al enviar su información, inténtelo más tarde',
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
                        Formulario de contacto
                    </Heading>
                </Box>
                <Formik initialValues={initialValues} validationSchema={FormSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, isValid, dirty }) => (
                        <Form>
                            <Stack spacing={5} mt={8}>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel htmlFor="email">Correo</FormLabel>
                                            <Input {...field} id="email" placeholder="Correo" />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="fullName">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.fullName && form.touched.fullName}>
                                            <FormLabel htmlFor="fullName">Nombre completo</FormLabel>
                                            <Input {...field} id="fullName" placeholder="Nombre completo" />
                                            <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="phone">
                                    {({ field }) => (
                                        <FormControl
                                            inputMode="numeric"
                                        >
                                            <FormLabel htmlFor="phone">Teléfono</FormLabel>
                                            <Input {...field} value={telefono} onChange={handlePhone} minLength={10} maxLength={10} placeholder="Teléfono" />
                                            {telefono.length < 10 && telefono.length > 0 && (
                                                <span style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }}>El teléfono no es válido</span>
                                            )}
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="jobTitle">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.jobTitle && form.touched.jobTitle}>
                                            <FormLabel htmlFor="jobTitle">Cargo en la empresa</FormLabel>
                                            <Input {...field} id="jobTitle" placeholder="Puesto" />
                                            <FormErrorMessage>{form.errors.jobTitle}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="company">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.company && form.touched.company}>
                                            <FormLabel htmlFor="company">Empresa</FormLabel>
                                            <Input {...field} id="company" placeholder="Empresa" />
                                            <FormErrorMessage>{form.errors.company}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="description">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.description && form.touched.description}>
                                            <FormLabel htmlFor="description">¿Podría proporcionarnos una breve descripción de su negocio y la industria en la que opera?</FormLabel>
                                            <Textarea {...field} id="description" placeholder="Descripción" />
                                            <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="operations">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.operations && form.touched.operations}>
                                            <FormLabel htmlFor="operations">¿Cuáles son las operaciones necesita mejorar?</FormLabel>
                                            <Textarea {...field} id="operations" placeholder="Operaciones" />
                                            <FormErrorMessage>{form.errors.operations}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="software">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.software && form.touched.software}>
                                            <FormLabel htmlFor="software">¿Utiliza actualmente algún software de gestión empresarial o ERP? Si es así, ¿cuáles son los principales desafíos a los que se enfrenta con él?</FormLabel>
                                            <Textarea {...field} id="software" placeholder="Software" />
                                            <FormErrorMessage>{form.errors.software}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="userCount">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.userCount && form.touched.userCount}>
                                            <FormLabel htmlFor="userCount">¿Cuántos usuarios necesitarán acceder al sistema ERP y cuáles serán sus roles dentro del software?</FormLabel>
                                            <Textarea {...field} id="userCount" placeholder="Usuarios" />
                                            <FormErrorMessage>{form.errors.userCount}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="modules">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.modules && form.touched.modules}>
                                            <FormLabel>Módulos del ERP que necesita implementar</FormLabel>
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
                                            <FormLabel htmlFor="timeline">¿Tiene un cronograma o plazo específico para implementar el nuevo sistema ERP?</FormLabel>
                                            <Textarea {...field} id="timeline" placeholder="Cronograma" />
                                            <FormErrorMessage>{form.errors.timeline}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="invoiceCount">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.invoiceCount && form.touched.invoiceCount}>
                                            <FormLabel htmlFor="invoiceCount">¿Cuantas facturas emite aproximadamente cada mes?</FormLabel>
                                            <Input {...field} id="invoiceCount" placeholder="Facturas"
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
                                            <FormLabel htmlFor="improvements">¿Como desea que le ayudemos a mejorar su empresa? Por favor anote todos los requerimientos que desee Sage 300 solucione y lleve a su empresa a un mejor status quo.</FormLabel>
                                            <Textarea {...field} id="improvements" placeholder="Mejoras" />
                                            <FormErrorMessage>{form.errors.improvements}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="budget">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.budget && form.touched.budget}>
                                            <FormLabel htmlFor="budget">¿Tiene un presupuesto estimado para este proyecto? (Esta información nos ayudará a recomendar la solución más apropiada dentro de su presupuesto.)</FormLabel>
                                            <Input {...field} id="budget" placeholder="Presupuesto"
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
                                            <FormLabel>Tipo de empresa</FormLabel>
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
                                            <FormLabel>¿Cuál es su método preferido para capacitar al personal en nuevo software? ¿Estaría interesado en formación presencial, sesiones virtuales o un curso en línea a su propio ritmo?</FormLabel>
                                            <Textarea {...field} id="trainingMethod" placeholder="Capacitación" />
                                            <FormErrorMessage>{form.errors.trainingMethod}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="evaluatingERPs">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.evaluatingERPs && form.touched.evaluatingERPs}>
                                            <FormLabel>¿Con que otros ERP nos estan evaluando?</FormLabel>
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
                                    onError={() => {
                                        setIsDisabled(true);
                                        setReCaptchaResponse('');
                                        initialValues.reCaptchaResponse = '';
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Algo salió mal',
                                            text: 'Ocurrió un error al validar el captcha, por favor inténtelo de nuevo',
                                        });
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
                                    Enviar
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
