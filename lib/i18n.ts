export const locales = ["en", "he"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateLocaleStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "he" ? "rtl" : "ltr";
}

export function withLocalePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return `/${locale}`;

  const localeIndex = parts.findIndex((part) => locales.includes(part as Locale));
  if (localeIndex >= 0) {
    parts[localeIndex] = locale;
    return `/${parts.join("/")}`;
  }

  parts.unshift(locale);
  return `/${parts.join("/")}`;
}
