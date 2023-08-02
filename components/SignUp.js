import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    HStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().matches(
        /\S+@\S+\.\S+/,
        'Invalid email'
    ).required('Email is required'),
    company: Yup.string().required('Company name is required'),
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one digit'
    ).required('Password is required'),
});


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

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
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => setShowPassword((showPassword) => !showPassword)}
                                            >
                                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <ErrorMessage className="text-danger" name="password" component="small" color="red" />
                                </FormControl>
                            )}
                        </Field>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                type="submit"
                            >
                                Regístrate
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
}