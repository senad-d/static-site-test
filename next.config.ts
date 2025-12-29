import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a static export in `out/`
  output: "export",

  // If you use next/image anywhere, you almost always need this for static hosting:
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
