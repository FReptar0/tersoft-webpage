/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
    images: {
        domains: ['images.unsplash.com', 'via.placeholder.com', 'hs-22735219.f.hubspotfree.net'],
    },
}

module.exports = nextConfig
