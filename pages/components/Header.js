import { useState } from 'react';
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <header className=''>
            <Navbar bg="" expand="lg" style={styles.navColor} className='p-3 shadow bg-transparent'>
                <Navbar.Brand style={styles.brand} className='mx-3'>
                    <Link href="/">
                        <img
                            src="./vercel.svg" // Reemplaza con la ruta de tu logo
                            height="30"
                            className="d-inline-block align-top"
                            alt="Tersoft"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleNav} />
                <Navbar.Collapse id="responsive-navbar-nav" className={`${showNav ? 'show' : ''}`}>
                    <Nav className="me-auto mx-5">
                        <Nav.Item className='m-2'>
                            <Link href="/">
                                Inicio
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='m-2'>
                            <Link href="#">
                                Acerca de
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='m-2'>
                            <Link href="#">
                                Productos
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='m-2'>
                            <Link href="#">
                                Precios
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='m-2'>
                            <Link href="#">
                                Blog
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='m-2'>
                            <Link href="#">
                                Careers
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='m-2'>
                            <Link href="#">
                                Multimedia
                            </Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="align-items-center mx-3">
                        <Nav.Item className='m-2 fw-bold'>
                            <Link href="#">
                                Iniciar sesión
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='m-2 fw-bold'>
                            <Link href="#">
                                Registrarse
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

const styles = {
    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        cursor: 'pointer',
    }
};

export default Header;
