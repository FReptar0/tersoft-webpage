import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import ServerErrorES from '../public/langs/es/500.json';
import ServerErrorEN from '../public/langs/en/500.json';

export default function NotFound() {
    const [serverErrorText, setServerErrorText] = useState(ServerErrorEN);

    useEffect(() => {
        if (Router.locale === 'en') {
            setServerErrorText(ServerErrorEN);
        } else {
            setServerErrorText(ServerErrorES);
        }
    }, []);

    return (
        <Flex minHeight="100vh" alignItems="center" justifyContent="center">
            <Box textAlign="center" py={10} px={6}>
                <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, blue.400, blue.600)"
                    backgroundClip="text"
                >
                    {serverErrorText.heading}
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    {serverErrorText.subheading}
                </Text>
                <Text color={'gray.500'} mb={6}>
                    {serverErrorText.content}
                </Text>

                <Button
                    colorScheme="blue"
                    bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                    color="white"
                    variant="solid"
                    onClick={() => window.location.reload()}
                >
                    {serverErrorText.button}
                </Button>
            </Box>
        </Flex>
    );
}
