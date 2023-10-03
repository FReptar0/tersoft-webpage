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
    Grid,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import axios from 'axios';
import Loader from '@/components/Loader';
import Router from 'next/router';
import Swal from 'sweetalert2';
import Header from '@/components/Header';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().matches(/\S+@\S+\.\S+/, 'Invalid email').required('Email is required'),
    company: Yup.string().required('Company name is required'),
    password: Yup.string(),
    oldPassword: Yup.string(),
});


export default function Profile() {
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        name: '',
        lastname: '',
        email: '',
        company: '',
        role: '',
    });

    const handleSubmit = async (values) => {
        const response = await fetch('/api/updateprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name: values.firstName,
                lastname: values.lastName,
                email: values.email,
                company: values.company,
                password: values.password,
                oldPassword: values.oldPassword,
            }),
        });

        const data = await response.json();

        if (data.status === 200) {
            Swal.fire({
                title: 'Success!',
                text: 'Your profile has been updated',
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then(() => {
                localStorage.removeItem('token');
                Swal.fire({
                    title: 'Warning!',
                    text: 'For security reasons, you will be logged out. Please log in again.',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    Router.push('/login');
                });
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        setIsClient(true);

        if (!localStorage.getItem('token')) {
            Router.push('/login');
        }

        handleAuth().catch((error) => {
            console.log(error);
            localStorage.removeItem('token');
            Router.push('/login');
        });

        return () => {
            document.body.removeChild(script);
        }
    }, []);


    const handleAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/tokenauth', { token: token });
            const data = await response.data;

            if (response.status === 200) {
                const role = data.data.decoded.role;
                // capitalize first letter of role
                const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
                setData({
                    name: data.data.decoded.name,
                    lastname: data.data.decoded.lastname,
                    email: data.data.decoded.email,
                    company: data.data.decoded.company,
                    role: capitalizedRole,
                });
                setIsLoading(false);
            } else {
                localStorage.removeItem('token');
                Router.push('/login');
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            Router.push('/login');
        }
    }

    return (
        isClient ? (isLoading ? (<Loader />) : (<React.Fragment>
            <Header />
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
                            {data.name} {data.lastname}
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
                            {data.company} - {data.role}
                        </Text>
                    </Flex>
                </Flex>
            </Box>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10} marginBottom={'20'}>
                <Box maxW="md" maxH={'auto'} minH={'550'} ml="auto" p={6} shadow="2xl" border={'1px'} borderColor={'gray.200'} borderRadius={'base'}>
                    <VStack align="center" spacing={2} mt={4}>
                        <Heading as="h1" fontSize="2xl">
                            Información de la cuenta:
                        </Heading>
                        <Formik
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                            initialValues={{
                                firstName: data.name,
                                lastName: data.lastname,
                                email: data.email,
                                company: data.company,
                                password: '',
                                oldPassword: '',
                            }}
                        >
                            {() => (
                                <Form>
                                    <Stack spacing={4}>
                                        <HStack spacing={4}>
                                            <Field name="firstName">
                                                {({ field }) => (
                                                    <FormControl id="firstName" isRequired>
                                                        <FormLabel>Nombre: </FormLabel>
                                                        <Input disabled={!isBeingEdited} {...field} type="text" />
                                                        <ErrorMessage className="text-danger" name="firstName" component="small" color="red" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="lastName">
                                                {({ field }) => (
                                                    <FormControl id="lastName" isRequired>
                                                        <FormLabel>Apellido(s):</FormLabel>
                                                        <Input disabled={!isBeingEdited} {...field} type="text" />
                                                        <ErrorMessage className="text-danger" name="lastName" component="small" color="red" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </HStack>
                                        <Field name="email">
                                            {({ field }) => (
                                                <FormControl id="email" isRequired>
                                                    <FormLabel>Correo electrónico:</FormLabel>
                                                    <Input disabled={!isBeingEdited} {...field} type="email" />
                                                    <ErrorMessage className="text-danger" name="email" component="small" color="red" />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="company">
                                            {({ field }) => (
                                                <FormControl id="company" isRequired>
                                                    <FormLabel>Compañía:</FormLabel>
                                                    <Input disabled={!isBeingEdited} {...field} type="text" />
                                                    <ErrorMessage className="text-danger" name="company" component="small" color="red" />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="oldPassword">
                                            {({ field }) => (
                                                <FormControl id="oldPassword">
                                                    <FormLabel>Contraseña anterior:</FormLabel>
                                                    <InputGroup>
                                                        <Input disabled={!isBeingEdited} autoComplete='off' {...field} type={showOldPassword ? 'text' : 'password'} />
                                                        <InputRightElement h={'full'}>
                                                            <Button variant={'ghost'} onClick={() => setShowOldPassword((showOldPassword) => !showOldPassword)}>
                                                                {showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                                                            </Button>
                                                        </InputRightElement>
                                                    </InputGroup>
                                                    <ErrorMessage className="text-danger" name="oldPassword" component="small" color="red" />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="password">
                                            {({ field }) => (
                                                <FormControl id="password">
                                                    <FormLabel>Contraseña nueva:</FormLabel>
                                                    <InputGroup>
                                                        <Input disabled={!isBeingEdited} autoComplete='off' {...field} type={showPassword ? 'text' : 'password'} />
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
                                        <VStack spacing={5} pt={2}>
                                            {isBeingEdited ? (
                                                <>
                                                    <Button
                                                        loadingText="Cancelando..."
                                                        size="lg"
                                                        bg={'red.400'}
                                                        color={'white'}
                                                        _hover={{
                                                            bg: 'red.500',
                                                        }}
                                                        width={{ base: '100%', md: '100%' }}
                                                        onClick={() => setIsBeingEdited(false)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                    <Button
                                                        loadingText="Actualizando..."
                                                        size="lg"
                                                        bg={'green.400'}
                                                        color={'white'}
                                                        _hover={{
                                                            bg: 'green.500',
                                                        }}
                                                        width={{ base: '100%', md: '100%' }}
                                                        type="submit"
                                                    >
                                                        Actualizar
                                                    </Button>
                                                </>) :
                                                (<Button
                                                    loadingText="Editando..."
                                                    size="lg"
                                                    bg={'blue.400'}
                                                    color={'white'}
                                                    _hover={{
                                                        bg: 'blue.500',
                                                    }}
                                                    width={{ base: '100%', md: '100%' }}
                                                    onClick={() => setIsBeingEdited(true)}
                                                >
                                                    Editar
                                                </Button>)}
                                        </VStack>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </VStack>
                </Box>
                <Box maxW="md" mx="0" maxH={'auto'} minH={'550'} p={6} shadow="2xl" border={'1px'} borderColor={'gray.200'} borderRadius={'base'}>
                    <VStack align="center" spacing={2} mt={4}>
                        <Heading as="h1" fontSize="2xl">
                            Agenda una cita:
                        </Heading>
                        <div className="calendly-inline-widget" data-url="https://calendly.com/tersoft" style={{ minWidth: "320px", height: "70vh" }}></div>
                    </VStack>
                </Box>
            </Grid>
        </React.Fragment>)) : (<Loader />)
    );
}
