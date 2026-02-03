/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/creativedays-site' : '',
  assetPrefix: isProd ? '/creativedays-site/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig