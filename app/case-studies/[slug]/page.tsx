import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/MdxContent";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { siteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllCaseStudies().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudyBySlug(slug);

  if (!entry) {
    return {
      title: "Case Study Not Found"
    };
  }

  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
      type: "article",
      url: `${siteUrl}/case-studies/${entry.slug}`
    }
  };
}

export default async function CaseStudyDetailPage({ params }: Props): Promise<JSX.Element> {
  const { slug } = await params;
  const entry = getCaseStudyBySlug(slug);
  if (!entry) notFound();

  return (
    <>
      <section className="hero">
        <h1>{entry.frontmatter.title}</h1>
        <p>{entry.frontmatter.description}</p>
        <p className="meta">
          {new Date(entry.frontmatter.date).toLocaleDateString()} | Role: {entry.frontmatter.role}
        </p>
        <div className="pill-row">
          {entry.frontmatter.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid" aria-label="Project summary blocks">
        <article className="card">
          <h2>Context</h2>
          <p>{entry.frontmatter.context}</p>
        </article>
        <article className="card">
          <h2>Goal Metrics</h2>
          <p>{entry.frontmatter.goal_metrics}</p>
        </article>
        <article className="card">
          <h2>Discovery</h2>
          <p>{entry.frontmatter.discovery}</p>
        </article>
        <article className="card">
          <h2>Options and Tradeoffs</h2>
          <p>{entry.frontmatter.options_tradeoffs}</p>
        </article>
        <article className="card">
          <h2>Execution</h2>
          <p>{entry.frontmatter.execution}</p>
        </article>
        <article className="card">
          <h2>Results and Learnings</h2>
          <p>{entry.frontmatter.results}</p>
          <p>{entry.frontmatter.learnings}</p>
        </article>
      </section>

      <MdxContent source={entry.body} />
    </>
  );
}
