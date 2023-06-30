import { useState } from 'react';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const signupValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    company: Yup.string().required('Company name is required'),
    password: Yup.string().required('Password is required'),
});

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function AuthCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(true);

    const toggleCard = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = (values) => {
        const formValues = {
            ...values,
            isSignup: isSignup,
        };
    };

    const signupInitialValues = {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: '',
    };

    const loginInitialValues = {
        email: '',
        password: '',
    };

    const validationSchema = isSignup ? signupValidationSchema : loginValidationSchema;
    const initialValues = isSignup ? signupInitialValues : loginInitialValues;

    return (
        <React.Fragment>
            <Header />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack spacing={8} mx={'auto'} minW={'lg'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'} marginTop={'10vh'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            {isSignup ? 'Sign up' : 'Sign in'}
                        </Heading>
                        <Text fontSize={'lg'} color={'black.600'}>
                            To enjoy all of our features
                        </Text>
                    </Stack>
                    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                        {isSignup ? (
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
                                                            <FormLabel>First Name</FormLabel>
                                                            <Input {...field} type="text" />
                                                            <ErrorMessage name="firstName" component="small" color="red" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="lastName">
                                                    {({ field }) => (
                                                        <FormControl id="lastName" isRequired>
                                                            <FormLabel>Last Name</FormLabel>
                                                            <Input {...field} type="text" />
                                                            <ErrorMessage name="lastName" component="small" color="red" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </HStack>
                                            <Field name="email">
                                                {({ field }) => (
                                                    <FormControl id="email" isRequired>
                                                        <FormLabel>Email address</FormLabel>
                                                        <Input {...field} type="email" />
                                                        <ErrorMessage name="email" component="small" color="red" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="company">
                                                {({ field }) => (
                                                    <FormControl id="company" isRequired>
                                                        <FormLabel>Company name:</FormLabel>
                                                        <Input {...field} type="text" />
                                                        <ErrorMessage name="company" component="small" color="red" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="password">
                                                {({ field }) => (
                                                    <FormControl id="password" isRequired>
                                                        <FormLabel>Password</FormLabel>
                                                        <InputGroup>
                                                            <Input {...field} type={showPassword ? 'text' : 'password'} />
                                                            <InputRightElement h={'full'}>
                                                                <Button
                                                                    variant={'ghost'}
                                                                    onClick={() =>
                                                                        setShowPassword((showPassword) => !showPassword)
                                                                    }
                                                                >
                                                                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                                                </Button>
                                                            </InputRightElement>
                                                        </InputGroup>
                                                        <ErrorMessage name="password" component="small" color="red" />
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
                                                    Sign up
                                                </Button>
                                            </Stack>
                                            <Stack pt={6}>
                                                <Text align={'center'}>
                                                    Already a user?{' '}
                                                    <ChakraLink color={'blue.400'} onClick={toggleCard} cursor="pointer">
                                                        Login
                                                    </ChakraLink>
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
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
                                                        <ErrorMessage name="email" component="small" color="red" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="password">
                                                {({ field }) => (
                                                    <FormControl id="password" isRequired>
                                                        <FormLabel>Password</FormLabel>
                                                        <InputGroup>
                                                            <Input {...field} type={showPassword ? 'text' : 'password'} />
                                                            <InputRightElement h={'full'}>
                                                                <Button
                                                                    variant={'ghost'}
                                                                    onClick={() =>
                                                                        setShowPassword((showPassword) => !showPassword)
                                                                    }
                                                                >
                                                                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                                                </Button>
                                                            </InputRightElement>
                                                        </InputGroup>
                                                        <ErrorMessage name="password" component="small" color="red" />
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
                                            <Stack pt={6}>
                                                <Text align={'center'}>
                                                    New user?{' '}
                                                    <ChakraLink color={'blue.400'} onClick={toggleCard} cursor="pointer">
                                                        Sign up
                                                    </ChakraLink>
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </React.Fragment>
    );
}
