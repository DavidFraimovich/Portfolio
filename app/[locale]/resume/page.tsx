import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeOverview } from "@/components/ResumeOverview";
import { generateLocaleStaticParams, isLocale, withLocalePath } from "@/lib/i18n";
import { buildDocumentTitle } from "@/lib/metadata";
import { getResumeContent } from "@/lib/resumeContent";
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
  const resumeContent = getResumeContent(safeLocale);
  const canonical = `${siteUrl}${withLocalePath(safeLocale, "/resume")}`;

  return {
    title: {
      absolute: buildDocumentTitle(site.nav_resume, site.brand_name)
    },
    description: resumeContent.hero.summary,
    alternates: {
      canonical
    },
    openGraph: {
      title: site.nav_resume,
      description: resumeContent.hero.summary,
      type: "website",
      url: canonical
    },
    twitter: {
      card: "summary_large_image",
      title: site.nav_resume,
      description: resumeContent.hero.summary
    }
  };
}

export default async function LocalizedResumePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);
  const resumeContent = getResumeContent(locale);

  return <ResumeOverview locale={locale} site={site} content={resumeContent} />;
}
