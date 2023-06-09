import { Box, Button, Divider, Heading, List, ListItem, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

const options = [
    { id: 1, desc: '1 lorem ipsum' },
    { id: 2, desc: 'Lorem, ipsum dolor.' },
    { id: 3, desc: 'Monthly Updates' },
];

const PackageTier = ({ title, subtitle, options }) => {
    return (
        <Stack
            p={5}
            py={3}
            justifyContent={{
                base: 'flex-center',
                md: 'space-around',
            }}
            direction={{
                base: 'column',
                md: 'row',
            }}
            alignItems={{ md: 'center' }}
            textAlign={'center'}
        >
            <Stack
                textAlign={'center'}
                alignItems={'center'}
                justifyContent={'center'}
                flex={{ base: 1, md: 0 }}
                maxW={'220px'}
                minW={'220px'}
                className='package-tier'
            >
                <Heading>{title}</Heading>
                <Text fontWeight={600} color={'green.500'} mb={4}>
                    {subtitle}
                </Text>
            </Stack>
            <List spacing={0} textAlign="start">
                {options.map((desc) => (
                    <ListItem key={desc.id} display="flex" alignItems="center">
                        <FaCheckCircle color='green' />
                        <Text m={2} verticalAlign="middle">
                            {desc.desc}
                        </Text>
                    </ListItem>
                ))}
            </List>
            <Stack>
                <Button size="md" bgColor={'green.400'} color={'white'}>
                    Get Started
                </Button>
            </Stack>
        </Stack>
    );
};

const TableProducts = () => {
    return (
        <Box py={6} px={5} min={'100vh'}>
            <Stack spacing={4} width={'100%'} direction={'column'}>
                <Stack
                    p={5}
                    alignItems={'center'}
                    justifyContent={{
                        base: 'flex-start',
                        md: 'space-around',
                    }}
                    direction={{
                        base: 'column',
                        md: 'row',
                    }}
                >
                    <Stack
                        width={{
                            base: '100%',
                            md: '40%',
                        }}
                        textAlign={'center'}
                    >
                        <Heading size={'lg'}>
                            The Right Plan for <Text color="green.600">Your Business</Text>
                        </Heading>
                    </Stack>
                    <Stack
                        width={{
                            base: '100%',
                            md: '60%',
                        }}
                    >
                        <Text textAlign={'center'}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod in iure vero. Facilis magnam, sed officiis commodi labore odit.
                        </Text>
                    </Stack>
                </Stack>
                <Divider />
                <PackageTier title={'Starter'} subtitle={'Definitive'} options={options} />
                <Divider />
                <PackageTier title={'Lorem Plus'} subtitle={'Definitive'} options={options} />
                <Divider />
                <PackageTier title={'Lorem Pro'} subtitle={'Definitive'} options={options} />
                <Divider />
                <PackageTier title={'Lorem Enterprise'} subtitle={'Definitive'} options={options} />
                <Divider />
            </Stack>
        </Box>
    );
};

export default TableProducts;
