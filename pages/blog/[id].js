import React from 'react';
import { Box, Heading, Text, VStack, Image, Flex, Avatar } from '@chakra-ui/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { connectToDatabase, closeConnection } from '@/config/mongodb';
import { LRUCache } from 'lru-cache';
import NotFound from '@/pages/404';
const { useRouter } = require('next/router');

const cache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 10,
});

const BlogPost = (props) => {
    let selectedBlogPost = props.blogPost;
    const router = useRouter();
    console.log(selectedBlogPost);

    if (router.locale === 'en') {
        selectedBlogPost = props.blogPost.en;
    } else {
        selectedBlogPost = props.blogPost.es;
    }

    if (!selectedBlogPost) {
        return <NotFound />;
    }

    return (
        <Box>
            <Header />
            <Box bg="gray.100">
                <Image src={selectedBlogPost.imageSrc} alt="Cover Image" objectFit="cover" w="100%" h={300} />
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
                        <Box mt={4} maxW="500px" mx="auto" borderRadius="md" overflow="hidden" boxShadow="md">
                            {section.imageUrl && (
                                <Image src={section.imageUrl} alt="Section Image" objectFit="cover" w="100%" h="auto" />
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Footer />
        </Box>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    const cachedBlogPost = cache.get(id);

    if (cachedBlogPost) {
        return {
            props: {
                blogPost: cachedBlogPost,
            },
        }
    }

    try {
        const db = await connectToDatabase();
        const blogCollection = db.collection('blog');
        const blogPost = await blogCollection.findOne({ _id: parseInt(id) });
        cache.set(id, blogPost);
        await closeConnection();
        return {
            props: {
                blogPost: blogPost,
            },
        }
    } catch (error) {
        console.log('Error al obtener el artículo del blog:', error);
        return null;
    }
}

export default BlogPost;
