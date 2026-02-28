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
    title: site.nav_about,
    description: site.about_intro,
    openGraph: {
      title: site.nav_about,
      description: site.about_intro
    }
  };
}

export default async function LocalizedAboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);

  return (
    <section className="hero">
      <h1>{site.about_title}</h1>
      <p>{site.about_intro}</p>
      <div className="grid">
        <article className="card">
          <h2>{site.about_how_i_work_title}</h2>
          <p>{site.about_how_i_work_text}</p>
        </article>
        <article className="card">
          <h2>{site.about_core_strengths_title}</h2>
          <p>{site.about_core_strengths_text}</p>
        </article>
      </div>
    </section>
  );
}
