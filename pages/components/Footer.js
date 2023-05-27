import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faLinkedin,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-dark p-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h4>Legal</h4>
                        <ul className='text-decoration-none'>
                            <li>
                                <Link href="/privacy">Política de privacidad</Link>
                            </li>
                            <li>
                                <Link href="/terms">Términos y condiciones</Link>
                            </li>
                            <li>
                                <ul className='text-decoration-none'>
                                    <li>
                                        <Link href="/use-policy">Política de uso</Link>
                                    </li>
                                    <li>
                                        <Link href="/legal-notice">Aviso legal</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h4>Company</h4>
                        <ul className='text-decoration-none'>
                            <li>
                                <Link href="#about">About Us</Link>
                            </li>
                            <li>
                                <Link href="#team">Our Team</Link>
                            </li>
                            <li>
                                <Link href="/careers">Careers</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h4>Contact Us</h4>
                        <ul>
                            <li>Email</li>
                            <li>Phone</li>
                            <li>Address</li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h4 className='mb-3'>Noticias:</h4>
                        <form action={`/api/news`} method='post'>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="example@domain.com"
                                    aria-describedby="button-addon2"
                                />
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    id="button-addon2"
                                >
                                    Suscribirse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-lower d-flex justify-content-center">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-lg-6 col-md-6 mt-3" id='copy'>
                            &copy; XXXX TERP S.A de C.V. Todos los derechos reservados.
                        </div>
                        <div className="col-lg-6 col-md-6 text-center mt-3">
                            <div className='align-items-center d-flex justify-content-end' id='social-media'>
                                <div className='circle-icon' id='facebook'>
                                    <Link href="https://facebook.com/tersoft" target='_blank' className='mx-2'>
                                        <FontAwesomeIcon color="#fff" icon={faFacebook} />
                                    </Link>
                                </div>
                                <div className='circle-icon' id='twitter'>
                                    <Link href="https://twitter.com/sage300mexico" target='_blank' className='mx-2'>
                                        <FontAwesomeIcon color="#fff" icon={faTwitter} />
                                    </Link>
                                </div>
                                <div className='circle-icon' id='linkedin'>
                                    <Link href="https://www.linkedin.com/company/tersoft/mycompany/" target='_blank' className='mx-2'>
                                        <FontAwesomeIcon color="#fff" icon={faLinkedin} />
                                    </Link>
                                </div>
                                <div className='circle-icon' id='instagram'>
                                    <Link href="https://www.instagram.com/tersoft/" target='_blank' className='mx-2'>
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
