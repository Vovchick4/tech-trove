/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    distDir: 'dist',
    images: {
        domains: ['images.unsplash.com', 'www.google.com', 'i0.wp.com'],
    },
}

module.exports = nextConfig
