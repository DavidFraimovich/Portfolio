import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudiesShowcase } from "@/components/CaseStudiesShowcase";
import { getAllCaseStudies } from "@/lib/content";
import { generateLocaleStaticParams, isLocale, withLocalePath } from "@/lib/i18n";
import { buildDocumentTitle } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);
  const canonical = `${siteUrl}${withLocalePath(safeLocale, "/case-studies")}`;

  return {
    title: {
      absolute: buildDocumentTitle(site.nav_case_studies, site.brand_name)
    },
    description: site.case_studies_intro,
    alternates: {
      canonical
    },
    openGraph: {
      title: site.nav_case_studies,
      description: site.case_studies_intro,
      type: "website",
      url: canonical
    },
    twitter: {
      card: "summary_large_image",
      title: site.nav_case_studies,
      description: site.case_studies_intro
    }
  };
}

export default async function LocalizedCaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);
  const caseStudies = getAllCaseStudies(locale);

  return <CaseStudiesShowcase locale={locale} title={site.case_studies_title} caseStudies={caseStudies} />;
}
