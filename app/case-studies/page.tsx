import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Business-focused case studies showing context, tradeoffs, execution, and outcomes.",
  openGraph: {
    title: "Case Studies",
    description: "Business-focused case studies showing context, tradeoffs, execution, and outcomes."
  }
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <section className="hero">
        <h1>Case Studies</h1>
        <p>Each project shows the decisions, constraints, delivery strategy, and measured results.</p>
      </section>

      <section className="grid" aria-label="All case studies">
        {caseStudies.map((item) => (
          <article key={item.slug} className="card">
            <p className="meta">{new Date(item.frontmatter.date).toLocaleDateString()}</p>
            <h2>
              <Link href={`/case-studies/${item.slug}`}>{item.frontmatter.title}</Link>
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
