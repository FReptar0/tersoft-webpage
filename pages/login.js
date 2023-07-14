import { useEffect, useState } from 'react';
import React from 'react';
import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Link as ChakraLink,
} from '@chakra-ui/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Router from 'next/router';
import Login from '@/components/SignUp';
import SignUp from '@/components/Login';


export default function AuthCard() {
    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const handleToken = async () => {
            const response = await fetch('/api/tokenauth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            });

            const data = await response.json();

            if (data.status === 200) {
                console.log(data);
                Router.push('/dashboard');
            } else {
                localStorage.removeItem('token');
            }
        }

        if (token) {
            handleToken().catch((error) => {
                localStorage.removeItem('token');
                console.log(error);
            });
        }
    }, []);

    const toggleCard = () => {
        setIsSignup(!isSignup);
    };

    return (
        <React.Fragment>
            <Header />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack spacing={8} mx={'auto'} minW={'sm'} maxW={'sm'} py={12} px={6}>
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
                            <>
                                <Login />
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Don't have an account?{' '}
                                        <ChakraLink color={'blue.400'} onClick={toggleCard} cursor="pointer">
                                            Sign up
                                        </ChakraLink>
                                    </Text>
                                </Stack>
                            </>

                        ) : (
                            <>
                                <SignUp />
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Already a user?{' '}
                                        <ChakraLink color={'blue.400'} onClick={toggleCard} cursor="pointer">
                                            Login
                                        </ChakraLink>
                                    </Text>
                                </Stack>
                            </>
                        )}
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </React.Fragment>
    );
}