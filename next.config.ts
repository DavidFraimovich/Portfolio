import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserPagesRepo = repoName.endsWith(".github.io");
const githubPagesBase = repoName && !isUserPagesRepo ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: githubPagesBase,
  assetPrefix: githubPagesBase || undefined
};

export default nextConfig;
