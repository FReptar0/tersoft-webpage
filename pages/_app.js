import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@chakra-ui/react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <ChakraProvider>
                <Component {...pageProps} />
                <Analytics />
            </ChakraProvider>
        </>
    );
};

export default MyApp;