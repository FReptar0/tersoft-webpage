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
import { FiUser, FiLogOut, FiMenu } from 'react-icons/fi';

const Sidebar = () => {
    const handleLinkClick = (link) => {
        console.log(`Link clickeado: ${link}`);
    };

    return (
        <Flex
            bg="gray.700"
            w="full"
            minH="100vh"
            color="white"
            maxW="20%"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            minW="250px"
            boxShadow={'xl'}
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
                        Bienvenido
                    </Text>
                </GridItem>

                {/* Sección de Chats */}
                <GridItem>
                    <Box h="calc(100% - 80px)" overflowY="auto">
                        <VStack spacing="4px" alignItems="start" p="4px" mt={'auto'}>
                            {/* Lista de Chats */}
                            <Link onClick={() => handleLinkClick('Chat 1')}>Chat 1</Link>
                            <Link onClick={() => handleLinkClick('Chat 2')}>Chat 2</Link>
                            <Link onClick={() => handleLinkClick('Chat 3')}>Chat 3</Link>
                            <Link onClick={() => handleLinkClick('Chat 4')}>Chat 4</Link>
                            <Link onClick={() => handleLinkClick('Chat 5')}>Chat 5</Link>
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
                        <Link onClick={() => handleLinkClick('Cerrar sesión')}>
                            <Icon as={FiLogOut} boxSize="16px" />
                            <Text fontSize="14px">Cerrar sesión</Text>
                        </Link>

                        {/* Enlace de Perfil */}
                        <Link href="/profile" onClick={() => handleLinkClick('Perfil')}>
                            <Icon as={FiUser} boxSize="16px" />
                            <Text fontSize="14px">Perfil</Text>
                        </Link>
                    </Flex>
                </GridItem>
            </Grid>
        </Flex>
    );
};

const Dashboard = () => {
    const handleClick = () => {
        console.log('Botón de menú clickeado');
    };

    return (
        <Flex minH="100vh">
            <Sidebar />

            <Box flex="1" p="6">
                <Flex align="center" justify="space-between" mb="6">
                    <IconButton
                        icon={<FiMenu />}
                        size="md"
                        variant="ghost"
                        onClick={handleClick}
                        aria-label="Open Menu"
                    />
                    <Text fontSize="lg" fontWeight="bold">Dashboard</Text>
                </Flex>

                {/* Contenido del dashboard */}
                <Box bg="white" p="4" borderRadius="md" boxShadow="md">
                    {/* Agrega tus componentes y contenido aquí */}
                    <Text>Contenido del dashboard</Text>
                </Box>
            </Box>
        </Flex>
    );
};

export default Dashboard;
