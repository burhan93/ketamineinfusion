import type { NextConfig } from 'next';

/**
 * Static export: `next build` writes plain HTML/CSS/JS to /out, deployable to any host.
 * trailingSlash keeps the existing URL format (/hipaa-notice/, /cookie-policy/ …).
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
