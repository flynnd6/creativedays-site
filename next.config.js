/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/creativedays-site',  // Replace with your actual repo name
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig