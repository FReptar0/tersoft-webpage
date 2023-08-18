import { Box, Button, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useState } from 'react';

const optionsSage = {
    id: 1,
    desc: 'Para potenciar su crecimiento, es esencial una herramienta avanzada que integre departamentos y se adapte a expansiones y consolidaciones. Sage 300 es la solución a sus problemas.',
    button: {
        id: 'sage300',
        text: 'Ver más',
        colorScheme: 'green',
        redirect: () => {
            Router.push('/sage');
        },
    },
};

const optionsModulosFiscales = {
    id: 2,
    desc: 'En Tersoft hemos desarrollado todos los módulos fiscales necesarios para operar en México y algunos países de América Latina. La facturación electrónica, contabilidad electrónica, generación automática de DIOT, reportes de impuestos, flujo de caja, etc.',
    button: {
        id: 'modulos-fiscales',
        text: 'Ver más',
        colorScheme: 'green',
        redirect: () => {
            Router.push('/modulos-fiscales');
        },
    },
};

const optionsSageconnect = {
    id: 3,
    desc: 'Hemos integrado Sage 300 con PortaldeProveedores.mx para automatizar cuentas por pagar, previniendo pagos indebidos y asegurando el cumplimiento de compromisos por parte de proveedores.',
    button: {
        id: 'sageconnect',
        text: 'Ver más',
        colorScheme: 'green',
        redirect: () => {
            Router.push('/sageconnect');
        },
    },
};

const optionsEDI = {
    id: 4,
    desc: 'Disfrute de un procesamiento de transacciones más rápido y preciso con el mejor software de intercambio electrónico de datos (EDI) del mercado.',
    button: {
        id: 'edi',
        text: 'Ver más',
        colorScheme: 'green',
        redirect: () => {
            Router.push('/edi');
        },
    },
};

const optionsModulosTersoft = {
    id: 5,
    desc: 'En Tersoft, desarrollamos módulos para Sage 300, atendiendo necesidades empresariales en México: dispersión bancaria, aprobación de compras, gestión de vales de almacén y respaldos automáticos.',
    button: {
        id: 'modulos-tersoft',
        text: 'Ver más',
        colorScheme: 'green',
        redirect: () => {
            Router.push('/modulos-tersoft');
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
                <Heading size={'lg'}>
                    {title}
                </Heading>
            </Stack>
            <Stack
                width={{
                    base: '100%',
                    md: '30%',
                }}
            >
                <Text textAlign={'center'} id={options.id}>
                    {options.desc}
                </Text>
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
                        options.button.redirect();
                    }}
                    isLoading={isLoading}
                >
                    {!isLoading ? options.button.text : ''}
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
                <PackageTier title={'Sageconnect'} options={optionsSageconnect} />
                <Divider />
                <PackageTier title={'EDI'} options={optionsEDI} />
                <Divider />
                <PackageTier title={'Módulos Tersoft'} options={optionsModulosTersoft} />
                <Divider />
            </Stack>
        </Box>
    );
};

export default TableProducts;
