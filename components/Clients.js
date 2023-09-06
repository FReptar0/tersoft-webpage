import React, { useState, useEffect } from 'react';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Router from 'next/router';

import ClientsTextEN from '../public/langs/en/Clients.json';
import ClientsTextES from '../public/langs/es/Clients.json';

const ClientsCard = () => {
    const [clientsText, setClientsText] = useState(ClientsTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setClientsText(ClientsTextEN);
        } else {
            setClientsText(ClientsTextES);
        }
    }, []);

    const clientImages = [
        { id: 1, url: '/clients/Sage-300-Aura-Minerals.png', alt: 'Aura Minerals' },
        { id: 2, url: '/clients/Sage-300-CapstoneCopper.png', alt: 'Capstone Copper' },
        { id: 3, url: '/clients/Sage-300-celupal.png', alt: 'Celupal' },
        { id: 4, url: '/clients/Sage-300-Dormakaba.png', alt: 'Dormakaba' },
        { id: 5, url: '/clients/Sage-300-Etiquetas-CCL.png', alt: 'Etiquetas CCL' },
        { id: 6, url: '/clients/Sage-300-Ferragamo.png', alt: 'Ferragamo' },
        { id: 7, url: '/clients/Grupo-Dice-Cloud.png', alt: 'Grupo Dice Cloud' },
        { id: 8, url: '/clients/Sage-300-Grupo-Dice.png', alt: 'Grupo Dice' },
        { id: 9, url: '/clients/Sage-300-Heca-Global.png', alt: '' },
        { id: 10, url: '/clients/Sage-300-imerys.png', alt: 'imerys' },
        { id: 11, url: '/clients/Minera.png', alt: 'Minera Santo Domingo' },
        { id: 12, url: '/clients/Sage-300-resansil.png', alt: 'Resanil' },
        { id: 13, url: '/clients/Sage-300-SJ-Medical.png', alt: 'SJ-Medical' },
        { id: 14, url: '/clients/ssr-mining.png', alt: 'ssr-mining' },
        // Agrega más objetos de imágenes de clientes aquí
    ];

    return (
        <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={4}
            maxW="6xl"
            borderWidth="1px"
            p="12"
            borderRadius="lg"
            shadow="xl"
            mx="auto"
        >
            <Box>
                <Flex direction="column" align="center" justify="center" height="100%">
                    <Heading fontSize={{ base: '2xl', sm: '3xl' }} fontWeight="bold" mb={4}>
                        {clientsText.heading}
                    </Heading>
                    <Text color="dark.600" fontSize={{ base: 'sm', sm: 'md' }} textAlign="center">
                        {clientsText.description}
                    </Text>
                </Flex>
            </Box>
            <Box
                minW={{ base: '100%', lg: '100%' }}
                maxW={{ base: '100%', lg: '100%' }}
            >
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    transitionTime={600}
                    swipeable
                    emulateTouch
                    centerMode
                    centerSlidePercentage={20}
                >
                    {clientImages.map((client, index) => (
                        <div key={client.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                marginRight: '20px',
                                width: '100%',
                                padding: '10px',
                            }}
                        >
                            <Image src={client.url} alt={client.alt}
                                width={800}
                                height={800}
                            />
                        </div>
                    ))}
                </Carousel>
            </Box>
        </Grid>
    );
};

export default ClientsCard;
