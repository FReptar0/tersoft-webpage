import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@chakra-ui/react'
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