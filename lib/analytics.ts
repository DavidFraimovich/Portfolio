export const googleAnalyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

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

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getCurrentLocale(): string | undefined {
  if (typeof window !== "undefined") {
    const localeSegment = window.location.pathname.split("/").filter(Boolean)[0];

    if (localeSegment === "en" || localeSegment === "he") {
      return localeSegment;
    }
  }

  if (typeof document === "undefined") return undefined;

  const language = document.documentElement.lang?.trim();
  return language || undefined;
}

function getCurrentPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return `${window.location.pathname}${window.location.search}`;
}

function sanitizeAnalyticsParams(params: AnalyticsParams): Record<string, AnalyticsPrimitive> {
  const entries = Object.entries(params).filter(([, value]) => value !== null && value !== undefined);

  return Object.fromEntries(entries) as Record<string, AnalyticsPrimitive>;
}

export function canTrackAnalytics(): boolean {
  return Boolean(googleAnalyticsMeasurementId && typeof window !== "undefined" && typeof window.gtag === "function");
}

export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  if (!canTrackAnalytics()) return;

  window.gtag?.("event", name, sanitizeAnalyticsParams(params));
}

export function trackPageView(path: string, title?: string): void {
  trackEvent("page_view", {
    locale: getCurrentLocale(),
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_path: path,
    page_title: title || (typeof document !== "undefined" ? document.title : undefined)
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
  trackEvent(eventName, {
    click_text: label,
    destination_url: href,
    link_type: kind,
    locale: locale || getCurrentLocale(),
    page_path: getCurrentPagePath(),
    section,
    ui_location: location
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
