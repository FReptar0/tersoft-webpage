import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '@/utils/theme'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />

                {/* 
                <!-- Google Tag Manager -->
                    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-PBPR6TZF');</script>
                */}

                <Script dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl+';gtm_auth=;gtm_preview=;gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-PBPR6TZF');
                    `
                }}
                    strategy='beforeInteractive'
                />
            </Head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
                <Script src='https://cdn.customgpt.ai/js/chat.js' type='text/javascript' strategy='beforeInteractive' />
                <Script src='https://assets.calendly.com/assets/external/widget.js' type='text/javascript' strategy='lazyOnload' />
                <noscript dangerouslySetInnerHTML={{
                    __html: `
                        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PBPR6TZF"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>
                    `
                }} />
            </body>
        </Html>
    )
}