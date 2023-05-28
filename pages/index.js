import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function Index() {
    const [infoVisible, setInfoVisible] = useState(false);
    const [testimonialsVisible, setTestimonialsVisible] = useState(false);
    const [ctaVisible, setCtaVisible] = useState(false);
    const [clientsVisible, setClientsVisible] = useState(false);
    const [teamVisible, setTeamVisible] = useState(false);

    const about = useRef(null);
    const info = useRef(null);
    const testimonials = useRef(null);
    const cta = useRef(null);
    const clients = useRef(null);
    const team = useRef(null);

    const handleScroll = () => {
        const infoDistance = info.current.getBoundingClientRect().top;
        setInfoVisible(infoDistance <= window.innerHeight);

        const testimonialsDistance = testimonials.current.getBoundingClientRect().top;
        setTestimonialsVisible(testimonialsDistance <= window.innerHeight);

        const ctaDistance = cta.current.getBoundingClientRect().top;
        setCtaVisible(ctaDistance <= window.innerHeight);

        const clientsDistance = clients.current.getBoundingClientRect().top;
        setClientsVisible(clientsDistance <= window.innerHeight);

        const teamDistance = team.current.getBoundingClientRect().top;
        setTeamVisible(teamDistance <= window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <meta name='description' content='This is the home page' />
                <meta name='keywords' content='home, page' />
                <meta name='lang' content='es' />
                <meta name='author' content='GitHub: FReptar0 | Linkedin: /in/fernando-rm' />
                <meta name='robots' content='index, follow' />
                <meta httpEquiv='cache-control' content='max-age=31536000' />
            </Head>
            <Header />
            <Container style={styles.container}>
                <section ref={about} className='pt-5' id='about'>
                    <Hero />
                </section>
                <section ref={info} id='info'>
                    {infoVisible && <Hero />}
                </section>
                <section ref={testimonials} id='testimonials'>
                    {testimonialsVisible && <div>Testimonials Section</div>}
                </section>
                <section ref={cta} id='cta'>
                    {ctaVisible && <div>CTA Section</div>}
                </section>
                <section ref={clients} id='clients'>
                    {clientsVisible && <div>Clients Section</div>}
                </section>
                <section ref={team} id='team'>
                    {teamVisible && <div>Team Section</div>}
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
