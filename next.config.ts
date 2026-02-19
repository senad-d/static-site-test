import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPage = !!repo && repo.endsWith(".github.io");

const basePath = isGitHubPages && repo && !isUserOrOrgPage ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
