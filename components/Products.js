import { Box, Button, Divider, Heading, Stack, Text } from '@chakra-ui/react';

const optionsSage = {
    id: 1,
    desc: 'Para potenciar su crecimiento, es esencial una herramienta avanzada que integre departamentos y se adapte a expansiones y consolidaciones. Sage 300 es la solución a sus problemas.',
    button: {
        text: 'Ver más',
        colorScheme: 'green',
    },
};

const optionsModulosFiscales = {
    id: 2,
    desc: 'En Tersoft hemos desarrollado todos los módulos fiscales necesarios para operar en México y algunos países de América Latina. La facturación electrónica, contabilidad electrónica, generación automática de DIOT, reportes de impuestos, flujo de caja, etc.',
    needButton: false,
    button: {
        text: 'Ver más',
        colorScheme: 'green',
    },
};

const optionsSageconnect = {
    id: 3,
    desc: 'Hemos integrado Sage 300 con PortaldeProveedores.mx para automatizar cuentas por pagar, previniendo pagos indebidos y asegurando el cumplimiento de compromisos por parte de proveedores.',
    button: {
        text: 'Ver más',
        colorScheme: 'green',
    },
};

const optionsEDI = {
    id: 4,
    desc: 'Disfrute de un procesamiento de transacciones más rápido y preciso con el mejor software de intercambio electrónico de datos (EDI) del mercado.',
    button: {
        text: 'Ver más',
        colorScheme: 'green',
    },
};

const optionsModulosTersoft = {
    id: 5,
    desc: 'En Tersoft, desarrollamos módulos para Sage 300, atendiendo necesidades empresariales en México: dispersión bancaria, aprobación de compras, gestión de vales de almacén y respaldos automáticos.',
    button: {
        text: 'Ver más',
        colorScheme: 'green',
    },
};


const PackageTier = ({ title, options }) => {
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
                    colorScheme={options.button.colorScheme}
                    variant={'solid'}
                    width={'50%'}
                    onClick={() => {
                        document.getElementById(options.id).scrollIntoView({
                            behavior: 'smooth',
                        });
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
