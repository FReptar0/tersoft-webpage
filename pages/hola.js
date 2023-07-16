import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarruselTestimonial from '@/components/Testimonials';
import CallToActionWithVideo from '@/components/Hero';
import GridList from '@/components/OurWork';
import WaitingList from '@/components/CTA';
import TableProducts from '@/components/Products';
import ContactForm from '@/components/Contact';
import Team from '@/components/Team';
import ClientsCard from '@/components/Clients';

export default function Index() {
    const aboutRef = useRef(null);
    const infoRef = useRef(null);
    const testimonialsRef = useRef(null);
    const ctaRef = useRef(null);
    const clientsRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);
    const productsRef = useRef(null);

    useEffect(() => {


        window.onload = function () { CustomGPT.init({ p_id: "3145", p_key: "a092741ecfdcb02c2cedf2fc43a560ab" }); };

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
                <script src='https://cdn.customgpt.ai/js/chat.js'></script>
            </Head>
            <Header />
            <section className='mt-5 section show' id='about'>
                <CallToActionWithVideo />
            </section>
            <section className='section mb-5 show' id='info'>
                <GridList />
            </section>
            <section className='section show' id='testimonials'>
                <CarruselTestimonial />
            </section>
            <section className='section p-5 show' id='products'>
                <TableProducts />
            </section>
            <section className='section show' id='cta'>
                <WaitingList />
            </section>
            <section className='section p-3 show' style={styles.section} id='team'>
                <Team />
            </section>
            <section className='section p-3 show' id='clients'>
                <ClientsCard />
            </section>
            <section className='section mt-5 mb-5 show' id='contact'>
                <ContactForm />
            </section>
            <Footer />
        </>
    );
}

const styles = {
    section: {
        padding: '0!important'
    }
};