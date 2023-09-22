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
    Grid,
    GridItem,
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
    const locale = router.locale;
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCardClick = (id) => {
        setIsLoading(true);
        router.push(`/blog/${id}`);
    };

    return (
        <React.Fragment>
            {isLoading && <Loader />}

            {!isLoading && <Header />}

            <Container maxW={'9xl'} mt={10} p="12">
                <Box mt={8} ml={8} maxH={'100%'} maxW={'100%'}>
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
                                px={4}
                                py={8}
                            >
                                {blogPosts.map((post) => (
                                    <Box
                                        key={post._id}
                                        maxW={'445px'}
                                        h={'full'}
                                        w={'full'}
                                        bg={useColorModeValue('white', 'gray.900')}
                                        boxShadow={'2xl'}
                                        rounded={'md'}
                                        p={6}
                                        overflow={'hidden'}
                                        cursor="pointer"
                                        onClick={() => handleCardClick(post._id)}
                                        display="grid"
                                        gridTemplateRows="auto auto auto" // Cambio en la estructura de la cuadrícula
                                    >
                                        <Box
                                            h={'210px'}
                                            bg={'gray.100'}
                                            mt={-6}
                                            mx={-6}
                                            mb={6}
                                            pos={'relative'}
                                        >
                                            <Image
                                                src={post.imageSrc}
                                                layout="fill"
                                                objectFit="cover"
                                                alt={post.title}
                                            />
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
                                                {
                                                    locale === 'es' ? (
                                                        post.es.title
                                                    ) : (
                                                        post.en.title
                                                    )
                                                }
                                            </Heading>
                                        </Stack>
                                        <Text color={'gray.500'}>
                                            {
                                                locale === 'es' ? (
                                                    post.es.description
                                                ) : (
                                                    post.en.description
                                                )
                                            }
                                        </Text>
                                        <Grid
                                            templateRows="auto 1fr"
                                            gap={2}
                                            alignItems="end"
                                        >
                                            <GridItem>
                                                <Avatar src={post.authorAvatarSrc} alt={'Author'} />
                                            </GridItem>
                                            <GridItem>
                                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                                    <Text fontWeight={600}>{post.author}</Text>
                                                    <Text color={'gray.500'}>
                                                        {locale === 'es' ? post.es.date : post.en.date} · {post.readTime}
                                                    </Text>
                                                </Stack>
                                            </GridItem>
                                        </Grid>
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
        cache.set('blogPosts', data);
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
