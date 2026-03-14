export const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
export const isUserPagesRepo = repoName.endsWith(".github.io");
export const basePath = repoName && !isUserPagesRepo ? `/${repoName}` : "";

export function withBasePath(path: string): string {
  if (!path) return basePath || "/";
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

function parseSiteUrl(raw: string | undefined): URL {
  const candidate = (raw || "").trim();
  if (!candidate) return new URL("https://davidfraimovich.github.io/portfolio/");

  try {
    return new URL(candidate);
  } catch {
    try {
      return new URL(`https://${candidate}`);
    } catch {
      return new URL("https://davidfraimovich.github.io/portfolio/");
    }
  }
}

const configured = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const configuredPath = configured.pathname.replace(/\/$/, "");
const effectivePath = basePath || configuredPath;

export const siteUrl = `${configured.origin}${effectivePath}`;

export const siteDefaults = {
  title: "Portfolio",
  description:
    "A clean, conversion-focused portfolio with case studies, resume, and contact details.",
  author: "David Fraimovich"
};
