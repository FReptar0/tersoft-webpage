import { Box, Container, Flex, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { FcAssistant, FcCollaboration, FcServices } from 'react-icons/fc';
import { BsFillCloudFill } from 'react-icons/bs';
import { DiCode } from "react-icons/di";


function Card({ heading, description, icon}) {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
        >
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}
                >
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
            </Stack>
        </Box>
    );
}

export default function GridList() {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Nuestros servicios
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    En Tersoft estamos 100% orientados a las necesidades de nuestros clientes, es por eso
que los servicios que ofrecemos son de la más alta calidad
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    <Card
                        heading={'Consultoría'}
                        icon={<Icon as={FcAssistant} w={10} h={10} />}
                        description={'El compromiso con nuestros clientes es que tengan Sage 300 funcionando eficientemente y que tanto sus colaboradores como sus clientes y proveedores formen parte de este ecosistema de eficiencia empresarial. Tersoft identificará los problemas que usted aún no conoce de su empresa y los solucionará.'}
                    />
                    <Card
                        heading={'Desarrollo'}
                        icon={<Icon as={DiCode} color={'orange.400'} w={'14'} h={'14'} />}
                        description={'¿Su empresa necesita de módulos hechos a la medida para cumplir con algún valor agregado que la diferencie de sus competidores? Estamos para ayudarle porque somos Developer Partner de Sage y tenemos la experiencia necesaria para que usted no se preocupe.'}
                    />
                    <Card
                        heading={'Soluciones y servicios Cloud'}
                        icon={<Icon as={BsFillCloudFill} color={'blue.500'} w={10} h={10} />}
                        description={'¿Sus empleados trabajan desde casa, en sus oficinas o de forma híbrida? ¡Perfecto! Nosotros somos Partner de Net at Cloud para que Sage 300 sea hospedado en la nube y esté 100% disponible en cualquier momento y lugar.'}
                    />
                    <Card
                        heading={'Capacitación'}
                        icon={<Icon as={FcCollaboration} w={10} h={10} />}
                        description={'Las empresas que capacitan a sus equipos son más eficientes y exitosas. Tersoft brinda capacitación continua y actualizada para la parte más importante de su compañía: sus colaboradores.'}
                    />
                    <Card
    heading={'Integraciones'}
    icon={<Icon as={FcServices} w={10} h={10} />}
    description={'Integramos Sage 300 con las plataformas que su empresa esté utilizando actualmente para ' +
    'potenciar las soluciones y los resultados que su empresa requiere. ' +
    'Expandimos su empresa a Mexico y Latinoamerica. ' +
    'Muchos de nuestros clientes tienen sus corporativos en Canadá o Estados Unidos y operan ' +
    'con Sage 300. Nosotros implementamos las compañías en México para que cubran las ' +
    'necesidades fiscales, financieras y operativas del país, y puedan ser una extensión de las ' +
    'operaciones en ambos países.'}
/>
                </Flex>
            </Container>
        </Box>
    );
}
