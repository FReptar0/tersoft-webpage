import { Box, FormControl, FormLabel, Input, Textarea, Button, Grid, Container, Heading, Text, Stack } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido'),
    apellido: Yup.string().required('Apellido es requerido'),
    telefono: Yup.string().required('Teléfono es requerido'),
    correo: Yup.string().email('Correo inválido').required('Correo es requerido'),
    empresa: Yup.string().required('Empresa es requerida'),
});

const ContactForm = () => {
    const initialValues = {
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        empresa: '',
        comentario: '',
        sitioWeb: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        const { nombre, apellido, telefono, correo, empresa, comentario, sitioWeb } = values;
        const data = {
            nombre,
            apellido,
            telefono,
            correo,
            empresa,
            comentario,
            sitioWeb,
        };

        try {
            const response = await axios.post('/api/sendMail', data);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Correo electrónico enviado',
                    icon: 'success',
                    text: 'Su correo electrónico ha sido enviado correctamente',
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    toast: true,
                }).then(() => {
                    resetForm(); // Limpia los campos del formulario
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al enviar el correo electrónico',
                    icon: 'error',
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al enviar el correo electrónico',
                icon: 'error',
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                toast: true,
            });
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <Box as={Container} maxW={'6xl'} margin="0 auto">
                        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                                Contáctanos
                            </Heading>
                            <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
                            </Text>
                        </Stack>
                        <Grid templateColumns="repeat(2, 1fr)" gap="4">
                            <Field name="nombre">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            Nombre
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="text" placeholder="Nombre" />
                                        <ErrorMessage name="nombre" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="apellido">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            Apellido
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="text" placeholder="Apellido" />
                                        <ErrorMessage name="apellido" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="telefono">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            Teléfono
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="tel" minLength={10} maxLength={10} placeholder="Teléfono" />
                                        <ErrorMessage name="telefono" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="empresa">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            Empresa
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="text" minLength={3} placeholder="Empresa" />
                                        <ErrorMessage name="empresa" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="correo">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>
                                            Correo electrónico
                                            <span style={{ color: '#000' }}>*</span>
                                        </FormLabel>
                                        <Input {...field} type="email" placeholder="Correo electrónico" />
                                        <ErrorMessage name="correo" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="sitioWeb">
                                {({ field }) => (
                                    <FormControl>
                                        <FormLabel>Sitio web</FormLabel>
                                        <Input {...field} type="text" placeholder="Sitio web" />
                                        <ErrorMessage name="sitioWeb" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                    </FormControl>
                                )}
                            </Field>
                        </Grid>
                        <Field name="comentario">
                            {({ field }) => (
                                <FormControl marginTop="4">
                                    <FormLabel>Comentario</FormLabel>
                                    <Textarea {...field} placeholder="Escribe tu comentario" />
                                    <ErrorMessage name="comentario" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                </FormControl>
                            )}
                        </Field>
                        <Button colorScheme="green" size="lg" mx="auto" display="block" mt={4} type="submit">
                            Enviar
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
