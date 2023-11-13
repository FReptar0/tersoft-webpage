import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Router from 'next/router';

import Loader from './Loader';

import HeaderTextsES from '../public/langs/es/Header.json';
import HeaderTextsEN from '../public/langs/en/Header.json';

const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la visibilidad del Loader
    const [HeaderTexts, setHeaderTexts] = useState(HeaderTextsES);
    const router = useRouter();
    const { pathname } = router;
    const toggleNav = () => {
        setShowNav(!showNav);
    };

    useEffect(() => {
        if (Router.locale === 'en') {
            setHeaderTexts(HeaderTextsEN);
        } else {
            setHeaderTexts(HeaderTextsES);
        }
    }, []);


    const isLoginPage = pathname === '/login';
    const isBlogPage = pathname === '/blog';
    const isProfilePage = pathname === '/profile';
    const isHome = pathname === '/';
    const isContactPage = pathname === '/contact';

    if (isProfilePage) {
        Router.prefetch('/dashboard');
    }

    const handleLinkClick = () => {
        setIsLoading(true); // Mostrar el Loader al hacer clic en los enlaces
    };

    return (
        <header className='position-fixed' style={{ width: '100vw' }}>
            {isLoading && <Loader />} {/* Mostrar el Loader si isLoading es true */}
            <Navbar
                bg="white"
                expand="lg"
                variant="light"
                sticky='top'
                className="p-3 shadow"
                style={{ opacity: '0.9' }}
            >
                <div className="container">
                    {isHome && (
                        <Link className='m-3' href="/" aria-label='Tersoft Company'>
                            <Navbar.Brand>
                                <Image
                                    src="/logo.png"
                                    width={60}
                                    height={60}
                                    className="d-inline-block align-top"
                                    alt="Tersoft"
                                    priority
                                />
                            </Navbar.Brand>
                        </Link>)
                    }
                    {!isHome && (
                        <Link className='m-3' href="/" aria-label='Tersoft Company' onClick={handleLinkClick}>
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
                        </Link>)}
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
                        {!isProfilePage && (
                            <Nav className="me-auto mx-5">
                                <Nav.Item className='mb-2'>
                                    <Link className='m-3' aria-label='Ir a nuestros productos' href="/#products">
                                        {HeaderTexts.products}
                                    </Link>
                                </Nav.Item>
                                {!isBlogPage && (<Nav.Item className='mb-2'>
                                    <Link className='m-3' aria-label='Ir al blog' href="/blog" onClick={handleLinkClick}>
                                        {HeaderTexts.blog}
                                    </Link>
                                </Nav.Item>)
                                }
                                {0 !== 0 && (
                                    <Nav.Item className='mb-2'>
                                        <Link className='m-3' aria-label='Ir al blog' href="/#" /* onClick={handleLinkClick} */>
                                            {HeaderTexts.resources}
                                        </Link>
                                    </Nav.Item>
                                )}
                                <Nav.Item className='mb-2'>
                                    <Link className='m-3' aria-label='Ir a la información de tersoft' href="/#info">
                                        {HeaderTexts.about}
                                    </Link>
                                </Nav.Item>
                                {!isContactPage && (
                                    <Nav.Item className='mb-2'>
                                        <Link className='m-3' aria-label='Ir a la información de tersoft' href="/#contact">
                                            {HeaderTexts.contact}
                                        </Link>
                                    </Nav.Item>
                                )}
                            </Nav>
                        )}
                        {isProfilePage && (
                            <Nav className="me-auto mx-5">
                                <Nav.Item className='mb-2'>
                                    <Link className='m-3' aria-label='Ir a la información de tersoft' href="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                                </Nav.Item>
                            </Nav>
                        )}
                        {!isLoginPage && !isProfilePage && 0 !== 0 && (
                            <Nav className="align-items-center mx-3">
                                <Nav.Item className="fw-bold mb-2">
                                    <Link className='m-3' aria-label='Iniciar Sesión' href="/login" onClick={handleLinkClick}>
                                        {HeaderTexts.login}
                                    </Link>
                                </Nav.Item>
                            </Nav>
                        )}
                        {isProfilePage && (
                            <Nav className="align-items-center mx-3">
                                <Nav.Item className="fw-bold mb-2">
                                    <Link className='m-3' aria-label='Iniciar Sesión' href="/login" onClick={
                                        () => {
                                            localStorage.removeItem('token');
                                            handleLinkClick();
                                            Router.push('/login');
                                        }
                                    }>
                                        {HeaderTexts.logout}
                                    </Link>
                                </Nav.Item>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
