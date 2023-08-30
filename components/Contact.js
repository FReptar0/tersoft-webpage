import { Box, FormControl, FormLabel, Input, SelectField, Button, Grid, Container, Heading, Text, Stack } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useEffect } from 'react';

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido'),
    apellido: Yup.string().required('Apellido es requerido'),
    telefono: Yup.string().matches(/^[0-9]+$/, 'El teléfono no es válido'),
    correo: Yup.string().email('Correo inválido').required('Correo es requerido'),
    empresa: Yup.string().required('Empresa es requerida'),
    opcion: Yup.string().required('La opción es requerida').nullable(),
    sitioWeb: Yup.string(),
    edad: Yup.string(), // This field is hidden and is used to check if the user is a bot
});


const ContactForm = () => {
    const [telefono, setTelefono] = useState("");

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
        telefono: '',
        correo: '',
        empresa: '',
        opcion: '',
        sitioWeb: '',
        edad: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        const { nombre, apellido, correo, empresa, opcion, sitioWeb } = values;
        const data = {
            "nombre": nombre,
            "apellido": apellido,
            "telefono": telefono,
            "correo": correo,
            "empresa": empresa,
            "opcion": opcion ? opcion : 'No hay opción',
            "sitioWeb": sitioWeb ? sitioWeb : 'No hay sitio web',
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
        if (!nombre || !apellido || !telefono || !correo || !empresa || !opcion) {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son requeridos',
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
                    title: 'Correo electrónico enviado',
                    icon: 'success',
                    text: 'Muchas gracias, su información ha sido enviada correctamente',
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    toast: true,
                }).then(() => {
                    resetForm(); // Limpia los campos del formulario
                    setTelefono("")
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Lo sentimos, ha ocurrido un error al enviar su información, inténtelo más tarde',
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
                text: 'Lo sentimos, ha ocurrido un error al enviar su información, inténtelo más tarde',
                icon: 'error',
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                toast: true,
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
            {() => (
                <Form>
                    <Box as={Container} maxW={'6xl'} margin="0 auto">
                        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                                Contáctanos
                            </Heading>
                            <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                                Inicia el camino hacia el cambio de tu empresa. Déjanos tu información para que nos pongamos en contacto a la brevedad.
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
                                        <Input {...field} type="tel" value={telefono} onChange={handlePhone} minLength={10} maxLength={10} placeholder="Teléfono" />
                                        <ErrorMessage name="telefono" component="span" style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }} />
                                        {telefono.length < 10 && telefono.length > 0 && (
                                            <span style={{ color: '#EB1111', fontSize: '0.8rem', marginLeft: 5 }}>El teléfono no es válido</span>
                                        )}
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
                        <Field name="opcion">
                            {({ field }) => (
                                <FormControl marginTop="4">
                                    <FormLabel>
                                        ¿Cómo podemos ayudarte?
                                        <span style={{ color: '#000' }}>*</span>
                                    </FormLabel>
                                    <SelectField {...field} placeholder="Selecciona una opción"
                                        w={{ base: '100%', sm: '100%' }}
                                        h={'10'}
                                        border={'1px solid'}
                                        borderRadius={'5px'}
                                        borderColor={'gray.200'}
                                    >
                                        <option value="Implementación de Sage 300">Información de Sage 300</option>
                                        <option value="Consultoría">Consultoría</option>
                                        <option value="Cursos">Cursos</option>
                                        <option value="Otro">Otro</option>
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
