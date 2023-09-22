import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '@/utils/theme'
import Link from 'next/link'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' strategy='lazyOnload' />
            </Head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
                <Script
                src='https://cdn.customgpt.ai/js/chat.js' type='text/javascript' strategy='beforeInteractive' />
                <Script src='https://assets.calendly.com/assets/external/widget.js' type='text/javascript' strategy='lazyOnload' />
                <Script src='https://www.google.com/recaptcha/api.js?render=6Lc3Fj8oAAAAAFhNhIjvo8JN0ApWM1RU46NtSUJB' type='text/javascript' strategy='beforeInteractive' />
            </body>
        </Html>
    )
}