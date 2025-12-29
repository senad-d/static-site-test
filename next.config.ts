import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const githubPagesBasePath = "/static-site-test";

const nextConfig: NextConfig = {
  // Generate a static export in `out/`
  output: "export",

  // Ensure routes and public assets are served under the GitHub Pages project path.
  // This makes / become /static-site-test/ in production and prefixes /images, /project-images, favicon, etc.
  basePath: isProd ? githubPagesBasePath : "",

  // Prefix all built assets (_next/*) when deployed to the GitHub Pages project URL
  assetPrefix: isProd ? githubPagesBasePath : undefined,

  // Expose the base path to the client so components can prefix public assets
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? githubPagesBasePath : "",
  },

  // If you use next/image anywhere, you almost always need this for static hosting:
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
