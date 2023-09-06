import { Box, Container, Flex, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { FcAssistant, FcCollaboration, FcServices } from 'react-icons/fc';
import { BsFillCloudFill } from 'react-icons/bs';
import { DiCode } from "react-icons/di";
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import OurWorkTextEN from '../public/langs/en/OurWork.json';
import OurWorkTextES from '../public/langs/es/OurWork.json';


function Card({ heading, description, icon }) {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
        >
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}
                >
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'} textAlign={'justify'}>
                        {description}
                    </Text>
                </Box>
            </Stack>
        </Box>
    );
}

export default function GridList() {
    const [ourWorkText, setOurWorkText] = useState(OurWorkTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setOurWorkText(OurWorkTextEN);
        } else {
            setOurWorkText(OurWorkTextES);
        }
    }, []);

    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} textAlign={'center'}>
                    {ourWorkText.heading}
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }} textAlign={'justify'}>
                    {ourWorkText.description}
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    <Card
                        heading={ourWorkText.cards[0].heading}
                        icon={<Icon as={FcAssistant} w={10} h={10} />}
                        description={ourWorkText.cards[0].description}
                    />
                    <Card
                        heading={ourWorkText.cards[1].heading}
                        icon={<Icon as={DiCode} color={'orange.400'} w={'14'} h={'14'} />}
                        description={ourWorkText.cards[1].description}
                    />
                    <Card
                        heading={ourWorkText.cards[2].heading}
                        icon={<Icon as={BsFillCloudFill} color={'blue.500'} w={10} h={10} />}
                        description={ourWorkText.cards[2].description}
                    />
                    <Card
                        heading={ourWorkText.cards[3].heading}
                        icon={<Icon as={FcCollaboration} w={10} h={10} />}
                        description={ourWorkText.cards[3].description}
                    />
                    <Card
                        heading={ourWorkText.cards[4].heading}
                        icon={<Icon as={FcServices} w={10} h={10} />}
                        description={ourWorkText.cards[4].description}
                    />
                </Flex>
            </Container>
        </Box>
    );
}
