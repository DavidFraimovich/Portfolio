import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);

  return {
    title: site.nav_contact,
    description: site.contact_intro,
    openGraph: {
      title: site.nav_contact,
      description: site.contact_intro
    }
  };
}

export default async function LocalizedContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);

  return (
    <section className="hero">
      <h1>{site.contact_title}</h1>
      <p>{site.contact_intro}</p>
      <div className="grid">
        <article className="card">
          <h2>{site.contact_email_label}</h2>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </article>
        <article className="card">
          <h2>{site.contact_linkedin_label}</h2>
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
