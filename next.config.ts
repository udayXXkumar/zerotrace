import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // enable static export for GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
