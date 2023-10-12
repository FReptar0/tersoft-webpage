/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
    openAnalyzer: false,
})

const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
    images: {
        domains: ['images.unsplash.com', 'via.placeholder.com', 'hs-22735219.f.hubspotfree.net'],
    },
    experimental: {
        optimizeCss: true,
    },
}

module.exports = withBundleAnalyzer(nextConfig)
