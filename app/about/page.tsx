import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Background, working style, and approach to product delivery.",
  openGraph: {
    title: "About",
    description: "Background, working style, and approach to product delivery."
  }
};

export default function AboutPage(): JSX.Element {
  return (
    <section className="hero">
      <h1>About</h1>
      <p>
        I work at the intersection of product strategy, UX, and engineering to ship clear and measurable
        outcomes. My focus is reducing risk early, aligning stakeholders, and delivering production-ready
        experiences fast.
      </p>
      <div className="grid">
        <article className="card">
          <h2>How I Work</h2>
          <p>Discovery-led planning, pragmatic scope control, and tight design-engineering collaboration.</p>
        </article>
        <article className="card">
          <h2>Core Strengths</h2>
          <p>Product thinking, architecture decisions, interface craft, and communication under ambiguity.</p>
        </article>
      </div>
    </section>
  );
}
