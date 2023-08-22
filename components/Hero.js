import { Container, Stack, Flex, Box, Heading, Text, Button, Image, Icon } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CallToActionWithVideo() {
    return (
        <>
            <Container maxW={'7xl'}>
                <Stack align={'center'} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }} direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                        <Heading as={'h1'} lineHeight={1.1} fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                            <Text as={'span'} position={'relative'} _after={{ content: "''", width: 'full', height: '30%', position: 'absolute', bottom: 1, left: 0, bg: 'green.400', zIndex: -1 }}>
                                Sage 300
                            </Text>
                            <br />
                            <Text as={'span'} color={'green.400'}>
                                el mejor sistema ERP!
                            </Text>
                        </Heading>
                        <Text color={'gray.800'} textAlign={'justify'}>
                            Sage 300, antes conocido como Accpac, es la solución ERP integral para empresas en ascenso. Unifica contabilidad, compras, inventarios, ventas y más en un sistema centralizado, automatizando procesos y maximizando la eficiencia. En Tersoft, no solo implementamos Sage 300, sino que adaptamos y optimizamos la herramienta a tus necesidades, enfrentando desafíos y asegurando el éxito de tu negocio. ¡Aprovecha nuestra oferta especial! Agenda tu cita ahora y benefíciate de la implementación gratuita                        </Text>
                        <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
                            <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'green'} bg={'green.400'} _hover={{ bg: 'green.500' }} onClick={
                                () => {
                                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                }
                            }>
                                Obtener más información
                            </Button>
                            <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'green'}
                                bg={'green.400'} _hover={{ bg: 'green.500' }}
                                zIndex={999999}
                                onClick={
                                    () => {
                                        Calendly.initPopupWidget({ url: 'https://calendly.com/tersoft' }); return false;
                                    }}
                            >
                                Agenda una cita
                            </Button>
                        </Stack>
                    </Stack>
                    <Flex flex={1} justify={'center'} align={'center'} position={'relative'} w={'full'}>
                        <Blob w={'150%'} h={'120%'} position={'absolute'} top={'5%'} left={0} zIndex={-1} color={useColorModeValue('green.200', 'green.400')} />
                        <Box minH={'400px'} maxH={'auto'} rounded={'2xl'} boxShadow={'2xl'} width={'400px'} overflow={'hidden'}>
                            <FormComponent />
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

const FormComponent = () => {
    const initialValues = {
        name: '',
        phoneNumber: '',
        email: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Campo requerido'),
        phoneNumber: Yup.string()
            .required('Campo requerido')
            .matches(/^[0-9]+$/, 'Debe ser un número')
            .min(10, 'Debe tener 10 dígitos')
            .max(10, 'Debe tener 10 dígitos'),
        email: Yup.string().email('Formato de correo inválido').required('Campo requerido'),
    });

    const handleSubmit = (values) => {
        console.log(values);
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
                ¡Aplique para una implementacion gratuita!
            </Heading>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                Nombre completo:
                            </Text>
                            <Field type="text" name="name" placeholder="Nombre" className="form-control mb-3" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                Número de teléfono:
                            </Text>
                            <Field type="text" name="phoneNumber" placeholder="Teléfono" className="form-control mb-3" />
                            <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                        </div>
                        <div>
                            <Text as={'h3'} fontSize="md" textAlign="left" padding={'1'} marginBottom={'-0.1px'}>
                                Correo electrónico:
                            </Text>
                            <Field type="email" name="email" placeholder="Correo" className="form-control mb-3" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <Button
                            type="submit"
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                            colorScheme={'green'}
                            bg={'green.400'}
                            _hover={{ bg: 'green.500' }}
                            disabled={isSubmitting}
                            mx={'auto'}
                            marginTop={'10px'}
                        >
                            ¡ Aplicar ahora !
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};
