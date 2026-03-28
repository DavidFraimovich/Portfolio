import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const exportRouteLocales = ["en", "he"] as const;

export type ExportRouteLocale = (typeof exportRouteLocales)[number];

export type ExportRouteEntry = {
  path: string;
  lastModified: Date;
};

type StaticLocaleRoute = {
  path: string;
  includeInSitemap: boolean;
};

type CaseStudyFrontmatter = {
  date?: string;
};

const staticLocaleRoutes: StaticLocaleRoute[] = [
  { path: "", includeInSitemap: true },
  { path: "/resume", includeInSitemap: true },
  { path: "/case-studies", includeInSitemap: true },
  { path: "/about", includeInSitemap: false },
  { path: "/contact", includeInSitemap: false }
];

function withLocalePath(locale: ExportRouteLocale, routePath = ""): string {
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

function readDirSafe(target: string): string[] {
  if (!fs.existsSync(target)) return [];
  return fs.readdirSync(target).filter((file) => file.endsWith(".mdx"));
}

function parseFrontmatterDate(filePath: string): Date {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const frontmatter = data as CaseStudyFrontmatter;
  const parsedDate = new Date(frontmatter.date ?? "");

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date();
  }

  return parsedDate;
}

export function normalizeExportRoutePath(pathname: string): string {
  const [pathWithoutQuery] = pathname.split(/[?#]/, 1);
  const withLeadingSlash = pathWithoutQuery.startsWith("/") ? pathWithoutQuery : `/${pathWithoutQuery}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");

  if (collapsed.length > 1 && collapsed.endsWith("/")) {
    return collapsed.slice(0, -1);
  }

  return collapsed || "/";
}

export function getConfiguredBasePath(): string {
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isUserPagesRepo = repoName.endsWith(".github.io");

  return repoName && !isUserPagesRepo ? `/${repoName}` : "";
}

export function stripConfiguredBasePath(pathname: string): string {
  const normalizedPathname = normalizeExportRoutePath(pathname);
  const configuredBasePath = getConfiguredBasePath();

  if (!configuredBasePath) return normalizedPathname;
  if (normalizedPathname === configuredBasePath) return "/";
  if (normalizedPathname.startsWith(`${configuredBasePath}/`)) {
    return normalizeExportRoutePath(normalizedPathname.slice(configuredBasePath.length));
  }

  return normalizedPathname;
}

export function isPageRequestPath(pathname: string): boolean {
  const normalizedPathname = normalizeExportRoutePath(pathname);

  if (normalizedPathname.startsWith("/_next")) return false;
  if (normalizedPathname.startsWith("/api")) return false;

  const lastSegment = normalizedPathname.split("/").filter(Boolean).at(-1) ?? "";
  return !lastSegment.includes(".");
}

export function getCaseStudyRouteEntries(): Array<{
  locale: ExportRouteLocale;
  slug: string;
  path: string;
  lastModified: Date;
}> {
  return exportRouteLocales.flatMap((locale) => {
    const directory = path.join(process.cwd(), "content", locale, "case-studies");

    return readDirSafe(directory).map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(directory, file);

      return {
        locale,
        slug,
        path: normalizeExportRoutePath(withLocalePath(locale, `/case-studies/${slug}`)),
        lastModified: parseFrontmatterDate(filePath)
      };
    });
  });
}

export function getValidHtmlRoutePaths(): Set<string> {
  const validPaths = new Set<string>([normalizeExportRoutePath("/"), normalizeExportRoutePath("/admin")]);

  for (const locale of exportRouteLocales) {
    for (const route of staticLocaleRoutes) {
      validPaths.add(normalizeExportRoutePath(withLocalePath(locale, route.path)));
    }
  }

  for (const entry of getCaseStudyRouteEntries()) {
    validPaths.add(entry.path);
  }

  return validPaths;
}

export function getSitemapRouteEntries(): ExportRouteEntry[] {
  const routeEntries: ExportRouteEntry[] = [
    {
      path: normalizeExportRoutePath("/"),
      lastModified: new Date()
    }
  ];

  for (const locale of exportRouteLocales) {
    for (const route of staticLocaleRoutes) {
      if (!route.includeInSitemap) continue;

      routeEntries.push({
        path: normalizeExportRoutePath(withLocalePath(locale, route.path)),
        lastModified: new Date()
      });
    }
  }

  for (const entry of getCaseStudyRouteEntries()) {
    routeEntries.push({
      path: entry.path,
      lastModified: entry.lastModified
    });
  }

  return routeEntries;
}
