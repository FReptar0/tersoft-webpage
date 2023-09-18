import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '@/utils/theme'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />
            </Head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
                <Script
                src='https://cdn.customgpt.ai/js/chat.js' type='text/javascript' strategy='beforeInteractive' />
                <Script src='https://assets.calendly.com/assets/external/widget.js' type='text/javascript' strategy='lazyOnload' />
            </body>
        </Html>
    )
}