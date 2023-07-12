import React from 'react';
import Image from 'next/image';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Container,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { connectToDatabase, closeConnection } from '@/config/mongodb';
import { LRUCache } from 'lru-cache';
import Loader from '@/components/Loader';

const cache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 10,
});


const BlogIndex = ({ blogPosts }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCardClick = (id) => {
        setIsLoading(true);
        router.push(`/blog/${id}`);
    };

    return (
        <React.Fragment>
            {isLoading && <Loader />}

            {!isLoading && (<Header/>)}
            
            <Container maxW={'9xl'} mt={10} p="12">
                <Box mt={8} ml={8}>
                    <Stack spacing={6}>
                        <Center>
                            <Box
                                display="grid"
                                gridTemplateColumns={{
                                    base: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(4, 1fr)',
                                }}
                                gridGap={6}
                                justifyContent="center"
                                alignItems="center"
                                px={4} // Agregado: Padding horizontal
                                py={8} // Agregado: Padding vertical
                            >
                                {blogPosts.map((post) => (
                                    <Box
                                        key={post._id}
                                        maxW={'445px'}
                                        w={'full'}
                                        bg={useColorModeValue('white', 'gray.900')}
                                        boxShadow={'2xl'}
                                        rounded={'md'}
                                        p={6}
                                        overflow={'hidden'}
                                        cursor="pointer"
                                        onClick={() => handleCardClick(post._id)}
                                    >
                                        <Box
                                            h={'210px'}
                                            bg={'gray.100'}
                                            mt={-6}
                                            mx={-6}
                                            mb={6}
                                            pos={'relative'}
                                        >
                                            <Image src={post.imageSrc} layout={'fill'} />
                                        </Box>
                                        <Stack>
                                            <Text
                                                color={'green.500'}
                                                textTransform={'uppercase'}
                                                fontWeight={800}
                                                fontSize={'sm'}
                                                letterSpacing={1.1}
                                            >
                                                Blog
                                            </Text>
                                            <Heading
                                                color={useColorModeValue('gray.700', 'white')}
                                                fontSize={'2xl'}
                                                fontFamily={'body'}
                                            >
                                                {post.title}
                                            </Heading>
                                            <Text color={'gray.500'}>{post.description}</Text>
                                        </Stack>
                                        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                                            <Avatar src={post.authorAvatarSrc} alt={'Author'} />
                                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                                <Text fontWeight={600}>{post.author}</Text>
                                                <Text color={'gray.500'}>
                                                    {post.date} · {post.readTime}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                ))}
                            </Box>
                        </Center>
                    </Stack>
                </Box>
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default BlogIndex;

export async function getServerSideProps() {
    const getBlogPosts = async () => {
        const cachedData = cache.get('blogPosts');
        if (cachedData) {
            return cachedData;
        }

        const db = await connectToDatabase();
        const data = await db.collection('blog').find({}).toArray();
        cache.set('blogPosts', data); // Almacenar en caché los resultados de la consulta

        await closeConnection();
        return data;
    };

    try {
        const blogPosts = await getBlogPosts();
        return {
            props: {
                blogPosts: JSON.parse(JSON.stringify(blogPosts)),
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            props: {
                error: 500,
            },
        };
    }
}
