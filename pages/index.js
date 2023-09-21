import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const CarruselTestimonial = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const GridList = dynamic(() => import('@/components/OurWork'), { ssr: false });
//const WaitingList = dynamic(() => import('@/components/CTA'), { ssr: false });
const TableProducts = dynamic(() => import('@/components/Products'), { ssr: false });
const ContactForm = dynamic(() => import('@/components/Contact'), { ssr: false });
const Team = dynamic(() => import('@/components/Team'), { ssr: false });
const ClientsCard = dynamic(() => import('@/components/Clients'), { ssr: false });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });

export default function Index() {

    useEffect(() => {
        CustomGPT.init({ p_id: "3145", p_key: "a092741ecfdcb02c2cedf2fc43a560ab" }).then(() => {
            const chat = document.getElementById('cgptcb-chat-circle')
            chat.style.marginBottom = '70px';

            // esperar a que se cargue el chat
            setTimeout(() => {
                const imagen = document.getElementById('chatBubbleImageId')
                
                if(imagen) {
                    imagen.alt = 'IA Chatbot Tersoft';
                }
                
            }, 2500);


        }).catch((err) => {
            console.log(err);
        });
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
            <section className='mt-5' id='about'>
                <Hero />
            </section>
            <section className='mb-5' id='info'>
                <GridList />
            </section>
            <section id='testimonials'>
                <CarruselTestimonial />
            </section>
            <section className='p-5' id='products'>
                <TableProducts />
            </section>
            {/* <section id='cta'>
                <WaitingList />
            </section> */}
            <section className='p-3' style={styles.section} id='team'>
                <Team />
            </section>
            <section className='p-3' id='clients'>
                <ClientsCard />
            </section>
            <section className='mt-5' id='faq'>
                <FAQ />
            </section>
            <section className='mt-5 mb-5' id='contact'>
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