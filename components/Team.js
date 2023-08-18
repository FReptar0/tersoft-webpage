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
} from '@chakra-ui/react';
import Image from 'next/image';

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
                height="500px"
            >
                <Image src={src} alt={name} width={350} height={350} />
                <Box p="6">
                    <Stack spacing={0} align="center">
                        <Text fontWeight={600} fontSize={'2xl'} textAlign={'center'}>{name}</Text>
                        <Text fontSize="lg" fontWeight={'bold'} textAlign={'center'} color={'green.600'}>
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
            name: 'José Alberto Hernández González',
            role: 'Director General',
            image: '/team/Alberto-Hernandez.png',
        },
        {
            id: 2,
            name: 'Santiago Peláez Jimenez',
            role: 'Líder de Proyecto Técnico',
            image: '/team/Santiago-Jimenez.png',
        },
        {
            id: 3,
            name: 'Yadira Romero Bono',
            role: 'Líder de Proyecto Funcional',
            image: '/team/Yadira-Romero.png',
        },
        {
            id: 4,
            name: 'Joel Vergara Sánchez',
            role: 'Líder de Proyecto Funcional',
            image: '/team/Joel-Vergara.png',
        },
        {
            id: 5,
            name: 'Hortensia Mares López',
            role: 'Líder de Proyecto Técnico',
            image: '/team/Hortensia-Mares.png',
        },
        {
            id: 6,
            name: 'Sandra Peláez Jimenez',
            role: 'Consultora Especializada',
            image: '/team/Sandra-Pelaez.png',
        },
        {
            id: 7,
            name: 'Brenda Sarahi Ortiz López',
            role: 'Consultora Especializada',
            image: '/team/Brenda-Ortiz.png',
        },
        {
            id: 8,
            name: 'Manuel Álvarez',
            role: 'Consultor Especializado',
            image: '/team/Manuel-Alvarez.png',
        }
        // Agrega más miembros del equipo aquí
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 2,
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
