import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies, getAllPosts } from "@/lib/content";
import { getSiteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Home",
  description: "Portfolio home with featured work, profile, and direct contact pathways.",
  openGraph: {
    title: "Home",
    description: "Portfolio home with featured work, profile, and direct contact pathways."
  }
};

export default function HomePage(): JSX.Element {
  const site = getSiteContent();
  const caseStudies = getAllCaseStudies().slice(0, 3);
  const posts = getAllPosts().slice(0, 2);

  return (
    <>
      <section className="hero">
        <h1>{site.headline}</h1>
        <p>{site.subheadline}</p>
        <p>
          <Link className="cta" href="/case-studies">
            {site.primary_cta_text}
          </Link>
        </p>
      </section>

      <h2 className="section-title">Selected Case Studies</h2>
      <section className="grid" aria-label="Selected case studies">
        {caseStudies.map((item) => (
          <article key={item.slug} className="card">
            <p className="meta">{new Date(item.frontmatter.date).toLocaleDateString()}</p>
            <h3>
              <Link href={`/case-studies/${item.slug}`}>{item.frontmatter.title}</Link>
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
          <h2 className="section-title">Latest Posts</h2>
          <section className="grid" aria-label="Latest posts">
            {posts.map((post) => (
              <article key={post.slug} className="card">
                <p className="meta">{new Date(post.frontmatter.date).toLocaleDateString()}</p>
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
