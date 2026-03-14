import enSiteContent from "@/content/site/en.json";
import heSiteContent from "@/content/site/he.json";
import type { Locale } from "@/lib/i18n";

export type SiteContent = typeof enSiteContent;

const siteContentByLocale = {
  en: enSiteContent,
  he: heSiteContent
} satisfies Record<Locale, SiteContent>;

export function getSiteContent(locale: Locale): SiteContent {
  return siteContentByLocale[locale];
}
