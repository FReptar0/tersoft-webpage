import React from 'react';
import Slider from 'react-slick';
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Container,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const Testimonial = ({ children }) => {
    return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'sm'}
            p={8}
            rounded={'xl'}
            align={'center'}
            pos={'relative'}
            _after={{
                content: `""`,
                w: 10,
                h: 10,
                borderLeft: 'solid transparent',
                borderLeftWidth: 20,
                borderRight: 'solid transparent',
                borderRightWidth: 20,
                borderTop: 'solid',
                borderTopWidth: 20,
                borderTopColor: useColorModeValue('white', 'gray.800'),
                pos: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
            }}
        >
            {children}
        </Stack>
    );
};


const TestimonialText = ({ children }) => {
    return (
        <Text
            textAlign={'center'}
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize={'sm'}
        >
            {children}
        </Text>
    );
};

const TestimonialAvatar = ({ src, name, title }) => {
    return (
        <Flex align={'center'} mt={8} direction={'column'}>
            <Image src={src} alt={name} width={50} height={50} style={{
                maxHeight: '50px',
                minWidth: '50px',
            }} 
            className='rounded-circle mb-2' />
            <Stack spacing={-1} align={'center'}>
                <Text fontWeight={600}>{name}</Text>
                <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
                    {title}
                </Text>
            </Stack>
        </Flex>
    );
};

const CarruselTestimonial = () => {
    const testimonials = [
        {
            id: 1,
            heading: 'Efficient Collaborating',
            text:
                'Hemos trabajado con Tersoft desde el año 2006 como nuestros consultores especializados en Sage 300, logrando automatizar significativamente nuestras operaciones hasta el grado de contar con un e-commerce completamente integrado con Sage 300 así como enviar y recibir órdenes de compra a través de un EDI. El equipo Tersoft apoya 24/7 en las operación de nuestra empresa siempre con resultados sorprendentes',
            name: 'Enrique Reyna',
            image: '/testimonials/enrique-reyna.jpeg',
        },
        {
            id: 2,
            heading: 'Efficient Collaborating',
            text:
                'Varios ERP pueden cumplir con los requisitos que uno busca, pero pocos cuentan con un equipo humano dispuesto y comprometido a que la instalación del sistema en la operación del cliente sea exitosa. SAGE 300 y TERSOFT tienen ese compromiso y disponibilidad.',
            name: 'Adolfo Quintana',
            image:'/testimonials/Adolfo-quintana.jpg',
        },
        {
            id: 3,
            heading: 'Efficient Collaborating',
            text:
                'Desde hace más de 9 años sostenemos una relación comercial con Tersoft, quien se ha convertido en nuestro aliado comercial, recibiendo desde entonces un excelente servicio por parte de todos sus asociados en todos y cada uno de los requerimientos relacionados a la operación y desarrollo de nuestro ERP Sage 300.',
            name: 'Edmundo Corona',
            image: '/testimonials/edmundo-corona.jpg',
        },
        {
            id: 4,
            heading: 'Efficient Collaborating',
            text:
                'Tenemos 16 años contando con los servicios de consultoría especializada en Sage 300, siempre con compromiso, seriedad y profesionalismo.',
            name: 'Monserrat Ruíz',
            image:'/testimonials/Monserrat-Ruiz.jpg'
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box bg={useColorModeValue('green.200', 'gray.700')}>
            <Container maxW={'7xl'} py={16}>
                <Stack spacing={0} align={'center'}>
                    <Heading>Nuestros Clientes Opinan</Heading>
                    <Text>No nos crea a nosotros, vea que dicen nuestros clientes</Text>
                </Stack>
                <Slider {...settings}>
                    {testimonials.map((testimonial) => (
                        <Testimonial key={testimonial.id}>
                            <Container maxW={'3xl'}>
                                <TestimonialContent>
                                    <TestimonialText>{testimonial.text}</TestimonialText>
                                </TestimonialContent>
                                <TestimonialAvatar
                                    src={testimonial.image}
                                    name={testimonial.name}
                                    title={testimonial.title}
                                />
                            </Container>
                        </Testimonial>
                    ))}
                </Slider>
            </Container>
        </Box>
    );
};

export default CarruselTestimonial;
