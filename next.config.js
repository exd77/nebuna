// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Next.js dev resources (HMR etc.) when the app is accessed via
  // network IPs in addition to localhost. Add hosts here as needed.
  allowedDevOrigins: ['152.42.190.14'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
    // DiceBear and a few other trusted sources serve avatars/logos as SVG.
    // We allow them through the Image Optimization API with a strict CSP
    // that blocks scripts inside the SVG payload itself.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  turbopack: {
    root: path.join(__dirname),
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
};

module.exports = nextConfig;