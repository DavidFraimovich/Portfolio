import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ProductPlaybookSection } from "@/components/ProductPlaybookSection";
import { SkillsRibbon } from "@/components/SkillsRibbon";
import { TrackedLink } from "@/components/TrackedLink";
import { WindmillsCtaSection } from "@/components/WindmillsCtaSection";
import { getAllCaseStudies } from "@/lib/content";
import { formatStableDate } from "@/lib/date";
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
  const canonical = `${siteUrl}/${safeLocale}`;

  return {
    title: {
      absolute: buildDocumentTitle(site.nav_home, site.brand_name)
    },
    description: site.subheadline,
    alternates: {
      canonical
    },
    openGraph: {
      title: site.nav_home,
      description: site.subheadline,
      type: "website",
      url: canonical
    },
    twitter: {
      card: "summary_large_image",
      title: site.nav_home,
      description: site.subheadline
    }
  };
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);
  const caseStudies = getAllCaseStudies(locale).slice(0, 3);

  return (
    <>
      <Hero locale={locale} />
      <SkillsRibbon locale={locale} />

      <ProductPlaybookSection locale={locale} />

      <h2 className="section-title">{site.home_selected_case_studies}</h2>
      <section className="grid" aria-label={site.home_selected_case_studies}>
        {caseStudies.map((item) => (
          <article key={item.slug} className="card">
            <p className="meta">{formatStableDate(item.frontmatter.date)}</p>
            <h3>
              <TrackedLink
                href={withLocalePath(locale, `/case-studies/${item.slug}`)}
                tracking={{
                  eventName: "case_study_click",
                  kind: "internal",
                  label: item.frontmatter.title,
                  locale,
                  location: "home_selected_case_studies",
                  section: "home"
                }}
              >
                {item.frontmatter.title}
              </TrackedLink>
            </h3>
            <p>{item.frontmatter.description}</p>
            <div className="pill-row">
              {item.frontmatter.tags.map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <WindmillsCtaSection locale={locale} />
    </>
  );
}
