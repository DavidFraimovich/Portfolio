import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getSiteContent } from "@/lib/siteContent";
import { isLocale, localeDirection, locales, type Locale } from "@/lib/i18n";

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

  return {
    title: {
      default: site.site_title,
      template: `%s | ${site.site_title}`
    },
    description: site.subheadline,
    openGraph: {
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
      <Nav locale={locale} site={site} />
      <main>{children}</main>
      <Footer site={site} />
    </div>
  );
}
