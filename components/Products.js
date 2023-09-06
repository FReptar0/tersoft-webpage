import { Box, Button, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useState } from 'react';

const optionsSage = {
    id: 1,
    isJustText: true,
    desc: 'Sage 300 ayuda a las pequeñas y medianas empresas a administrar todo su negocio en distintas geografías sin el costo o la complejidad del software de planifi­cación de recursos empresariales (ERP) tradicional. La solución preferida por decenas de miles de empresas en todo el mundo, Sage 300 conecta los aspectos más importantes de su negocio en crecimiento.',
    button: {
        id: 'sage300',
        text: 'Descargar Brochure',
        colorScheme: 'green',
        function: () => {
            // Download brochure 
            window.open('/Brochure_Sage_300.pdf', '_blank');
        },
    },
};

const optionsModulosFiscales = {
    id: 2,
    isJustText: true,
    desc: 'En Tersoft hemos desarrollado todos los módulos fiscales necesarios para operar en México y algunos países de América Latina. La facturación electrónica, contabilidad electrónica, generación automática de DIOT, reportes de impuestos, flujo de caja, etc.',
    button: {
        id: 'modulos-fiscales',
        text: 'Descargar Brochure',
        colorScheme: 'green',
        function: () => {
            // Download brochure 
            window.open('/Modulos_Fiscales.pdf', '_blank');
        },
    },
};

const optionsSageconnect = {
    id: 3,
    isJustText: true,
    desc: 'Hemos integrado Sage 300 con PortaldeProveedores.mx para automatizar cuentas por pagar previniendo pagos indebidos y asegurando el cumplimiento de compromisos por parte de proveedores.',
    button: {
        id: 'sageconnect',
        text: 'Saber más',
        colorScheme: 'green',
        function: () => {
            const element = document.getElementById('contact');
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });
        },
    },
};

const optionsModulosTersoft = {
    id: 5,
    isJustText: false,
    desc: (
        <ul style={{
            textAlign: 'left',
        }}>
            <li>Dispersión automática de pagos a proveedores</li>
            <li>Aprobación electrónica de Órdenes de Compra</li>
            <li>Gestión de Vales de Almacén</li>
            <li>Respaldos automáticos</li>
            <li>Y más...</li>
        </ul>
    ),
    button: {
        id: 'modulos-tersoft',
        text: 'Saber más',
        colorScheme: 'green',
        function: () => {
            const element = document.getElementById('contact');
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });
        },
    },
};


const PackageTier = ({ title, options }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
                base: 'flex-start',
                md: 'space-around',
            }}
            direction={{
                base: 'column',
                md: 'row',
            }}
        >
            <Stack
                width={{
                    base: '100%',
                    md: '40%',
                }}
                textAlign={'center'}
            >
                <Heading size={'lg'} padding={'40px'}>
                    {title}
                </Heading>
            </Stack>
            <Stack
                width={{
                    base: '100%',
                    md: '30%',
                }}
            >
                {options.isJustText ? (
                    <Text textAlign={'center'} padding={'40px'}>
                        {options.desc}
                    </Text>
                ) : (
                    options.desc
                )}
            </Stack>
            <Stack
                width={{
                    base: '100%',
                    md: '30%',
                }}
                alignItems={'center'}
            >
                <Button
                    id={options.button.id}
                    colorScheme={options.button.colorScheme}
                    variant={'solid'}
                    width={'50%'}
                    onClick={() => {
                        setIsLoading(true);
                        options.button.function();
                    }}
                >
                    {options.button.text}
                </Button>
            </Stack>
        </Stack>
    );
};

const TableProducts = () => {
    return (
        <Box py={6} px={5} min={'100vh'}>
            <Stack spacing={4} width={'100%'} direction={'column'}>
                <Stack
                    p={5}
                    alignItems={'center'}
                    justifyContent={{
                        base: 'flex-start',
                        md: 'space-around',
                    }}
                    direction={{
                        base: 'column',
                        md: 'row',
                    }}
                >
                    <Stack
                        width={{
                            base: '100%',
                            md: '40%',
                        }}
                        textAlign={'center'}
                    >
                        <Heading size={'lg'}>
                            El plan perfecto para <Text color="green.600">tu negocio</Text>
                        </Heading>
                    </Stack>
                    <Stack
                        width={{
                            base: '100%',
                            md: '60%',
                        }}
                    >
                        <Text textAlign={'center'}>
                            Descubre el plan perfecto de Tersoft para potenciar tu negocio. Nuestro enfoque personalizado impulsa tu éxito a través de soluciones tecnológicas innovadoras y estratégicas.
                        </Text>
                    </Stack>
                </Stack>

                <Divider />
                <PackageTier title={'Sage 300'} options={optionsSage} />
                <Divider />
                <PackageTier title={'Módulos fiscales'} options={optionsModulosFiscales} />
                <Divider />
                <PackageTier title={'Portal de Proveedores y Sage 300'} options={optionsSageconnect} />
                <Divider />
                <PackageTier title={'Módulos Tersoft'} options={optionsModulosTersoft} />
                <Divider />
            </Stack>
        </Box>
    );
};

export default TableProducts;
