import { Box, Flex, Spinner } from '@chakra-ui/react';

export default function NotFound() {
    return (
        <Flex minHeight="100vh" alignItems="center" justifyContent="center" opacity={100} zIndex={999} backdropBlur={'2xl'} backgroundColor={'InactiveCaption'}>
            <Box textAlign="center" py={10} px={6}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='blue.200'
                    color='green.500'
                    size='xl'
                />
            </Box>
        </Flex>
    );
}
