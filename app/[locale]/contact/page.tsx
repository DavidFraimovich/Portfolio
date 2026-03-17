import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackedLink } from "@/components/TrackedLink";
import { generateLocaleStaticParams, isLocale, withLocalePath } from "@/lib/i18n";
import { buildDocumentTitle } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);
  const canonical = `${siteUrl}${withLocalePath(safeLocale, "/contact")}`;

  return {
    title: {
      absolute: buildDocumentTitle(site.nav_contact, site.brand_name)
    },
    description: site.contact_intro,
    alternates: {
      canonical
    },
    openGraph: {
      title: site.nav_contact,
      description: site.contact_intro,
      type: "website",
      url: canonical
    },
    twitter: {
      card: "summary_large_image",
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
            <TrackedLink
              href={`mailto:${site.email}`}
              tracking={{
                eventName: "contact_click",
                kind: "mailto",
                label: site.contact_email_label,
                locale,
                location: "contact_page",
                section: "contact"
              }}
            >
              {site.email}
            </TrackedLink>
          </p>
        </article>
        <article className="card">
          <h2>{site.contact_linkedin_label}</h2>
          <p>
            <TrackedLink
              href={site.linkedin_url}
              target="_blank"
              rel="noreferrer"
              external
              tracking={{
                eventName: "social_click",
                kind: "external",
                label: site.contact_linkedin_label,
                locale,
                location: "contact_page",
                section: "contact"
              }}
            >
              {site.linkedin_url}
            </TrackedLink>
          </p>
        </article>
      </div>
    </section>
  );
}
