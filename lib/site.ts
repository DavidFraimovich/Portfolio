export const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
export const isUserPagesRepo = repoName.endsWith(".github.io");
export const basePath = repoName && !isUserPagesRepo ? `/${repoName}` : "";

const host = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const siteUrl = `${host.replace(/\/$/, "")}${basePath}`;

export const siteDefaults = {
  title: "Portfolio",
  description:
    "A clean, conversion-focused portfolio with case studies, resume, and contact details.",
  author: "Your Name"
};
