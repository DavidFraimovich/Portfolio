import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience, selected achievements, and technical stack.",
  openGraph: {
    title: "Resume",
    description: "Experience, selected achievements, and technical stack."
  }
};

export default function ResumePage(): JSX.Element {
  return (
    <section className="hero">
      <h1>Resume</h1>
      <p>Replace this starter content with your full timeline, responsibilities, and quantified outcomes.</p>
      <div className="grid">
        <article className="card">
          <h2>Experience Highlights</h2>
          <p>Senior product and engineering roles across SaaS, fintech, and marketplace platforms.</p>
        </article>
        <article className="card">
          <h2>Technology</h2>
          <p>Next.js, TypeScript, React, Node.js, PostgreSQL, analytics, experimentation, and CI/CD.</p>
        </article>
      </div>
    </section>
  );
}
