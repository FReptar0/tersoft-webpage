import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Container,
    useColorModeValue,
} from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Router from 'next/router';

import TestimonialsTextEN from '../public/langs/en/Testimonials.json';
import TestimonialsTextES from '../public/langs/es/Testimonials.json';

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
            textAlign={'justify'}
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
    const [testimonialsText, setTestimonialsText] = useState(TestimonialsTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setTestimonialsText(TestimonialsTextEN);
        } else {
            setTestimonialsText(TestimonialsTextES);
        }
    }, []);

    const testimonials = testimonialsText.testimonials;
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box bg={useColorModeValue('blue.200', 'gray.700')}>
            <Container maxW={'7xl'} py={16}>
                <Stack spacing={0} align={'center'}>
                    <Heading textAlign={'center'}>
                        {testimonialsText.heading}
                    </Heading>
                    <Text textAlign={'center'}>
                        {testimonialsText.description}
                    </Text>
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
