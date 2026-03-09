import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserPagesRepo = repoName.endsWith(".github.io");
const githubPagesBase = repoName && !isUserPagesRepo ? `/${repoName}` : "";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: projectRoot,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: githubPagesBase,
  assetPrefix: githubPagesBase || undefined
};

export default nextConfig;
