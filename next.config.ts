import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Generate a static export in `out/`
  output: "export",

  // Prefix all built assets when deployed to the GitHub Pages project URL
  // so CSS/JS/images load from /static-site-test/_next/... instead of /_next/...
  assetPrefix: isProd ? "/static-site-test" : undefined,

  // If you use next/image anywhere, you almost always need this for static hosting:
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
