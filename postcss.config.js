module.exports = {
    "plugins": [
        "postcss-flexbugs-fixes",
        [
            "postcss-preset-env",
            {
                "autoprefixer": {
                    "flexbox": "no-2009"
                },
                "stage": 3,
                "features": {
                    "custom-properties": false
                }
            }
        ],
        [
            '@fullhuman/postcss-purgecss',
            {
                content: [
                    './pages/**/*.{js,jsx,ts,tsx}',
                    './components/**/*.{js,jsx,ts,tsx}',
                ],
                css: [
                    './styles/**/*.css',
                    'bootstrap/dist/css/bootstrap.min.css',
                    '@fortawesome/fontawesome-svg-core/styles.css',
                    '@chakra-ui/react',
                    'slick-carousel/slick/slick.css',
                    'slick-carousel/slick/slick-theme.css',
                    'react-responsive-carousel/lib/styles/carousel.min.css',
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: [
                    "body",
                    "html",
                ]
            }
        ],
    ]
}