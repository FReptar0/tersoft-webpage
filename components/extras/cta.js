import React from 'react';
import { Box, HStack, InputGroup, Input, Button, chakra, Container, Card } from '@chakra-ui/react';
import { FcInvite } from 'react-icons/fc';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WaitingList = () => {
    return (
        <Card
            as={Container}
            maxW="5xl"
            bg={"green.500"}
            color={"white"}
            p={20}
            borderRadius="md"
            overflow="hidden"
            mt={5}
            mb={5}
            _before={{
                content: "''",
                position: "absolute",
                top: "-30%",
                right: "-30%",
                width: "100vh",
                height: "100vh",
                background: "rgba(255, 255, 255, 0.15)",
                transform: "rotate(45deg)",
                zIndex: 0,
            }}
        >
            <HStack spacing={20} flexDirection={{ base: "column", md: "row" }}>
                <Box flex={{ base: "none", md: "50%" }} display="flex" alignItems="center" justifyContent="center">
                    <FcInvite size={100} />
                </Box>
                <Box flex={{ base: "none", md: "50%" }}>
                    <chakra.h2 fontSize="xl" fontWeight="600">
                        Únete a las más de 569 personas en nuestra lista de espera
                    </chakra.h2>
                    <form>
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="example@domain.com"
                                aria-describedby="button-addon2"
                                name='email'
                                id='email'
                                autoComplete='off'
                                required
                            />
                            <button
                                className="btn btn-secondary"
                                type="button"
                                id="button-addon-wait-list"
                                aria-label='Suscribirse al boletín'
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </form>
                </Box>
            </HStack>
        </Card>
    );
};

export default WaitingList;
