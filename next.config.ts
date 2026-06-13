import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES_BASE_PATH || "";
const assetPrefix = basePath ? basePath : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
