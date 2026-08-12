const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: 'export',
  trailingSlash: true,
  basePath: isDev ? undefined : '/dataodssey',
  assetPrefix: isDev ? undefined : '/dataodssey/',
};
module.exports = nextConfig;
