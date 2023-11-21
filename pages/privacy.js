import React, { useState, useEffect } from 'react';
import { Box, Flex, Grid, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import PrivacyTextEN from '../public/langs/en/Privacy.json';
import PrivacyTextES from '../public/langs/es/Privacy.json';
import Router from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyScreen = () => {
    const [privacyText, setPrivacyText] = useState(PrivacyTextES);

    useEffect(() => {
        const route = Router.asPath.split('/')[1];
        if (route === 'en') {
            setPrivacyText(PrivacyTextEN);
        } else {
            setPrivacyText(PrivacyTextES);
        }
    }, []);

    return (
        <>
            <Header />

            <Grid
                templateColumns={{ base: '1fr', lg: '1fr' }}
                gap={4}
                maxW="2xl"
                borderWidth="1px"
                p="12"
                borderRadius="lg"
                shadow="xl"
                mx="auto"
                my={64}
            >
                <Box>
                    <Flex direction="column" align="center" justify="center" height="100%">
                        <Heading fontSize={{ base: '2xl', sm: '3xl' }} fontWeight="bold" mb={4}>
                            {privacyText.heading}
                        </Heading>
                        <UnorderedList>
                            {privacyText.intro.map((paragraph, index) => (
                                <ListItem key={index} mb={2} textAlign="justify">
                                    {paragraph}
                                </ListItem>
                            ))}
                        </UnorderedList>
                        <Heading fontSize="xl" fontWeight="bold" mt={4}>
                            {privacyText.responsible.title}
                        </Heading>
                        <Text mb={4} textAlign="justify">
                            {privacyText.responsible.content}
                        </Text>
                        <Text fontSize="sm" color="gray.500" textAlign="justify">
                            {privacyText.responsible.additionalInfo}
                        </Text>
                        <Text fontSize="sm" color="gray.500" textAlign="justify">
                            {privacyText.responsible.address}
                        </Text>
                        <Heading fontSize="xl" fontWeight="bold" mt={4}>
                            {privacyText.personalData.title}
                        </Heading>
                        <Text mb={4} textAlign="justify">
                            {privacyText.personalData.content}
                        </Text>
                        <UnorderedList>
                            {privacyText.personalData.dataList.map((data, index) => (
                                <ListItem key={index}>{data}</ListItem>
                            ))}
                        </UnorderedList>
                        <Heading fontSize="xl" fontWeight="bold" mt={4}>
                            {privacyText.processingPurposes.title}
                        </Heading>
                        <Text mb={4} textAlign="justify">
                            {privacyText.processingPurposes.content}
                        </Text>
                        <UnorderedList>
                            {privacyText.processingPurposes.mainPurposes.map((purpose, index) => (
                                <ListItem key={index}>{purpose}</ListItem>
                            ))}
                        </UnorderedList>
                        <Heading fontSize="xl" fontWeight="bold" mt={4}>
                            {privacyText.limitationOptions.title}
                        </Heading>
                        <Text mb={4} textAlign="justify">
                            {privacyText.limitationOptions.content}
                        </Text>
                        <Text fontSize="sm" color="gray.500" textAlign="justify">
                            {privacyText.limitationOptions.additionalInfo}
                        </Text>
                        <Heading fontSize="xl" fontWeight="bold" mt={4}>
                            {privacyText.rights.title}
                        </Heading>
                        <Text mb={4} textAlign="justify">
                            {privacyText.rights.content}
                        </Text>
                        <UnorderedList>
                            {privacyText.rights.documentsList.map((document, index) => (
                                <ListItem key={index}>{document}</ListItem>
                            ))}
                        </UnorderedList>
                        <Text fontSize="sm" color="gray.500" textAlign="justify">
                            {privacyText.rights.additionalInfo}
                        </Text>
                        <Heading fontSize="xl" fontWeight="bold" mt={4}>
                            {privacyText.dataTransfer.title}
                        </Heading>
                        <Text mb={4} textAlign="justify">
                            {privacyText.dataTransfer.content}
                        </Text>
                        <Heading fontSize="xl" fontWeight="bold" mt={4}>
                            {privacyText.webBeacons.title}
                        </Heading>
                        <Text mb={4} textAlign="justify">
                            {privacyText.webBeacons.content}
                        </Text>
                    </Flex>
                </Box>
            </Grid>
            <Footer />
        </>
    );
};

export default PrivacyScreen;
