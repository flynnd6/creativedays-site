/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/creativedays-site',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig