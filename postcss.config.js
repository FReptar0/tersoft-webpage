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
                    './pages/**/*.{js,jsx,ts,tsx}'
                ],
                CSS: ['./styles/global.css'],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: [
                    "body",
                    "html",
                    "header",
                    ".navbar-nav",
                    "a",
                    ".navbar-nav a",
                    ".navbar-nav a:hover",
                    ".navbar-nav a:after",
                    "footer",
                    "footer ul li",
                    "footer ul li a",
                    "footer #social-media a",
                    ".footer-upper",
                    ".footer-section",
                    ".footer-section h4",
                    ".footer-section ul",
                    ".footer-section ul li",
                    ".footer-section ul ul li",
                    ".footer-lower",
                    ".footer-right a",
                    ".footer-upper a",
                    ".circle-icon",
                    ".circle-icon#facebook:hover",
                    ".circle-icon#twitter:hover",
                    ".circle-icon#instagram:hover",
                    ".circle-icon#linkedin:hover",
                    "@media (max-width: 768px)",
                    "#social-media",
                    "#copy",
                    "#news-form",
                    ".email-wait",
                    ".package-tier",
                    "#hero-image",
                    ".hero",
                    ".hero-content",
                    ".content-wrapper",
                    ".hero h1",
                    ".hero p",
                    ".hero-image",
                    ".image-wrapper",
                    "#circle-wait-list",
                    "#card-cta",
                    ".email-wait",
                ]
            }
        ],
    ]
}