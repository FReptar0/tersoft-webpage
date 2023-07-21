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
        const sections = [
            { ref: aboutRef, id: 'about' },
            { ref: infoRef, id: 'info' },
            { ref: testimonialsRef, id: 'testimonials' },
            { ref: productsRef, id: 'products' },
            { ref: ctaRef, id: 'cta' },
            { ref: clientsRef, id: 'clients' },
            { ref: teamRef, id: 'team' },
            { ref: contactRef, id: 'contact' }
        ];

        CustomGPT.init({ p_id: "3145", p_key: "a092741ecfdcb02c2cedf2fc43a560ab" });

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
            rootMargin: '100px',
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
            <section ref={aboutRef} className='mt-5 section' id='about'>
                <CallToActionWithVideo />
            </section>
            <section ref={infoRef} className='section mb-5' id='info'>
                <GridList />
            </section>
            <section ref={testimonialsRef} className='section' id='testimonials'>
                <CarruselTestimonial />
            </section>
            <section ref={productsRef} className='section p-5' id='products'>
                <TableProducts />
            </section>
            <section ref={ctaRef} className='section' id='cta'>
                <WaitingList />
            </section>
            <section ref={teamRef} className='section p-3' style={styles.section} id='team'>
                <Team />
            </section>
            <section ref={clientsRef} className='section p-3' id='clients'>
                <ClientsCard />
            </section>
            <section ref={contactRef} className='section mt-5 mb-5' id='contact'>
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