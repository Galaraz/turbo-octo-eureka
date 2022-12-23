/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-dev.infoimoveis.com.br',
      },
    ],
  },

}


module.exports = nextConfig
