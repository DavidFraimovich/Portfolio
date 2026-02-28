import type { MetadataRoute } from "next";

export const dynamic = "force-static";

function resolveSiteBaseUrl(): string {
  const candidate = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const fallback = "https://example.com";
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isUserPagesRepo = repositoryName.endsWith(".github.io");
  const projectPagesPath = repositoryName && !isUserPagesRepo ? `/${repositoryName}` : "";

  if (!candidate) return `${fallback}${projectPagesPath}`;

  try {
    const parsed = new URL(candidate);
    if (projectPagesPath && parsed.pathname === "/") parsed.pathname = projectPagesPath;
    return parsed.toString().replace(/\/$/, "");
  } catch {
    try {
      const parsed = new URL(`https://${candidate}`);
      if (projectPagesPath && parsed.pathname === "/") parsed.pathname = projectPagesPath;
      return parsed.toString().replace(/\/$/, "");
    } catch {
      return `${fallback}${projectPagesPath}`;
    }
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteBaseUrl = resolveSiteBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteBaseUrl}/sitemap.xml`
  };
}
