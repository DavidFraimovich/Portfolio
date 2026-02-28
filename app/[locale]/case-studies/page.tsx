import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCaseStudies } from "@/lib/content";
import { formatStableDate } from "@/lib/date";
import { isLocale, withLocalePath } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);

  return {
    title: site.nav_case_studies,
    description: site.case_studies_intro,
    openGraph: {
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

  return (
    <>
      <section className="hero">
        <h1>{site.case_studies_title}</h1>
        <p>{site.case_studies_intro}</p>
      </section>

      <section className="grid" aria-label={site.case_studies_title}>
        {caseStudies.map((item) => (
          <article key={item.slug} className="card">
            <p className="meta">{formatStableDate(item.frontmatter.date)}</p>
            <h2>
              <Link href={withLocalePath(locale, `/case-studies/${item.slug}`)}>
                {item.frontmatter.title}
              </Link>
            </h2>
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
    </>
  );
}
