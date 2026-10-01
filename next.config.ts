import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.iqcars.io" },
      { protocol: "https", hostname: "iqcars-assets.iqcars.io" },
      { protocol: "https", hostname: "customer-gwfahdyt8tqfncta.cloudflarestream.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
