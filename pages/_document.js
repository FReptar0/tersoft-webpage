import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '@/utils/theme'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />
                <script async src="https://www.googletagmanager.com/gtag/js?id=AW-987040395"></script>
                {/* 
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'AW-987040395');
                </script>
                <script>
                    gtag('event', 'conversion', {'send_to': 'AW-987040395/Vsf2COSfgeEYEIuV1NYD'});
                </script>
                 */}
                <Script dangerouslySetInnerHTML={
                    {
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'AW-987040395');
                            gtag('event', 'conversion', {'send_to': 'AW-987040395/Vsf2COSfgeEYEIuV1NYD'});
                        `
                    }
                } />

            </Head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
                <Script src='https://cdn.customgpt.ai/js/chat.js' type='text/javascript' strategy='beforeInteractive' />
                <Script src='https://assets.calendly.com/assets/external/widget.js' type='text/javascript' strategy='lazyOnload' />
            </body>
        </Html>
    )
}