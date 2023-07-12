import { Box, Heading, Text, Button, Flex, Spinner } from '@chakra-ui/react';

export default function NotFound() {
    return (
        <Flex minHeight="100vh" alignItems="center" justifyContent="center">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='blue.200'
                color='green.500'
                size='xl'
            />
            <Box textAlign="center" py={10} px={6}>
                <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, green.400, green.600)"
                    backgroundClip="text"
                >
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color={'gray.500'} mb={6}>
                    The page you're looking for does not seem to exist
                </Text>

                <Button
                    colorScheme="green"
                    bgGradient="linear(to-r, green.400, green.500, green.600)"
                    color="white"
                    variant="solid"
                    onClick={() => window.location.replace('/')}
                >
                    Go to Home
                </Button>
            </Box>
        </Flex>
    );
}
