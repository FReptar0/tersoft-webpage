/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'es',
    },
    images: {
        domains: ['images.unsplash.com'],
    },
}

module.exports = nextConfig
