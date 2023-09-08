/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
    images: {
        domains: ['images.unsplash.com','via.placeholder.com'],
    },
}

module.exports = nextConfig
