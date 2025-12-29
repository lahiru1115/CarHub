import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost', // cdn.imagin.studio
      },
    ],
  },
};

export default nextConfig;
