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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    email: Yup.string().matches(
        /\S+@\S+\.\S+/,
        'Invalid email'
    ).required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        console.log(values);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });

        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
            Swal.fire({
                title: 'Bienvenido!',
                text: 'Has iniciado sesión exitosamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 5000,
                toast: true,
                position: 'bottom-end',
            }).then(() => {
                Router.push('/dashboard');
            });
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
                        <Field name="email">
                            {({ field }) => (
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input {...field} type="email" />
                                    <ErrorMessage className="text-danger" name="email" component="small" color="red" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field }) => (
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input {...field} type={showPassword ? 'text' : 'password'} autoComplete='on' />
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
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}