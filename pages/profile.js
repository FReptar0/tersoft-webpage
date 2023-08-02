import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    HStack,
    Box,
    Heading,
    Text,
    VStack,
    Image,
    Flex,
    Avatar,
    Grid,  // Agregamos el componente Grid de Chakra UI
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().matches(/\S+@\S+\.\S+/, 'Invalid email').required('Email is required'),
    company: Yup.string().required('Company name is required'),
    password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one digit')
        .required('Password is required'),
});

export default function Profile() {
    const [showPassword, setShowPassword] = useState(false);
    const [isClient, setIsClient] = useState(true);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        console.log(values);
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: values.firstName,
                lastname: values.lastName,
                email: values.email,
                company: values.company,
                password: values.password,
            }),
        });

        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
            Swal.fire({
                title: 'Haz creado tu cuenta exitosamente!',
                text: 'En breve recibirás un correo de confirmación informándote que tu cuenta ha sido activada.',
                icon: 'success',
                showConfirmButton: false,
                timer: 5000,
                toast: true,
                position: 'bottom-end',
            })
        } else {
            Swal.fire({
                title: 'Oops!',
                text: `${data.message}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 5000,
                toast: true,
                position: 'bottom-end',
            });
        }
    };

    return (
        <React.Fragment>
            <Box>
                <Image src='https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt="Cover Image" objectFit="cover" w="100%" h={300} />
                <Flex align="center" fontSize="sm" color="gray.500">
                    {/* Avatar sobre puesto a la imagen de arriba y centrado */}
                    <Flex align="center" margin={'0 auto'} marginTop={'-20'} fontSize="sm">
                        <Avatar size="2xl" src='https://avatars0.githubusercontent.com/u/1164541?v=4' />
                    </Flex>
                </Flex>
                {/*                     <Flex align="center" color="blackAlpha.900">
                        <Flex align="center" margin='0 auto' fontSize="sm" marginTop={'-96'}>
                            <Text fontSize="5xl"
                                fontWeight="bold"
                                lineHeight="shorter"
                                fontFamily="heading"
                                color="white"
                                as={'h1'}
                            >
                                Bienvenido!
                            </Text>
                        </Flex>
                    </Flex> */}
                <Flex align="center" fontSize="sm" color="blackAlpha.900">
                    <Flex align="center" margin='0 auto' fontSize="sm">
                        <Text fontSize="2xl"
                            fontWeight="bold"
                            lineHeight="shorter"
                            fontFamily="heading"
                            color="blackAlpha.900"
                        >
                            Christopher Sandoval
                        </Text>
                    </Flex>
                </Flex>
                <Flex align="center" fontSize="sm" marginTop={'-3'}>
                    {/* Avatar sobre puesto a la imagen de arriba y centrado */}
                    <Flex align="center" margin='0 auto' fontSize="md">
                        <Text
                            fontWeight="semibold"
                            lineHeight="shorter"
                            fontFamily="heading"
                            color="blackAlpha.700"
                        >
                            Tersoft
                        </Text>
                    </Flex>
                </Flex>
            </Box>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10} marginBottom={'20'}>
                <Box maxW="md" maxH={'550'} ml="auto" p={6} shadow="2xl" border={'1px'} borderColor={'gray.200'} borderRadius={'base'}>
                    <VStack align="center" spacing={2} mt={4}>
                        <Heading as="h1" fontSize="2xl">
                            Información de la cuenta:
                        </Heading>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {() => (
                                <Form>
                                    <Stack spacing={4}>
                                        <HStack spacing={4}>
                                            <Field name="firstName">
                                                {({ field }) => (
                                                    <FormControl id="firstName" isRequired>
                                                        <FormLabel>Nombre: </FormLabel>
                                                        <Input {...field} type="text" />
                                                        <ErrorMessage className="text-danger" name="firstName" component="small" color="red" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="lastName">
                                                {({ field }) => (
                                                    <FormControl id="lastName" isRequired>
                                                        <FormLabel>Apellido(s):</FormLabel>
                                                        <Input {...field} type="text" />
                                                        <ErrorMessage className="text-danger" name="lastName" component="small" color="red" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </HStack>
                                        <Field name="email">
                                            {({ field }) => (
                                                <FormControl id="email" isRequired>
                                                    <FormLabel>Correo electrónico:</FormLabel>
                                                    <Input {...field} type="email" />
                                                    <ErrorMessage className="text-danger" name="email" component="small" color="red" />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="company">
                                            {({ field }) => (
                                                <FormControl id="company" isRequired>
                                                    <FormLabel>Compañía:</FormLabel>
                                                    <Input {...field} type="text" />
                                                    <ErrorMessage className="text-danger" name="company" component="small" color="red" />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="password">
                                            {({ field }) => (
                                                <FormControl id="password" isRequired>
                                                    <FormLabel>Contraseña:</FormLabel>
                                                    <InputGroup>
                                                        <Input {...field} type={showPassword ? 'text' : 'password'} />
                                                        <InputRightElement h={'full'}>
                                                            <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                                            </Button>
                                                        </InputRightElement>
                                                    </InputGroup>
                                                    <ErrorMessage className="text-danger" name="password" component="small" color="red" />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <HStack spacing={5} pt={2}>
                                            <Button
                                                loadingText="Submitting"
                                                size="lg"
                                                bg={'blue.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}
                                                width={{ base: '100%', md: '50%' }}
                                                type="submit"
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                loadingText="Submitting"
                                                size="lg"
                                                bg={'red.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'red.500',
                                                }}
                                                width={{ base: '100%', md: '50%' }}
                                            >
                                                Cancelar
                                            </Button>
                                        </HStack>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </VStack>
                </Box>
                <Box maxW="md" mx="0" maxH={'550'} p={6} shadow="2xl" border={'1px'} borderColor={'gray.200'} borderRadius={'base'}>
                    <VStack align="center" spacing={2} mt={4}>
                        <Heading as="h1" fontSize="2xl">
                            Agenda una cita:
                        </Heading>
                        <div class="calendly-inline-widget" data-url="https://calendly.com/tersoft" style={{ minWidth: "320px", height: "400px" }}></div>
                    </VStack>
                </Box>
                {/* Repetir el mismo código para el segundo formulario */}
            </Grid>
        </React.Fragment>
    );
}
