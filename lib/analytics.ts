import { basePath, siteUrl } from "@/lib/site";

export const googleAnalyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const BLOCKED_ANALYTICS_HOSTNAMES = ["localhost", "127.0.0.1", "[::1]"] as const;

type AnalyticsPrimitive = boolean | number | string;

export type AnalyticsParams = Record<string, AnalyticsPrimitive | null | undefined>;

export type TrackClickOptions = {
  eventName?: string;
  href?: string;
  kind: "download" | "external" | "form" | "hash" | "internal" | "mailto" | "tel";
  label: string;
  locale?: string;
  location: string;
  section?: string;
};

type AnalyticsRouteContext = {
  locale?: string;
  pageType: string;
  path: string;
  route: string;
};

type DestinationAnalyticsContext = AnalyticsRouteContext & {
  hash?: string;
  host?: string;
  isOutbound?: number;
  protocol?: string;
  url?: string;
};

type TrackExceptionOptions = {
  extra?: AnalyticsParams;
  fatal?: boolean;
  source: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const FILE_PATH_PATTERN = /\/[^/?#]+\.[a-z0-9]{1,8}$/i;
const HTTP_PROTOCOL_PATTERN = /^https?:$/i;
const ANALYTICS_TEXT_MAX_LENGTH = 180;

function isBlockedAnalyticsHostname(hostname: string): boolean {
  return BLOCKED_ANALYTICS_HOSTNAMES.includes(hostname as (typeof BLOCKED_ANALYTICS_HOSTNAMES)[number]);
}

export function isAnalyticsBlockedForCurrentHost(): boolean {
  if (typeof window === "undefined") return false;
  return isBlockedAnalyticsHostname(window.location.hostname);
}

export function getAnalyticsLocalhostGuardScript(measurementId: string): string {
  const blockedHostnames = JSON.stringify(BLOCKED_ANALYTICS_HOSTNAMES);
  const disableKey = JSON.stringify(`ga-disable-${measurementId}`);

  return `
    (function () {
      try {
        var hostnames = ${blockedHostnames};

        if (hostnames.indexOf(window.location.hostname) === -1) {
          return;
        }

        window[${disableKey}] = true;
      } catch (e) {}
    })();
  `;
}

function getSiteOrigin(): string | undefined {
  try {
    return new URL(siteUrl).origin;
  } catch {
    return undefined;
  }
}

function stripBasePath(pathname: string): string {
  if (!pathname) return "/";

  if (basePath && pathname === basePath) {
    return "/";
  }

  if (basePath && pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length) || "/";
  }

  return pathname;
}

function normalizePathname(pathname: string): string {
  const strippedPath = stripBasePath(pathname);
  const normalized = strippedPath.startsWith("/") ? strippedPath : `/${strippedPath}`;

  if (normalized !== "/" && !normalized.endsWith("/") && !FILE_PATH_PATTERN.test(normalized)) {
    return `${normalized}/`;
  }

  return normalized;
}

function normalizePathWithSearch(pathname: string, search = ""): string {
  const normalizedPath = normalizePathname(pathname);

  if (!search) return normalizedPath;
  return `${normalizedPath}${search.startsWith("?") ? search : `?${search}`}`;
}

function getRouteContextFromPath(pathname: string): AnalyticsRouteContext {
  const normalizedPath = normalizePathname(pathname);
  const parts = normalizedPath.split("/").filter(Boolean);
  const locale = parts[0] === "en" || parts[0] === "he" ? parts[0] : undefined;

  if (!locale) {
    if (normalizedPath === "/") {
      return { pageType: "root", path: normalizedPath, route: "/" };
    }

    if (normalizedPath === "/admin/") {
      return { pageType: "admin", path: normalizedPath, route: "/admin/" };
    }

    if (normalizedPath === "/robots.txt") {
      return { pageType: "robots", path: normalizedPath, route: "/robots.txt" };
    }

    if (normalizedPath === "/sitemap.xml") {
      return { pageType: "sitemap", path: normalizedPath, route: "/sitemap.xml" };
    }

    return { pageType: FILE_PATH_PATTERN.test(normalizedPath) ? "asset" : "unknown", path: normalizedPath, route: normalizedPath };
  }

  if (parts.length === 1) {
    return { locale, pageType: "home", path: normalizedPath, route: "/[locale]/" };
  }

  if (parts[1] === "about") {
    return { locale, pageType: "about", path: normalizedPath, route: "/[locale]/about/" };
  }

  if (parts[1] === "contact") {
    return { locale, pageType: "contact", path: normalizedPath, route: "/[locale]/contact/" };
  }

  if (parts[1] === "resume") {
    return { locale, pageType: "resume", path: normalizedPath, route: "/[locale]/resume/" };
  }

  if (parts[1] === "case-studies" && parts.length === 2) {
    return { locale, pageType: "case_studies_index", path: normalizedPath, route: "/[locale]/case-studies/" };
  }

  if (parts[1] === "case-studies" && parts.length >= 3) {
    return { locale, pageType: "case_study_detail", path: normalizedPath, route: "/[locale]/case-studies/[slug]/" };
  }

  return { locale, pageType: "unknown", path: normalizedPath, route: normalizedPath };
}

export function getCurrentPageAnalyticsContext(): AnalyticsRouteContext {
  if (typeof window !== "undefined") {
    return getRouteContextFromPath(window.location.pathname);
  }

  return { pageType: "unknown", path: "/", route: "/" };
}

function getCurrentPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return normalizePathWithSearch(window.location.pathname, window.location.search);
}

function resolveHref(href: string): URL | null {
  try {
    if (typeof window !== "undefined") {
      return new URL(href, window.location.href);
    }

    return new URL(href, siteUrl);
  } catch {
    return null;
  }
}

function getDestinationAnalyticsContext(
  href: string | undefined,
  kind: TrackClickOptions["kind"],
  sourceContext: AnalyticsRouteContext
): DestinationAnalyticsContext {
  if (!href) {
    return {
      pageType: "unknown",
      path: sourceContext.path,
      route: sourceContext.route
    };
  }

  if (href.startsWith("#")) {
    return {
      ...sourceContext,
      hash: href
    };
  }

  if (kind === "mailto" || kind === "tel") {
    return {
      pageType: kind,
      path: href,
      protocol: kind,
      route: href,
      url: href
    };
  }

  const resolvedUrl = resolveHref(href);

  if (!resolvedUrl) {
    return {
      pageType: "unknown",
      path: href,
      route: href,
      url: href
    };
  }

  const normalizedPath = normalizePathWithSearch(resolvedUrl.pathname, resolvedUrl.search);
  const routeContext = getRouteContextFromPath(resolvedUrl.pathname);
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : getSiteOrigin();
  const isOutbound = HTTP_PROTOCOL_PATTERN.test(resolvedUrl.protocol) && Boolean(currentOrigin && resolvedUrl.origin !== currentOrigin);

  return {
    ...routeContext,
    hash: resolvedUrl.hash || undefined,
    host: resolvedUrl.host || undefined,
    isOutbound: isOutbound ? 1 : 0,
    path: normalizedPath,
    protocol: resolvedUrl.protocol.replace(":", ""),
    url: resolvedUrl.toString()
  };
}

function sanitizeAnalyticsParams(params: AnalyticsParams): Record<string, AnalyticsPrimitive> {
  const entries = Object.entries(params).filter(([, value]) => value !== null && value !== undefined);

  return Object.fromEntries(entries) as Record<string, AnalyticsPrimitive>;
}

function truncateAnalyticsText(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const normalized = value.trim();
  if (!normalized) return undefined;

  return normalized.length > ANALYTICS_TEXT_MAX_LENGTH
    ? normalized.slice(0, ANALYTICS_TEXT_MAX_LENGTH)
    : normalized;
}

function normalizeError(error: unknown): { message?: string; name?: string; stack?: string } {
  if (error instanceof Error) {
    return {
      message: truncateAnalyticsText(error.message),
      name: truncateAnalyticsText(error.name),
      stack: truncateAnalyticsText(error.stack?.split("\n").slice(0, 2).join(" | "))
    };
  }

  if (typeof error === "string") {
    return {
      message: truncateAnalyticsText(error)
    };
  }

  if (typeof error === "object" && error) {
    try {
      return {
        message: truncateAnalyticsText(JSON.stringify(error))
      };
    } catch {
      return {
        message: "non_serializable_error"
      };
    }
  }

  return {
    message: truncateAnalyticsText(String(error))
  };
}

export function canTrackAnalytics(): boolean {
  return Boolean(
    googleAnalyticsMeasurementId &&
      typeof window !== "undefined" &&
      !isAnalyticsBlockedForCurrentHost() &&
      typeof window.gtag === "function"
  );
}

export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  if (!canTrackAnalytics()) return;

  window.gtag?.("event", name, sanitizeAnalyticsParams(params));
}

export function trackPageView(path: string, title?: string): void {
  const routeContext = getRouteContextFromPath(path);

  trackEvent("page_view", {
    locale: routeContext.locale,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_path: normalizePathWithSearch(path),
    page_route: routeContext.route,
    page_title: title || (typeof document !== "undefined" ? document.title : undefined),
    page_type: routeContext.pageType
  });
}

export function trackClick({
  eventName = "cta_click",
  href,
  kind,
  label,
  locale,
  location,
  section
}: TrackClickOptions): void {
  const sourceContext = getCurrentPageAnalyticsContext();
  const destinationContext = getDestinationAnalyticsContext(href, kind, sourceContext);
  const sourcePath = getCurrentPagePath() || sourceContext.path;

  trackEvent(eventName, {
    click_group: eventName.replace(/_click$/, ""),
    click_id: location,
    click_kind: kind,
    click_label: label,
    click_section: section,
    destination_hash: destinationContext.hash,
    destination_host: destinationContext.host,
    destination_locale: destinationContext.locale,
    destination_page_type: destinationContext.pageType,
    destination_path: destinationContext.path,
    destination_protocol: destinationContext.protocol,
    destination_route: destinationContext.route,
    destination_url: destinationContext.url || href,
    is_outbound: destinationContext.isOutbound,
    locale: locale || sourceContext.locale,
    page_path: sourcePath,
    source_page_type: sourceContext.pageType,
    source_path: sourcePath,
    source_route: sourceContext.route
  });
}

export function trackException(error: unknown, { extra, fatal = false, source }: TrackExceptionOptions): void {
  const pageContext = getCurrentPageAnalyticsContext();
  const pagePath = getCurrentPagePath() || pageContext.path;
  const normalizedError = normalizeError(error);
  const description = truncateAnalyticsText(
    [source, normalizedError.name, normalizedError.message].filter(Boolean).join(": ")
  );

  trackEvent("exception", {
    description,
    error_message: normalizedError.message,
    error_name: normalizedError.name,
    error_source: truncateAnalyticsText(source),
    error_stack_hint: normalizedError.stack,
    fatal: fatal ? 1 : 0,
    locale: pageContext.locale,
    page_path: pagePath,
    page_route: pageContext.route,
    page_type: pageContext.pageType,
    ...extra
  });
}

export function getMessageLengthBucket(message: string): string {
  const length = message.trim().length;

  if (length === 0) return "empty";
  if (length <= 80) return "1_80";
  if (length <= 240) return "81_240";
  if (length <= 800) return "241_800";
  return "801_plus";
}
