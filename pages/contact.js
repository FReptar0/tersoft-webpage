import React, {useState} from 'react';
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

const FormSchema = Yup.object().shape({
    email: Yup.string().email('Formato de correo inválido').required('Campo requerido'),
    fullName: Yup.string().required('Campo requerido'),
    phone: Yup.string().required('Campo requerido'),
    jobTitle: Yup.string().required('Campo requerido'),
    company: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    operations: Yup.string().required('Campo requerido'),
    software: Yup.string().required('Campo requerido'),
    userCount: Yup.number().required('Campo requerido'),
    modules: Yup.array().required('Debe seleccionar al menos un módulo'),
    timeline: Yup.string().required('Campo requerido'),
    invoiceCount: Yup.number().required('Campo requerido'),
    improvements: Yup.string().required('Campo requerido'),
    budget: Yup.string().required('Campo requerido'),
    companyType: Yup.string().required('Campo requerido'),
    trainingMethod: Yup.string().required('Campo requerido'),
    evaluatingERPs: Yup.array().required('Debe seleccionar al menos un ERP'),
    recaptcha: Yup.string().required('Campo requerido'),
});

const initialValues = {
    email: '',
    fullName: '',
    phone: '',
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
    recaptcha: '',
};

const modulesOptions = ['Cuentas por cobrar', 'Cuentas por pagar', 'Libro Mayor', 'Ingreso de Ordenes (ventas)', 'Ordenes de compra', 'Inventarios', 'Facturacion electronica', 'Contabilidad Electronica', 'Proyectos', 'Activos Fijos', 'Dispersión automática de pagos a proveedores', 'Autorizacion de ordenes de compra'];
const companyTypes = ['Somos una empresa en pleno crecimiento que usa excel o algun otro software para la administracion de mi negocio ya no nos es funcionañ', 'Somos una empresa que se ha consolidado en nuestra industria y tenemos operaciones en varias monedas, llevamos proyectos y estamos en planes de expansion', 'Nuestra empresa es multinacional, tiene oficinas en varios paises y necesitamos consolidar informacion de varias empresas.', 'Otra'];
const evaluatingERPsOptions = ['SAP Business One', 'Oracle Netsuite', 'Microsoft Dynamics 365 Business Central', 'Infor ERP LN', 'Epicor ERP', 'Odoo', 'Acumatica ERP', 'Otro'];

const ERPForm = () => {
    const [isDisabled, setIsDisabled] = useState(true);

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <React.Fragment>
            <Header />
            <Box bg="gray.100">
                <Image src='cover.avif' alt="Cover Image" objectFit="cover" w="100%" h={300} />
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
                    {({ isSubmitting }) => (
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
                                            isInvalid={form.errors.fullName && form.touched.fullName}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="fullName">Nombre completo</FormLabel>
                                            <Input {...field} id="fullName" placeholder="Nombre completo" />
                                            <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="phone">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.phone && form.touched.phone}
                                            isRequired
                                            inputMode="numeric"
                                        >
                                            <FormLabel htmlFor="phone">Teléfono</FormLabel>
                                            <Input {...field} id="phone" placeholder="Teléfono" />
                                            <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="jobTitle">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.jobTitle && form.touched.jobTitle}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="jobTitle">Cargo en la empresa</FormLabel>
                                            <Input {...field} id="jobTitle" placeholder="Puesto" />
                                            <FormErrorMessage>{form.errors.jobTitle}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="company">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.company && form.touched.company}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="company">Empresa</FormLabel>
                                            <Input {...field} id="company" placeholder="Empresa" />
                                            <FormErrorMessage>{form.errors.company}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="description">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.description && form.touched.description}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="description">¿Podría proporcionarnos una breve descripción de su negocio y la industria en la que opera?</FormLabel>
                                            <Textarea {...field} id="description" placeholder="Descripción" />
                                            <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="operations">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.operations && form.touched.operations}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="operations">¿Cuáles son las operaciones necesita mejorar?</FormLabel>
                                            <Textarea {...field} id="operations" placeholder="Operaciones" />
                                            <FormErrorMessage>{form.errors.operations}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="software">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.software && form.touched.software}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="software">¿Utiliza actualmente algún software de gestión empresarial o ERP? Si es así, ¿cuáles son los principales desafíos a los que se enfrenta con él?</FormLabel>
                                            <Textarea {...field} id="software" placeholder="Software" />
                                            <FormErrorMessage>{form.errors.software}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="userCount">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.userCount && form.touched.userCount}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="userCount">¿Cuántos usuarios necesitarán acceder al sistema ERP y cuáles serán sus roles dentro del software?</FormLabel>
                                            <Textarea {...field} id="userCount" placeholder="Usuarios" />
                                            <FormErrorMessage>{form.errors.userCount}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="modules">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.modules && form.touched.modules}
                                            isRequired
                                        >
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
                                            isInvalid={form.errors.timeline && form.touched.timeline}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="timeline">¿Tiene un cronograma o plazo específico para implementar el nuevo sistema ERP?</FormLabel>
                                            <Textarea {...field} id="timeline" placeholder="Cronograma" />
                                            <FormErrorMessage>{form.errors.timeline}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="invoiceCount">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.invoiceCount && form.touched.invoiceCount}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="invoiceCount">¿Cuantas facturas emite aproximadamente cada mes?</FormLabel>
                                            <Textarea {...field} id="invoiceCount" placeholder="Facturas" />
                                            <FormErrorMessage>{form.errors.invoiceCount}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="improvements">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.improvements && form.touched.improvements}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="improvements">¿Como desea que le ayudemos a mejorar su empresa? Por favor anote todos los requerimientos que desee Sage 300 solucione y lleve a su empresa a un mejor status quo.</FormLabel>
                                            <Textarea {...field} id="improvements" placeholder="Mejoras" />
                                            <FormErrorMessage>{form.errors.improvements}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="budget">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.budget && form.touched.budget}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="budget">¿Tiene un presupuesto estimado para este proyecto? (Esta información nos ayudará a recomendar la solución más apropiada dentro de su presupuesto.)</FormLabel>
                                            <Textarea {...field} id="budget" placeholder="Presupuesto" />
                                            <FormErrorMessage>{form.errors.budget}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="companyType">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.companyType && form.touched.companyType}
                                            isRequired
                                        >
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
                                            isInvalid={form.errors.trainingMethod && form.touched.trainingMethod}
                                            isRequired
                                        >
                                            <FormLabel>¿Cuuál es su método preferido para capacitar al personal en nuevo software? ¿Estaría interesado en formación presencial, sesiones virtuales o un curso en línea a su propio ritmo?</FormLabel>
                                            <Textarea {...field} id="trainingMethod" placeholder="Capacitación" />
                                            <FormErrorMessage>{form.errors.trainingMethod}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="evaluatingERPs">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.evaluatingERPs && form.touched.evaluatingERPs}
                                            isRequired
                                        >
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
                                        initialValues.recaptcha = value;
                                        setIsDisabled(!isDisabled);
                                    }}
                                />

                                <Button
                                    type="submit"
                                    colorScheme="green"
                                    size="lg"
                                    isLoading={isSubmitting}
                                    isDisabled={isDisabled}
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
