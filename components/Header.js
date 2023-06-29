import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <header className='position-fixed' style={{ width: '100vw' }}>
            <Navbar
                bg="white"
                expand="lg"
                variant="light"
                sticky='top'
                className="p-3 shadow"
                style={{ opacity: '0.9' }}
            >
                <div className="container">
                    <a className='m-3' href="/" aria-label='Tersoft Company'>
                        <Navbar.Brand>
                            <Image
                                src="/logo.png"
                                width={100}
                                height={40}
                                className="d-inline-block align-top"
                                alt="Tersoft"
                                priority
                            />
                        </Navbar.Brand>
                    </a>
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        aria-expanded={showNav ? 'true' : 'false'}
                        aria-label="Toggle navigation"
                        onClick={toggleNav}
                    />
                    <Navbar.Collapse
                        id="responsive-navbar-nav"
                        className={`${showNav ? 'show' : ''}`}
                    >
                        <Nav className="me-auto mx-5">
                            <Nav.Item className='mb-2'>
                                <Link className='m-3' aria-label='Ir a nuestros productos' href="/#products">Productos</Link>
                            </Nav.Item>
                            <Nav.Item className='mb-2'>
                                <Link className='m-3' aria-label='Ir al blog' href="/blog">Blog</Link>
                            </Nav.Item>
                            <Nav.Item className='mb-2'>
                                <Link className='m-3' aria-label='Ir al blog' href="/#">Recursos</Link>
                            </Nav.Item>
                            <Nav.Item className='mb-2'>
                                <Link className='m-3' aria-label='Ir a la información de tersoft' href="/#info">Acerca de nosotros</Link>
                            </Nav.Item>
                            <Nav.Item className='mb-2'>
                                <Link className='m-3' aria-label='Ir a la información de tersoft' href="/#contact">Contáctanos</Link>
                            </Nav.Item>
                        </Nav>
                        <Nav className="align-items-center mx-3">
                            <Nav.Item className="fw-bold mb-2">
                                <Link className='m-3' aria-label='Iniciar Sesión' href="/login">Iniciar sesión</Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
