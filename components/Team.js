import React, { useEffect, useState } from 'react';
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
    useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import Router from 'next/router';

import TeamTextEN from '../public/langs/en/Team.json';
import TeamTextES from '../public/langs/es/Team.json';


const TeamMember = ({ src, name, role }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const cardHeight = isMobile ? "520px" : "500px";

    return (
        <Flex align="center" direction="column" p={4}>
            <Card
                maxW="sm"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                height={cardHeight}
            >
                <Image src={src} alt={name} width={350} height={350} />
                <Box p="6">
                    <Stack spacing={0} align="center">
                        <Text fontWeight={500} fontSize={'2xl'} textAlign={'center'}>{name}</Text>
                        <Text fontSize="lg" fontWeight={'bold'} textAlign={'center'} color={'blue.600'}>
                            {role}
                        </Text>
                    </Stack>
                </Box>
            </Card>
        </Flex>
    );
};


const Team = () => {
    const [teamText, setTeamText] = useState(TeamTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setTeamText(TeamTextEN);
        } else {
            setTeamText(TeamTextES);
        }
    }, []);

    const teamMembers = teamText.members;

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
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box style={{
            marginTop: '-100px',
        }}>
            <Container maxW={'7xl'} py={16}>
                <Stack spacing={0} align={'center'}>
                    <Heading>
                        {teamText.heading}
                    </Heading>
                    <Text>
                        {teamText.desc}
                    </Text>
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
