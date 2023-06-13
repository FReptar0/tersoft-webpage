import { Box, FormControl, FormLabel, Input, Textarea, Button, Grid, Container, Heading, Text, Stack } from '@chakra-ui/react';

const ContactForm = () => {
    return (
        <Box as={Container} maxW={'6xl'} margin="0 auto">
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Contáctanos
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
                </Text>
            </Stack>
            <Grid templateColumns="repeat(2, 1fr)" gap="4">
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input type="text" placeholder="Nombre" />
                </FormControl>
                <FormControl>
                    <FormLabel>Apellido</FormLabel>
                    <Input type="text" placeholder="Apellido" />
                </FormControl>
                <FormControl>
                    <FormLabel>Teléfono</FormLabel>
                    <Input type="tel" placeholder="Teléfono" />
                </FormControl>
                <FormControl>
                    <FormLabel>Empresa</FormLabel>
                    <Input type="text" placeholder="Empresa" />
                </FormControl>
                <FormControl>
                    <FormLabel>Correo electrónico</FormLabel>
                    <Input type="email" placeholder="Correo electrónico" />
                </FormControl>
                <FormControl>
                    <FormLabel>Sitio web</FormLabel>
                    <Input type="text" placeholder="Sitio web" />
                </FormControl>
            </Grid>
            <FormControl marginTop="4">
                <FormLabel>Comentario</FormLabel>
                <Textarea placeholder="Escribe tu comentario" />
            </FormControl>
            <Button colorScheme="green" size="lg" mx="auto" display="block" mt={4}>
                Enviar
            </Button>
        </Box>
    );
};

export default ContactForm;
