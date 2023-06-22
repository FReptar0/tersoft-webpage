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

const BlogIndex = () => {
    const router = useRouter();

    // Datos de ejemplo para las tarjetas
    const blogPosts = [
        {
            id: 1,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        {
            id: 2,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        {
            id: 3,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        {
            id: 4,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        {
            id: 5,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        {
            id: 6,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        {
            id: 7,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        {
            id: 8,
            title: 'Boost your conversion rate',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy...',
            author: 'Achim Rolle',
            date: 'Feb 08, 2021',
            readTime: '6min read',
            imageSrc:
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            authorAvatarSrc:
                'https://avatars0.githubusercontent.com/u/1164541?v=4',
        },
        // Agrega más objetos de blogPosts según sea necesario
    ];

    const handleCardClick = (id) => {
        router.push(`/blog/${id}`);
    };

    return (
        <React.Fragment>
            <Header />
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
                                        key={post.id}
                                        maxW={'445px'}
                                        w={'full'}
                                        bg={useColorModeValue('white', 'gray.900')}
                                        boxShadow={'2xl'}
                                        rounded={'md'}
                                        p={6}
                                        overflow={'hidden'}
                                        cursor="pointer"
                                        onClick={() => handleCardClick(post.id)}
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
                                        <Stack
                                            mt={6}
                                            direction={'row'}
                                            spacing={4}
                                            align={'center'}
                                        >
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
        </React.Fragment>
    );
};

export default BlogIndex;
