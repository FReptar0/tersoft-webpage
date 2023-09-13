import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@chakra-ui/react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }) => {

    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-PBPR6TZF' });
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
                <meta name='theme-color' content='#000000' />
                {/* manifest */}
                <link rel='manifest' href='/manifest.json' />
                <meta name="theme-color" content="#317EFB" />
            </Head>
            <ChakraProvider>
                <Component {...pageProps} />
                <Analytics />
            </ChakraProvider>
        </>
    );
};

export default MyApp;