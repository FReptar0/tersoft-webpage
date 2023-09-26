import { Box, Button, Heading, Stack, Text, Container, Flex, useColorModeValue } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useState, useEffect } from 'react';

import ProductsTextEN from '../public/langs/en/Products.json';
import ProductsTextES from '../public/langs/es/Products.json';

function Card({ heading, description, button }) {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={10}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            shadow={'xl'}
            minH={'xl'}
            maxH={'xl'}
        >
            <Box>
                <Heading size="lg" textAlign={'center'}>
                    {heading}
                </Heading>
            </Box>

            <Box>
                <Text
                    fontSize={'sm'}
                    textAlign={'justify'}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="normal"
                >
                    {description}
                </Text>
            </Box>

            <Box>
                <Button
                    id={button.id}
                    w={'full'}
                    bg={useColorModeValue('#48BB78', 'green.400')}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={button.function}
                >
                    {button.text}
                </Button>
            </Box>
        </Box>
    );
}

export default function ProductsCards() {
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
            function: () => {
                // Download brochure 
                if (Router.locale === 'en') {
                    window.open('/files/en/Brochure_Sage_300.pdf', '_blank');
                } else {
                    window.open('/files/es/Brochure_Sage_300.pdf', '_blank');
                }
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
            function: () => {
                // Download brochure 
                window.open('/files/Modulos_Fiscales.pdf', '_blank');
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
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'}>
                <Stack
                    textAlign={'center'}
                >
                    <Heading size={'2xl'}>
                        {productsText.headingFirst} <Text color="green.600">{productsText.headingLast}</Text>
                    </Heading>
                </Stack>

                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }} textAlign={'justify'}>
                    {productsText.description}
                </Text>
            </Stack>

            <Container maxW={'7xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    <Card
                        heading={productsText.options[0].name}
                        description={optionsSage.desc}
                        button={optionsSage.button}
                    />
                    <Card
                        heading={productsText.options[1].name}
                        description={optionsModulosFiscales.desc}
                        button={optionsModulosFiscales.button}
                    />
                    <Card
                        heading={productsText.options[2].name}
                        description={optionsSageconnect.desc}
                        button={optionsSageconnect.button}
                    />
                    <Card
                        heading={productsText.options[3].name}
                        description={optionsModulosTersoft.desc}
                        button={optionsModulosTersoft.button}
                    />
                </Flex>
            </Container>
        </Box>
    );
}