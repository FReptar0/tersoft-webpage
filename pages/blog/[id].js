import React from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text, VStack, Image, Flex, Avatar } from '@chakra-ui/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPost = () => {
    const router = useRouter();
    const { id } = router.query;

    // Ejemplo de una lista de artículos
    const blogPosts = [
        {
            id: 1,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            sections: [
                {
                    header: 'Section 1',
                    content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                },
                {
                    header: 'Section 2',
                    content:
                        'Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a.',
                    imageUrl:
                        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                },
            ],
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc: 'https://avatars0.githubusercontent.com/u/1164541?v=4',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum interdum mauris, sed sollicitudin odio gravida a. Sed quis tincidunt lorem. Sed ut orci condimentum, tincidunt justo a, viverra nunc. Morbi sed dui magna. Cras pharetra dui id justo pulvinar varius. Sed placerat pulvinar cursus. Nulla porttitor ante id feugiat pharetra. Duis vulputate orci at mauris tincidunt, id feugiat eros rutrum. Aliquam efficitur semper odio id lacinia. Fusce tincidunt, neque eget ullamcorper venenatis, arcu ligula congue dui, a hendrerit metus nisi vitae magna. Sed pulvinar nibh ut sem volutpat, eu dictum metus finibus. Nam ultrices, quam sit amet sagittis semper, arcu mauris tempus nisi, sed vestibulum est metus at ante. Integer vulputate quam vel scelerisque porta. Nullam ultrices efficitur nunc, sit amet vestibulum elit lobortis at. Sed commodo rhoncus faucibus.',
        },
        // Agrega más artículos aquí
    ];

    // Encuentra el artículo seleccionado en la lista de artículos
    const selectedBlogPost = blogPosts.find((post) => post.id === Number(id));

    if (!selectedBlogPost) {
        // Si el artículo no se encuentra, puedes mostrar un mensaje de error o redirigir a una página de error
        return (
            <Box>
                <Text>El artículo no existe.</Text>
            </Box>
        );
    }

    return (
        <Box>
            <Header />
            <Box bg="gray.100">
                <Image
                    src={selectedBlogPost.imageSrc}
                    alt="Cover Image"
                    objectFit="cover"
                    w="100%"
                    h={300}
                />
            </Box>
            <Box maxW="container.lg" mx="auto" p={6}>
                <VStack align="start" spacing={2} mt={4}>
                    <Heading as="h1" fontSize="2xl">
                        {selectedBlogPost.title}
                    </Heading>
                    <Flex align="center" fontSize="sm" color="gray.500">
                        <Avatar size="sm" src={selectedBlogPost.authorAvatarSrc} />
                        <Text ml={2} fontStyle="italic">
                            {selectedBlogPost.author}
                        </Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">
                        {selectedBlogPost.date} • {selectedBlogPost.readTime}
                    </Text>
                </VStack>
                <Text fontSize="md" mt={6}>
                    {selectedBlogPost.content}
                </Text>

                {selectedBlogPost.sections.map((section, index) => (
                    <Box key={index} mt={6}>
                        <Heading as="h2" fontSize="lg">
                            {section.header}
                        </Heading>
                        <Text fontSize="md" mt={4}>
                            {section.content}
                        </Text>
                        <Box
                            mt={4}
                            maxW="500px"
                            mx="auto"
                            borderRadius="md"
                            overflow="hidden"
                            boxShadow="md"
                        >
                            {section.imageUrl && (
                                <Image
                                    src={section.imageUrl}
                                    alt="Section Image"
                                    objectFit="cover"
                                    w="100%"
                                    h="auto"
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Footer />
        </Box>
    );
};

export default BlogPost;
