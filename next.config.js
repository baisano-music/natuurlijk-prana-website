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
  async redirects() {
    return [
      // Speciale pagina redirects
      {
        source: '/gratis-e-magazine',
        destination: '/gratis-magazine',
        permanent: true,
      },
      {
        source: '/consult-bloesemremedies',
        destination: '/tarieven',
        permanent: true,
      },
      {
        source: '/lees-ervaringen',
        destination: '/ervaringen',
        permanent: true,
      },
      // WordPress account pagina's (niet meer nodig)
      {
        source: '/mijn-account',
        destination: '/',
        permanent: true,
      },
      {
        source: '/uitloggen',
        destination: '/',
        permanent: true,
      },
      {
        source: '/producten-bestellen',
        destination: '/contact',
        permanent: true,
      },
      // Oude product/remedie URLs
      {
        source: '/het-nest',
        destination: '/remedies/het-nest',
        permanent: true,
      },
      {
        source: '/liefde',
        destination: '/remedies/liefde',
        permanent: true,
      },
      {
        source: '/regenbooglicht',
        destination: '/remedies/regenbooglicht',
        permanent: true,
      },
      {
        source: '/stroming',
        destination: '/remedies/stroming',
        permanent: true,
      },
      {
        source: '/vertrouwen',
        destination: '/remedies/vertrouwen',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
