import React from 'react';
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
import { FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { SidebarPushable, Sidebar, Menu } from 'semantic-ui-react';

const Dashboard = () => {
    const [visible, setVisible] = React.useState(true);
    const handleClick = () => {
        setVisible(!visible);
    };


    return (
        <Flex minH='100vh'>
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
                    onHide={() => setVisible(false)}
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
                                        <Text mr="2">Bienvenido</Text>
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
                                    justifyContent="space-between"
                                    alignItems="center"
                                    h="100%"
                                    p="4px"
                                >
                                    {/* Botón de Cerrar sesión */}
                                    <Link mb='5' onClick={() => console.log('Cerrar sesión')}>
                                        <Icon as={FiLogOut} boxSize="16px" />
                                        <Text fontSize="14px">Cerrar sesión</Text>
                                    </Link>

                                    {/* Enlace de Perfil */}
                                    <Link href="/profile" onClick={() => console.log('Perfil')}>
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
                            {/* Agrega tus componentes y contenido aquí */}
                            <Text>Contenido del dashboard</Text>
                        </Box>
                    </Flex>
                </Sidebar.Pusher>
            </SidebarPushable>
        </Flex>
    );
};

export default Dashboard;
