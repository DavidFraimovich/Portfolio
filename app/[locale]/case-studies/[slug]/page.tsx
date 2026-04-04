import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstantLoanRequestCaseStudy } from "@/components/InstantLoanRequestCaseStudy";
import { MdxContent } from "@/components/MdxContent";
import { PaamonimCaseStudy } from "@/components/PaamonimCaseStudy";
import { ResearchSearchCaseStudy } from "@/components/ResearchSearchCaseStudy";
import { SignyNotionEmbed } from "@/components/SignyNotionEmbed";
import { SmartCampusCaseStudy } from "@/components/SmartCampusCaseStudy";
import { SmartCampusLearningCenterCaseStudy } from "@/components/SmartCampusLearningCenterCaseStudy";
import { WebsiteAsProductCaseStudy } from "@/components/WebsiteAsProductCaseStudy";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { formatStableDate } from "@/lib/date";
import { isLocale, locales, type Locale, withLocalePath } from "@/lib/i18n";
import { buildDocumentTitle } from "@/lib/metadata";
import { getSiteContent } from "@/lib/siteContent";
import { siteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: Locale; slug: string }> {
  return locales.flatMap((locale) =>
    getAllCaseStudies(locale).map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);
  const entry = getCaseStudyBySlug(safeLocale, slug);

  if (!entry) {
    return {
      title: {
        absolute: buildDocumentTitle(site.not_found_title, site.brand_name)
      },
      description: site.not_found_description,
      twitter: {
        card: "summary_large_image",
        title: site.not_found_title,
        description: site.not_found_description
      }
    };
  }

  const canonical = `${siteUrl}${withLocalePath(safeLocale, `/case-studies/${entry.slug}`)}`;

  return {
    title: {
      absolute: buildDocumentTitle(entry.frontmatter.title, site.brand_name)
    },
    description: entry.frontmatter.description,
    alternates: {
      canonical
    },
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
      type: "article",
      url: canonical
    },
    twitter: {
      card: "summary_large_image",
      title: entry.frontmatter.title,
      description: entry.frontmatter.description
    }
  };
}

export default async function LocalizedCaseStudyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const entry = getCaseStudyBySlug(locale, slug);
  if (!entry) notFound();
  if (entry.slug === "signy") {
    return <SignyNotionEmbed locale={locale} />;
  }
  if (entry.slug === "instant-loan-request-system") {
    return <InstantLoanRequestCaseStudy locale={locale} />;
  }
  if (entry.slug === "paamonim-smart-financial-management-app") {
    return <PaamonimCaseStudy locale={locale} />;
  }
  if (entry.slug === "smart-campus-access-control-system") {
    return <SmartCampusCaseStudy locale={locale} />;
  }
  if (entry.slug === "smart-campus-learning-center-module") {
    return <SmartCampusLearningCenterCaseStudy locale={locale} />;
  }
  if (entry.slug === "research-search-engine-based-on-rag") {
    return <ResearchSearchCaseStudy locale={locale} />;
  }

  const site = getSiteContent(locale);
  const isWebsiteAsProduct = entry.slug === "website-as-product";

  return (
    <>
      <section className="hero">
        <h1>{entry.frontmatter.title}</h1>
        <p>{entry.frontmatter.description}</p>
        <p className="meta">
          {formatStableDate(entry.frontmatter.date)} | {site.detail_role_label}: {entry.frontmatter.role}
        </p>
        <div className="pill-row">
          {entry.frontmatter.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid" aria-label={site.case_studies_title}>
        <article className="card">
          <h2>{site.detail_context_label}</h2>
          <p>{entry.frontmatter.context}</p>
        </article>
        <article className="card">
          <h2>{site.detail_goal_metrics_label}</h2>
          <p>{entry.frontmatter.goal_metrics}</p>
        </article>
        <article className="card">
          <h2>{site.detail_discovery_label}</h2>
          <p>{entry.frontmatter.discovery}</p>
        </article>
        <article className="card">
          <h2>{site.detail_options_tradeoffs_label}</h2>
          <p>{entry.frontmatter.options_tradeoffs}</p>
        </article>
        <article className="card">
          <h2>{site.detail_execution_label}</h2>
          <p>{entry.frontmatter.execution}</p>
        </article>
        <article className="card">
          <h2>{site.detail_results_label}</h2>
          <p>{entry.frontmatter.results}</p>
          <h3>{site.detail_learnings_label}</h3>
          <p>{entry.frontmatter.learnings}</p>
        </article>
      </section>

      {isWebsiteAsProduct && <WebsiteAsProductCaseStudy locale={locale} />}

      <MdxContent locale={locale} source={entry.body} />
    </>
  );
}
