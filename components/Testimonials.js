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

const TestimonialHeading = ({ children }) => {
    return (
        <Heading as={'h3'} fontSize={'xl'}>
            {children}
        </Heading>
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
            <Image src={src} alt={name} width={50} height={50} className='rounded-circle mb-2' />
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
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
            name: 'Jane Cooper',
            title: 'CEO at ABC Corporation',
            image:
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=100&q=80',
        },
        {
            id: 2,
            heading: 'Efficient Collaborating',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
            name: 'Jane Cooper',
            title: 'CEO at ABC Corporation',
            image:
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=100&q=80',
        },
        {
            id: 3,
            heading: 'Efficient Collaborating',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
            name: 'Jane Cooper',
            title: 'CEO at ABC Corporation',
            image:
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=100&q=80',
        },
        {
            id: 4,
            heading: 'Efficient Collaborating',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
            name: 'Jane Cooper',
            title: 'CEO at ABC Corporation',
            image:
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=100&q=80',
        },
        {
            id: 5,
            heading: 'Efficient Collaborating',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
            name: 'Jane Cooper',
            title: 'CEO at ABC Corporation',
            image:
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=100&q=80',
        },
        {
            id: 6,
            heading: 'Efficient Collaborating',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
            name: 'Jane Cooper',
            title: 'CEO at ABC Corporation',
            image:
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=100&q=80',
        },
        // Agrega más testimonios aquí
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
                    <Heading>Our Clients Speak</Heading>
                    <Text>We have been working with clients around the world</Text>
                </Stack>
                <Slider {...settings}>
                    {testimonials.map((testimonial) => (
                        <Testimonial key={testimonial.id}>
                            <Container maxW={'3xl'}>
                                <TestimonialContent>
                                    <TestimonialHeading>{testimonial.heading}</TestimonialHeading>
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
