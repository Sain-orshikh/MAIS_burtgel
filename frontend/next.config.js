/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return config;
  },
  images: {
    domains: ['placehold.co'],
  },
};

module.exports = nextConfig;
