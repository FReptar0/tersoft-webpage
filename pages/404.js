import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import NotFoundTextES from '../public/langs/es/404.json';
import NotFoundTextEN from '../public/langs/en/404.json';

export default function NotFound() {
    const [notFoundText, setNotFoundText] = useState(NotFoundTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setNotFoundText(NotFoundTextEN);
        } else {
            setNotFoundText(NotFoundTextES);
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
                    {notFoundText.heading}
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    {notFoundText.subheading}
                </Text>
                <Text color={'gray.500'} mb={6}>
                    {notFoundText.content}
                </Text>

                <Button
                    colorScheme="blue"
                    bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                    color="white"
                    variant="solid"
                    onClick={() => window.location.replace('/')}
                >
                    {notFoundText.button}
                </Button>
            </Box>
        </Flex>
    );
}
