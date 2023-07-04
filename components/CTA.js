import React from 'react';
import { Box, HStack, chakra, Container, Card } from '@chakra-ui/react';
import { FcInvite } from 'react-icons/fc';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const WaitingList = () => {
    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().matches(/\S+@\S+\.\S+/, 'Correo invalido').required('El correo electrónico es requerido'),
    });

    const onSubmit = async (values) => {
        const { email } = values;
        const data = {
            'email': email,
            'type': 'waiting-list'
        }

        const response = await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (responseData.status === 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Felicidades!',
                text: 'Haz sido agregado a nuestra lista de espera',
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                position: 'bottom-end',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'Ha ocurrido un error, por favor intenta nuevamente',
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                position: 'bottom-end',
            });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const showInvalidEmailAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'Correo electrónico inválido',
            text: 'Por favor, ingresa un correo electrónico válido',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'bottom-end',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formik.isValid) {
            formik.handleSubmit();
        } else {
            showInvalidEmailAlert();
        }
    };

    return (
        <Card
            as={Container}
            maxW="6xl"
            bg="green.500"
            color="white"
            p={20}
            borderRadius="md"
            overflow="hidden"
            mt={5}
            mb={5}
            shadow="xl"
            _before={{
                content: "''",
                position: "absolute",
                top: "-30%",
                right: "-30%",
                width: "100vh",
                height: "100vh",
                background: "rgba(255, 255, 255, 0.15)",
                transform: "rotate(40deg)",
                zIndex: 0,
            }}
        >
            <HStack spacing={20} flexDirection={{ base: "column", md: "row" }}>
                <Box flex={{ base: "none", md: "50%" }} display="flex" alignItems="center" justifyContent="center">
                    <FcInvite size={150} />
                </Box>
                <Box flex={{ base: "none", md: "50%" }}>
                    <chakra.h2 fontSize="2xl" fontWeight="700">
                        Únete a nuestra lista de espera para obtener una implementación gratuita
                    </chakra.h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                placeholder="example@domain.com"
                                aria-describedby="button-addon2"
                                name="email"
                                id="email"
                                autoComplete="off"
                                required
                                {...formik.getFieldProps('email')}
                            />
                            <button
                                className="btn btn-secondary"
                                type="submit"
                                id="button-addon-wait-list"
                                aria-label="Suscribirse al boletín"
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
