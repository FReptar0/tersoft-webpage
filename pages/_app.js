import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Analytics } from '@vercel/analytics/react';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} />
            <Analytics/>
        </>
    )
};

export default MyApp;