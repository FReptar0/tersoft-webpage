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
import SignUp from '@/components/SignUp';
import Login from '@/components/Login';
import NoContent from './204';


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
                Router.push('/dashboard');
            } else {
                localStorage.removeItem('token');
            }
        }

        if (token) {
            handleToken().catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, []);

    const toggleCard = () => {
        setIsSignup(!isSignup);
    };

    return (<NoContent />)

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
                            {isSignup ? 'Regístrate' : 'Inicia sesión'}
                        </Heading>
                        <Text fontSize={'lg'} color={'black.600'}>
                            Para disfrutar de todos los beneficios
                        </Text>
                    </Stack>
                    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                        {isSignup ? (
                            <>
                                <SignUp />
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        ¿Ya tienes una cuenta? {' '}
                                        <ChakraLink color={'blue.400'} onClick={toggleCard} cursor="pointer">
                                            Iniciar sesión
                                        </ChakraLink>
                                    </Text>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Login />
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        ¿Aún no tienes una cuenta?
                                        <ChakraLink color={'blue.400'} onClick={toggleCard} cursor="pointer">
                                            {' '}Regístrate
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