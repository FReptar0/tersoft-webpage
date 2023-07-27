import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />
            </Head>
            <body>
                <Main />
                <NextScript />
                <Script src='https://cdn.customgpt.ai/js/chat.js' type='text/javascript' strategy='beforeInteractive' />
                <Script src='https://assets.calendly.com/assets/external/widget.js' type='text/javascript' strategy='lazyOnload' />
            </body>
        </Html>
    )
}