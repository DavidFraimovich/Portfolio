import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { LocaleOverrideHandler } from "@/components/LocaleOverrideHandler";
import { Nav } from "@/components/Nav";
import { siteUrl } from "@/lib/site";
import { getSiteContent } from "@/lib/siteContent";
import { isLocale, localeDirection, locales, type Locale, withLocalePath } from "@/lib/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);
  const canonicalPath = withLocalePath(safeLocale);
  const localeAlternates = Object.fromEntries(
    locales.map((currentLocale) => [currentLocale, `${siteUrl}${withLocalePath(currentLocale)}`])
  );

  return {
    title: {
      default: site.site_title,
      template: `%s | ${site.site_title}`
    },
    description: site.subheadline,
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages: {
        ...localeAlternates,
        "x-default": siteUrl
      }
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: site.site_title,
      description: site.subheadline,
      type: "website",
      url: `${siteUrl}${canonicalPath}`,
      locale: safeLocale === "he" ? "he_IL" : "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title: site.site_title,
      description: site.subheadline
    }
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);

  return (
    <div lang={locale} dir={localeDirection(locale)} className={`locale-root locale-${locale}`}>
      <LocaleOverrideHandler locale={locale} />
      <Nav locale={locale} site={site} />
      <main>{children}</main>
      <Footer locale={locale} site={site} />
    </div>
  );
}
