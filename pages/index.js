import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CTA from './components/CTA';

export default function Index() {
    const aboutRef = useRef(null);
    const infoRef = useRef(null);
    const testimonialsRef = useRef(null);
    const ctaRef = useRef(null);
    const clientsRef = useRef(null);
    const teamRef = useRef(null);

    useEffect(() => {
        const sections = [
            { ref: aboutRef, id: 'about' },
            { ref: infoRef, id: 'info' },
            { ref: testimonialsRef, id: 'testimonials' },
            { ref: ctaRef, id: 'cta' },
            { ref: clientsRef, id: 'clients' },
            { ref: teamRef, id: 'team' }
        ];

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
                    if (sectionIndex > -1) {
                        for (let i = 0; i <= sectionIndex; i++) {
                            sections[i].ref.current.classList.add('show');
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        sections.forEach((section) => {
            observer.observe(section.ref.current);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Head>
                <title>Tersoft | Soluciones Empresariales y Consultoría para Sage 300 ERP</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <meta name='description' content='Tersoft es una empresa líder en consultoría y servicios de ERP de Sage 300. Nuestro equipo de expertos altamente capacitados ofrece soluciones personalizadas y optimización de Sage 300 ERP para impulsar la eficiencia de tu negocio. Ofrecemos servicios de implementación, consultoría especializada y personalización de Sage 300 ERP para adaptarlo a tus necesidades únicas. ¡Contáctanos y descubre cómo Tersoft puede ayudarte a aprovechar al máximo tu sistema ERP!' />
                <meta name='keywords' content='Tersoft, consultoría ERP, Sage 300, servicios empresariales, implementación de ERP, optimización de Sage 300, personalización de ERP, expertos en Sage 300, soluciones empresariales, consultores de ERP' />
                <meta name='lang' content='es' />
                <meta name='author' content='GitHub: FReptar0 | Linkedin: /in/fernando-rm' />
                <meta name='robots' content='index, follow' />
                <meta httpEquiv='cache-control' content='max-age=31536000' />
            </Head>
            <Header />
            <Container style={styles.container}>
                <section ref={aboutRef} className='pt-5 p-3 section' id='about'>
                    <Hero />
                </section>
                <section ref={infoRef} className='p-3 section' id='info'>
                    <Hero />
                </section>
                <section ref={testimonialsRef} className='p-3 section' id='testimonials'>
                    <Hero />
                </section>
                <section ref={ctaRef} className='p-3 section' id='cta'>
                    <CTA />
                </section>
                <section ref={clientsRef} className='p-3 section' id='clients'>
                    <Hero />
                </section>
                <section ref={teamRef} className='p-3 section' id='team'>
                    <Hero />
                </section>
            </Container>
            <Footer />
        </>
    );
}

const styles = {
    container: {
        marginTop: '10vh',
    },
};
