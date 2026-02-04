/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-sanity', 'sanity'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
