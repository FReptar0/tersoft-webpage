import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <header className='position-fixed mb-5' style={{ width: '100vw' }}>
            <Navbar
                bg="white"
                expand="lg"
                variant="light"
                sticky='top'
                className="p-3 shadow"
                style={{ opacity: '0.9' }}
            >
                <div className="container">
                    <Link className='m-3' href="/">
                        <Navbar.Brand>
                            <img
                                src="./logo.png"
                                height="40"
                                className="d-inline-block align-top"
                                alt="Tersoft"
                            />
                        </Navbar.Brand>
                    </Link>
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
                            <Nav.Item >
                                <Link className='m-3' href="/">Inicio</Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Link className='m-3' href="#about">Acerca de nosotros</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className='m-3' href="#products">Productos</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className='m-3' href="/blog">Blog</Link>
                            </Nav.Item>
                            <Nav.Item><Link className='m-3' href="/careers">Careers</Link></Nav.Item>
                            <Nav.Item ><Link className='m-3' href="/media">Multimedia</Link></Nav.Item>
                        </Nav>
                        <Nav className="align-items-center mx-3">
                            <Nav.Item className="fw-bold">
                                <Link className='m-3' href="/login">Iniciar sesión</Link>
                            </Nav.Item>
                            <Nav.Item className="fw-bold">
                                <Link className='m-3' href="/login?sign-up">Registrarse</Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
