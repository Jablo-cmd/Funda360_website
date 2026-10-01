import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Every page is statically generated. Set STATIC_EXPORT=1 to emit a plain
  // static site in ./out (e.g. for GitHub Pages or any static host).
  ...(process.env.STATIC_EXPORT === '1' ? { output: 'export' as const, trailingSlash: true } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
