import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCaseStudies, getAllPosts } from "@/lib/content";
import { formatStableDate } from "@/lib/date";
import { isLocale, withLocalePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);
  const canonical = `${siteUrl}${withLocalePath(safeLocale)}`;

  return {
    title: site.nav_home,
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
  const posts = getAllPosts(locale).slice(0, 2);

  return (
    <>
      <section className="hero">
        <h1>{site.headline}</h1>
        <p>{site.subheadline}</p>
        <p>
          <Link className="cta" href={withLocalePath(locale, "/case-studies")}>
            {site.primary_cta_text}
          </Link>
        </p>
      </section>

      <h2 className="section-title">{site.home_selected_case_studies}</h2>
      <section className="grid" aria-label={site.home_selected_case_studies}>
        {caseStudies.map((item) => (
          <article key={item.slug} className="card">
            <p className="meta">{formatStableDate(item.frontmatter.date)}</p>
            <h3>
              <Link href={withLocalePath(locale, `/case-studies/${item.slug}`)}>
                {item.frontmatter.title}
              </Link>
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

      {posts.length > 0 && (
        <>
          <h2 className="section-title">{site.home_latest_posts}</h2>
          <section className="grid" aria-label={site.home_latest_posts}>
            {posts.map((post) => (
              <article key={post.slug} className="card">
                <p className="meta">{formatStableDate(post.frontmatter.date)}</p>
                <h3>{post.frontmatter.title}</h3>
                <p>{post.frontmatter.description}</p>
              </article>
            ))}
          </section>
        </>
      )}
    </>
  );
}
