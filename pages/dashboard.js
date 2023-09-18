import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    VStack,
    Icon,
    IconButton,
    Text,
    Link,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { FiUser, FiLogOut, FiMenu, FiX, FiXCircle } from 'react-icons/fi';
import { SidebarPushable, Sidebar, Menu } from 'semantic-ui-react';
import Loader from '@/components/Loader';
import Router from 'next/router';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import NoContent from './204';


const Dashboard = () => {
    const [visible, setVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        setIsClient(true);
        if (window.innerWidth < 768)
            setIsMobile(true);

        window.addEventListener('resize', handleResize);

        if (!localStorage.getItem('token'))
            Router.push('/login');

        handleAuth().catch(() => {
            Router.push('/login');
        });

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    const handleAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/tokenauth', { token: token });
            if (response.status === 200) {
                setIsLoading(false);
            } else {
                localStorage.removeItem('token');
                Router.push('/login');
            }
        } catch (error) {
            localStorage.removeItem('token');
            Router.push('/login');
        }
    }

    const handleResize = () => {
        if (window.innerWidth < 768)
            setIsMobile(true);
        else
            setIsMobile(false);
    };

    // TODO: Cambiar el contenido de NoContent por el contenido del dashboard cuando esté lista esa parte

    return (<NoContent />)

    return (
        isClient ? (
            !isLoading ? (<Flex w="full" h="full" overflow="hidden">
                <SidebarPushable
                    as={Box}
                    bg="gray.400" // Color del contenido del dashboard
                    w="full"
                    minH="100vh"
                    minW="250px"
                    color="white"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="space-between"
                    boxShadow="xl"
                    position="relative"
                    p="4"
                >
                    <Sidebar
                        as={Menu}
                        animation='scale down'
                        direction='left'
                        icon='labeled'
                        inverted
                        vertical
                        visible={visible}
                        onHidden={() => setVisible(false)}
                    >
                        <Flex
                            bg="gray.700" // Color del sidebar
                            w="full"
                            minH="100vh"
                            color="white"
                            maxW="20%"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="space-between"
                            minW="250px"
                            boxShadow="xl"
                            position="relative"
                        >
                            <Grid
                                templateRows="1fr 350px 1fr"
                                p="40px"
                                w="full"
                                h="full"
                                overflow="hidden"
                            >
                                {/* Cabecera */}
                                <GridItem textAlign="center">
                                    <Text fontSize="lg" fontWeight="bold">
                                        <Flex align="center" justify="center">
                                            <Text mr="2">
                                                Bienvenido
                                            </Text>
                                        </Flex>
                                    </Text>
                                </GridItem>

                                {/* Sección de Chats */}
                                <GridItem>
                                    <Box h="calc(100% - 80px)" overflowY="auto" mb="4">
                                        <VStack spacing="4px" alignItems="start" p="4px">
                                            {/* Lista de Chats */}
                                            <Link onClick={() => console.log('Chat 1')}>Chat 1</Link>
                                            <Link onClick={() => console.log('Chat 2')}>Chat 2</Link>
                                            <Link onClick={() => console.log('Chat 3')}>Chat 3</Link>
                                            <Link onClick={() => console.log('Chat 4')}>Chat 4</Link>
                                            <Link onClick={() => console.log('Chat 5')}>Chat 5</Link>
                                            {/* Agrega más enlaces de chats aquí */}
                                        </VStack>
                                    </Box>
                                </GridItem>

                                {/* Sección de Cerrar sesión y Perfil */}
                                <GridItem textAlign="center">
                                    <Flex
                                        direction="column"
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                        h="100%"
                                        p="2px"
                                    >
                                        {isMobile ?
                                            (
                                                <div className='mb-3' id='CloseMenu' style={{ marginTop: '-50px' }}
                                                    onMouseOver={
                                                        (e) => {
                                                            document.getElementById('CloseMenuIcon').style.color = 'red';
                                                            document.getElementById('CloseMenuText').style.color = 'red';
                                                            e.target.style.cursor = 'pointer';
                                                        }
                                                    }

                                                    onMouseOut={
                                                        (e) => {
                                                            document.getElementById('CloseMenuIcon').style.color = 'white';
                                                            document.getElementById('CloseMenuText').style.color = 'white';
                                                            e.target.style.cursor = 'default';
                                                        }
                                                    }

                                                    onClick={() => setVisible(false)}
                                                >
                                                    <Icon as={FiXCircle} boxSize="16px" id='CloseMenuIcon' />
                                                    <Text fontSize="14px" id='CloseMenuText'>
                                                        Cerrar menú
                                                    </Text>
                                                </div>
                                            ) :
                                            (<></>)
                                        }
                                        {/* Botón de Cerrar sesión */}
                                        <Link mb='5' onClick={() => {
                                            localStorage.removeItem('token');
                                            Router.push('/login');
                                        }}>
                                            <Icon as={FiLogOut} boxSize="16px" />
                                            <Text fontSize="14px">Cerrar sesión</Text>
                                        </Link>

                                        {/* Enlace de Perfil */}
                                        <Link href="./profile">
                                            <Icon as={FiUser} boxSize="16px" />
                                            <Text fontSize="14px">Perfil</Text>
                                        </Link>

                                    </Flex>
                                </GridItem>
                            </Grid>
                        </Flex>
                    </Sidebar>


                    {/* Contenido del dashboard */}
                    <Sidebar.Pusher>
                        <Flex
                            w="full"
                            minH="100vh"
                            p="4"
                            flexDir="column"
                            padding={['4', '4', '6']}
                        >
                            <Flex align="center" justify="space-between" mb="6">
                                <IconButton
                                    icon={visible ? <FiX /> : <FiMenu />}
                                    size="md"
                                    variant="solid"
                                    onClick={handleClick}
                                    aria-label="Open Menu"
                                />
                            </Flex>
                            <Box
                                bg="white"
                                color="black"
                                p="4"
                                borderRadius="md"
                                boxShadow="md"
                                flex="1"
                                overflowY="auto"
                            >
                            </Box>
                        </Flex>
                    </Sidebar.Pusher>
                </SidebarPushable>
            </Flex >) : (<Loader />)) : (<Loader />)
    );
};

export default Dashboard;
