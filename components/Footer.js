import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faLinkedin,
    faInstagram,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const validationSchema = Yup.object().shape({
        email: Yup.string().matches(/\S+@\S+\.\S+/, 'Correo invalido').required('Campo requerido'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            // validate email
            const { email } = values;
            const data = {
                'email': email,
                'type': 'newsletter'
            }
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = await response.json();

            if (responseData.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Felicidades!',
                    text: 'Te has suscrito a nuestro newsletter',
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
        },
    });

    return (
        <footer className="bg-dark p-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h3>Legal</h3>
                        <ul className='text-decoration-none'>
                            <li>
                                <Link aria-label='Ir a la política de privacidad' href="/privacy">Política de privacidad</Link>
                            </li>
                            <li>
                                <Link aria-label='Ir a los terminos y condiciones' href="/terms">Términos y condiciones</Link>
                            </li>
                            <li>
                                <Link aria-label='Ir a la política de uso' href="/use-policy">Política de uso</Link>
                            </li>
                            <li>
                                <Link aria-label='Ir al aviso legal' href="/legal-notice">Aviso legal</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h3>Compañía</h3>
                        <ul className='text-decoration-none'>
                            <li>
                                <Link aria-label='Ir a la información de Tersoft' href="#about">Sobre nosotros</Link>
                            </li>
                            <li>
                                <Link aria-label='Ir a conocer a nuestro equipo' href="#team">Nuestro equipo</Link>
                            </li>
                            <li>
                                <Link aria-label='Ir a la página de carreras' href="/careers">Careers</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h3>Contáctanos</h3>
                        <ul>
                            <li className='mb-2'>
                                <Link aria-label='Enviar correo a tersoft' href="mailto:contacto@tersoft.mx">
                                    <FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;contacto@tersoft.mx
                                </Link>
                            </li>
                            <li className='mb-2'>
                                <Link aria-label='Llama a tersoft' href="tel:+525519106389" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;&nbsp;+52 55 1910 6389
                                </Link>
                            </li>
                            <li className='mb-2'>
                                <Link aria-label='Enviar un mensaje por WhatsApp' href="https://api.whatsapp.com/send?phone=525519106389&text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.%20%C2%BFPodr%C3%ADan%20proporcionarme%20detalles%20adicionales,%20por%20favor?" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faWhatsapp} />&nbsp;&nbsp;&nbsp;+52 55 1910 6389
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h3 className='mb-3'>Noticias:</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                    placeholder="example@domain.com"
                                    aria-describedby="button-addon2"
                                    name='email'
                                    id='email-newsletter'
                                    autoComplete='off'
                                    required
                                    {...formik.getFieldProps('email')}
                                />
                                <button
                                    className="btn btn-secondary"
                                    type="submit"
                                    id="button-addon-newsletter"
                                    aria-label='Suscribirse al boletín'
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-lower d-flex justify-content-center">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-lg-6 col-md-6 mt-3" id='copy'>
                            &copy; {currentYear} TERP S.A de C.V. Todos los derechos reservados.
                        </div>
                        <div className="col-lg-6 col-md-6 text-center mt-3">
                            <div className='align-items-center d-flex justify-content-end' id='social-media'>
                                <div className='circle-icon' id='facebook'>
                                    <Link aria-label='Facebook de Tersoft' href="https://facebook.com/tersoft" target='_blank' className='mx-2'>
                                        <FontAwesomeIcon color="#fff" icon={faFacebook} />
                                    </Link>
                                </div>
                                <div className='circle-icon' id='twitter'>
                                    <Link aria-label='Twitter de Tersoft' href="https://twitter.com/sage300mexico" target='_blank' className='mx-2'>
                                        <FontAwesomeIcon color="#fff" icon={faTwitter} />
                                    </Link>
                                </div>
                                <div className='circle-icon' id='linkedin'>
                                    <Link aria-label='Linkedin de Tersoft' href="https://www.linkedin.com/company/tersoft/" target='_blank' className='mx-2'>
                                        <FontAwesomeIcon color="#fff" icon={faLinkedin} />
                                    </Link>
                                </div>
                                <div className='circle-icon' id='instagram'>
                                    <Link aria-label='Instagram de Tersoft' href="https://www.instagram.com/tersoft/" target='_blank' className='mx-2'>
                                        <FontAwesomeIcon color="#fff" icon={faInstagram} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
