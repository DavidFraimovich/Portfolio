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
    title: site.nav_resume,
    description: site.resume_intro,
    openGraph: {
      title: site.nav_resume,
      description: site.resume_intro
    }
  };
}

export default async function LocalizedResumePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);

  return (
    <section className="hero">
      <h1>{site.resume_title}</h1>
      <p>{site.resume_intro}</p>
      <div className="grid">
        <article className="card">
          <h2>{site.resume_experience_title}</h2>
          <p>{site.resume_experience_text}</p>
        </article>
        <article className="card">
          <h2>{site.resume_technology_title}</h2>
          <p>{site.resume_technology_text}</p>
        </article>
      </div>
    </section>
  );
}
