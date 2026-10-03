import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 55, 60, 75],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
