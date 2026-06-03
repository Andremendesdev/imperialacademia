import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Em dev, não segura versão antiga ao substituir PNG em /public */
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
