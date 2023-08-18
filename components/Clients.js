import React from 'react';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

const ClientsCard = () => {
    const clientImages = [
        { id: 1, url: 'https://via.placeholder.com/150', alt: 'Client 1' },
        { id: 2, url: 'https://via.placeholder.com/150', alt: 'Client 2' },
        { id: 3, url: 'https://via.placeholder.com/150', alt: 'Client 3' },
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
                        Nuestros clientes
                    </Heading>
                    <Text color="dark.600" fontSize={{ base: 'sm', sm: 'md' }} textAlign="center">
                        Nosotros existimos gracias a nuestros clientes a quienes consideramos nuestros socios de negocios.
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true} // Mostrar los dots
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    transitionTime={500}
                    swipeable
                    emulateTouch
                    centerMode
                    centerSlidePercentage={33.33}
                    dynamicHeight
                    renderArrowPrev={(clickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button
                                type="button"
                                onClick={clickHandler}
                                title={label}
                                style={{
                                    position: 'absolute',
                                    zIndex: 2,
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0',
                                    outline: 'none',
                                }}
                            >
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path
                                        fill="#6a6a6a"
                                        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                                    />
                                </svg>
                            </button>
                        )
                    }
                    renderArrowNext={(clickHandler, hasNext, label) =>
                        hasNext && (
                            <button
                                type="button"
                                onClick={clickHandler}
                                title={label}
                                style={{
                                    position: 'absolute',
                                    zIndex: 2,
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0',
                                    outline: 'none',
                                }}
                            >
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path
                                        fill="#6a6a6a"
                                        d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
                                    />
                                </svg>
                            </button>
                        )
                    }
                    renderIndicator={(clickHandler, isSelected, index, label) => (
                        <li
                            onClick={clickHandler}
                            key={index}
                            style={{
                                display: 'inline-block',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: isSelected ? '#000' : '#6a6a6a',
                                margin: '0 4px',
                                cursor: 'pointer',
                            }}
                            title={`Slide dot number ${index + 1}`}
                        />
                    )}
                >
                    {clientImages.map((client, index) => (
                        <div key={client.id} style={{ marginRight: '10px' }}>
                            <Image src={client.url} alt={client.alt} width={150} height={150} />
                        </div>
                    ))}
                </Carousel>
            </Box>
        </Grid>
    );
};

export default ClientsCard;
