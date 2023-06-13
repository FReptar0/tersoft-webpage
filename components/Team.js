import React from 'react';
import Slider from 'react-slick';
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Container,
    useColorModeValue,
    Card,
    Image,
} from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TeamMember = ({ src, name, role }) => {
    return (
        <Flex align="center" direction="column" p={4}>
            <Card
                maxW="sm"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
            >
                <Image src={src} alt={name} width={250} height={350} />
                <Box p="6">
                    <Stack spacing={0} align="center">
                        <Text fontWeight={600} fontSize={'2xl'}>{name}</Text>
                        <Text fontSize="lg" fontWeight={'bold'} color={'green.600'}>
                            {role}
                        </Text>
                    </Stack>
                </Box>
            </Card>
        </Flex>
    );
};

const Team = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'John Doe',
            role: 'CEO',
            image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'CTO',
            image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
        },
        {
            id: 3,
            name: 'Mark Johnson',
            role: 'Product Manager',
            image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
        },
        {
            id: 4,
            name: 'John Doe',
            role: 'CEO',
            image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
        },
        {
            id: 5,
            name: 'Jane Smith',
            role: 'CTO',
            image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
        },
        {
            id: 6,
            name: 'Mark Johnson',
            role: 'Product Manager',
            image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
        },
        // Agrega más miembros del equipo aquí
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3.66,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Box>
            <Container maxW={'7xl'} py={16}>
                <Stack spacing={0} align={'center'}>
                    <Heading>Conoce nuestro equipo</Heading>
                    <Text>Hemos estado trabajando con clientes de todo el mundo</Text>
                </Stack>
                <Slider {...settings}>
                    {teamMembers.map((member) => (
                        <TeamMember
                            key={member.id}
                            src={member.image}
                            name={member.name}
                            role={member.role}
                        />
                    ))}
                </Slider>
            </Container>
        </Box>
    );
};

export default Team;
