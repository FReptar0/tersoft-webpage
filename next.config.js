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
        urlImports: ['https://www.google.com/recaptcha/api.js?render=6Lc3Fj8oAAAAAFhNhIjvo8JN0ApWM1RU46NtSUJB'],
    },
}

module.exports = withBundleAnalyzer(nextConfig)
