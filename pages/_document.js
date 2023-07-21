import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <script src='https://assets.calendly.com/assets/external/widget.js' type='text/javascript' />
                <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />
                <script src='https://cdn.customgpt.ai/js/chat.js' type='text/javascript' />
                <script src='https://cdn.customgpt.ai/js/CustomGPT.js' type='text/javascript' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}