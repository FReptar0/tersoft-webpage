import { Box, Button, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useState, useEffect } from 'react';

import ProductsTextEN from '../public/langs/en/Products.json';
import ProductsTextES from '../public/langs/es/Products.json';



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
                    <Text padding={'40px'}>
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
    const [productsText, setProductsText] = useState(ProductsTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setProductsText(ProductsTextEN);
        } else {
            setProductsText(ProductsTextES);
        }
    }, []);

    const optionsSage = {
        id: 1,
        isJustText: true,
        desc: productsText.options[0].desc,
        button: {
            id: 'sage300',
            text: productsText.options[0].button.text,
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
        desc: productsText.options[1].desc,
        button: {
            id: 'modulos-fiscales',
            text: productsText.options[1].button.text,
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
        desc: productsText.options[2].desc,
        button: {
            id: 'sageconnect',
            text: productsText.options[2].button.text,
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
                {/* forEach */}
                {productsText.options[3].desc.map((item, index) => {
                    return (
                        <li key={index}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        ),
        button: {
            id: 'modulos-tersoft',
            text: productsText.options[3].button.text,
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
                            {productsText.headingFirst} <Text color="green.600">{productsText.headingLast}</Text>
                        </Heading>
                    </Stack>
                    <Stack
                        width={{
                            base: '100%',
                            md: '60%',
                        }}
                    >
                        <Text textAlign={'center'}>
                            {productsText.description}
                        </Text>
                    </Stack>
                </Stack>

                <Divider />
                <PackageTier title={productsText.options[0].name} options={optionsSage} />
                <Divider />
                <PackageTier title={productsText.options[1].name} options={optionsModulosFiscales} />
                <Divider />
                <PackageTier title={productsText.options[2].name} options={optionsSageconnect} />
                <Divider />
                <PackageTier title={productsText.options[3].name} options={optionsModulosTersoft} />
                <Divider />
            </Stack>
        </Box>
    );
};

export default TableProducts;
