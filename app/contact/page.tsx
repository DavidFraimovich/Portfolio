import type { Metadata } from "next";
import { getSiteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for consulting, full-time opportunities, or partnerships.",
  openGraph: {
    title: "Contact",
    description: "Get in touch for consulting, full-time opportunities, or partnerships."
  }
};

export default function ContactPage() {
  const site = getSiteContent();

  return (
    <section className="hero">
      <h1>Contact</h1>
      <p>If you are building a product and need strategy, design, or implementation support, reach out.</p>
      <div className="grid">
        <article className="card">
          <h2>Email</h2>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </article>
        <article className="card">
          <h2>LinkedIn</h2>
          <p>
            <a href={site.linkedin_url} target="_blank" rel="noreferrer">
              {site.linkedin_url}
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
