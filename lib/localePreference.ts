import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export const localePreferenceKey = "site-locale";
const oneYearInSeconds = 60 * 60 * 24 * 365;

function readLocaleCookie(): Locale | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${localePreferenceKey}=`));

  if (!cookie) return null;
  const value = decodeURIComponent(cookie.split("=")[1] ?? "");
  return isLocale(value) ? value : null;
}

export function readSavedLocalePreference(): Locale | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(localePreferenceKey);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // Ignore storage errors and continue to cookie fallback.
  }

  return readLocaleCookie();
}

export function saveLocalePreference(locale: Locale): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  try {
    window.localStorage.setItem(localePreferenceKey, locale);
  } catch {
    // Ignore storage errors and continue with cookie.
  }

  document.cookie = `${localePreferenceKey}=${encodeURIComponent(locale)}; path=/; max-age=${oneYearInSeconds}; samesite=lax`;
}

export function parseLocaleOverride(value: string | null): Locale | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return isLocale(normalized) ? normalized : null;
}

async function lookupCountryCodeByIp(timeoutMs = 2000): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("https://ipapi.co/country/", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal
    });

    if (!response.ok) return null;

    const countryCode = (await response.text()).trim().toUpperCase();
    return /^[A-Z]{2}$/.test(countryCode) ? countryCode : null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function resolveFromBrowserSignals(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const languages = [...(navigator.languages ?? []), navigator.language]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  const hasHebrewLanguageSignal = languages.some(
    (value) => value === "he" || value.startsWith("he-") || value === "iw" || value.startsWith("iw-")
  );
  if (hasHebrewLanguageSignal) return "he";

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const hasJerusalemTimezone = timeZone === "Asia/Jerusalem";
  const hasIsraelUserAgentHint = /(he-il|iw-il|israel)/i.test(navigator.userAgent);

  if (hasJerusalemTimezone && hasIsraelUserAgentHint) return "he";

  return defaultLocale;
}

export async function resolveInitialLocale(searchParams: URLSearchParams | string): Promise<Locale> {
  const params = typeof searchParams === "string" ? new URLSearchParams(searchParams) : searchParams;

  const localeOverride = parseLocaleOverride(params.get("lang"));
  if (localeOverride) {
    saveLocalePreference(localeOverride);
    return localeOverride;
  }

  const savedLocale = readSavedLocalePreference();
  if (savedLocale) return savedLocale;

  const countryCode = await lookupCountryCodeByIp();
  if (countryCode === "IL") {
    saveLocalePreference("he");
    return "he";
  }

  if (countryCode) {
    saveLocalePreference("en");
    return "en";
  }

  const localeFromBrowser = resolveFromBrowserSignals();
  saveLocalePreference(localeFromBrowser);
  return localeFromBrowser;
}
