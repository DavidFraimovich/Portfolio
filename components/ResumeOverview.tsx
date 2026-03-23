import {
  ArrowUpRight,
  Compass,
  Download,
  FileText,
  Layers3,
  Workflow,
  type LucideIcon
} from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import styles from "@/components/ResumeOverview.module.css";
import { getLinkedInUrl, resumeLinks } from "@/lib/contactLinks";
import { type Locale, withLocalePath } from "@/lib/i18n";
import type { ResumeContent, ResumeStrengthIcon } from "@/lib/resumeContent";
import type { SiteContent } from "@/lib/siteContent";

type ResumeOverviewProps = {
  content: ResumeContent;
  locale: Locale;
  site: SiteContent;
};

const STRENGTH_ICONS: Record<ResumeStrengthIcon, LucideIcon> = {
  compass: Compass,
  workflow: Workflow,
  layers: Layers3
};

export function ResumeOverview({ content, locale, site }: ResumeOverviewProps) {
  const linkedinUrl = getLinkedInUrl(site.linkedin_url);
  const contactHref = `#footer-contact-${locale}`;
  const secondaryLinks = [
    {
      href: withLocalePath(locale, "/case-studies"),
      kind: "internal" as const,
      label: site.nav_case_studies,
      location: "resume_secondary_case_studies"
    },
    {
      href: contactHref,
      kind: "hash" as const,
      label: site.footer_contact_shortcut,
      location: "resume_secondary_contact"
    },
    {
      href: linkedinUrl,
      kind: "external" as const,
      label: site.footer_action_linkedin,
      location: "resume_secondary_linkedin"
    }
  ];
  const rootClassName = locale === "he" ? `${styles.page} ${styles.rtl}` : styles.page;

  return (
    <div className={rootClassName}>
      <section className={`${styles.surface} ${styles.heroSurface}`} aria-labelledby="resume-overview-title">
        <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
        <h1 id="resume-overview-title" className={styles.heroTitle}>
          {content.hero.title}
        </h1>
        <p className={styles.heroSummary}>{content.hero.summary}</p>

        <dl className={styles.quickFactsGrid}>
          {content.quickFacts.map((fact) => (
            <div key={`${fact.value}-${fact.label}`} className={styles.quickFact}>
              <dt className={styles.quickFactValue}>{fact.value}</dt>
              <dd className={styles.quickFactLabel}>{fact.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${styles.surface} ${styles.strengthsSurface}`} aria-labelledby="resume-strengths-title">
        <div className={styles.surfaceHeader}>
          <h2 id="resume-strengths-title" className={styles.sectionTitle}>
            {content.strengths.title}
          </h2>
        </div>

        <div className={styles.strengthsGrid}>
          {content.strengths.items.map((item) => {
            const Icon = STRENGTH_ICONS[item.icon];

            return (
              <article key={item.title} className={styles.strengthCard}>
                <span className={styles.strengthIcon} aria-hidden="true">
                  <Icon strokeWidth={1.9} />
                </span>
                <h3 className={styles.strengthTitle}>{item.title}</h3>
                <p className={styles.strengthBody}>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.timelineSurface} aria-labelledby="resume-timeline-title">
        <div className={`${styles.surfaceHeader} ${styles.timelineHeader}`}>
          <h2 id="resume-timeline-title" className={styles.sectionTitle}>
            {content.timeline.title}
          </h2>
          <p className={styles.sectionIntro}>{content.timeline.intro}</p>
        </div>

        <ol className={styles.timeline}>
          {content.timeline.items.map((item) => (
            <li key={`${item.company}-${item.period}`} className={styles.timelineItem}>
              <article className={styles.timelineCard}>
                <div className={styles.timelineMeta}>
                  <p className={styles.timelinePeriod}>{item.period}</p>
                  <p className={styles.timelineDuration}>{item.duration}</p>
                </div>

                <div className={styles.timelineCardHeader}>
                  <h3 className={styles.companyTitle}>
                    <span className={styles.companyName}>{item.company}</span>
                    {item.city ? <span className={styles.companyCity}>{item.city}</span> : null}
                  </h3>

                  <p className={styles.timelineSummary}>{item.summary}</p>

                  <p className={styles.roleLine}>
                    <span className={styles.roleLabel}>
                      {locale === "he" ? (item.roles.length > 1 ? "תפקידים" : "תפקיד") : item.roles.length > 1 ? "Roles" : "Role"}
                    </span>
                    <span className={styles.roleText}>{item.roles.join(" • ")}</span>
                  </p>
                </div>

                {item.chips?.length ? (
                  <div className={styles.tagRow} aria-label={locale === "he" ? "תגיות תפקיד" : "Role tags"}>
                    {item.chips.map((chip) => (
                      <span key={chip} className={styles.tag}>
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}

                <ul className={styles.highlightsList}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${styles.surface} ${styles.downloadsSurface}`} aria-labelledby="resume-downloads-title">
        <div className={styles.downloadsCopy}>
          <h2 id="resume-downloads-title" className={styles.sectionTitle}>
            {content.downloadsCta.title}
          </h2>
          <p className={styles.sectionIntro}>{content.downloadsCta.body}</p>

          <ul className={styles.secondaryLinks}>
            {secondaryLinks.map((item) => (
              <li key={item.label}>
                <TrackedLink
                  className={styles.secondaryLink}
                  href={item.href}
                  target={item.kind === "external" ? "_blank" : undefined}
                  rel={item.kind === "external" ? "noreferrer" : undefined}
                  external={item.kind === "external"}
                  tracking={{
                    eventName: item.kind === "external" ? "social_click" : "cta_click",
                    kind: item.kind,
                    label: item.label,
                    locale,
                    location: item.location,
                    section: "resume"
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.9} />
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.downloadCardsGrid}>
          {content.downloadsCta.cards.map((card) => (
            <TrackedLink
              key={card.locale}
              className={styles.downloadCard}
              href={resumeLinks[card.locale]}
              target="_blank"
              rel="noreferrer"
              download
              external
              tracking={{
                eventName: "resume_download_click",
                kind: "download",
                label: card.title,
                locale,
                location: `resume_download_${card.locale}`,
                section: "resume"
              }}
            >
              <div className={styles.downloadCardTop}>
                <span className={styles.downloadBadge}>{card.locale.toUpperCase()}</span>
                <span className={styles.downloadIcon} aria-hidden="true">
                  <FileText strokeWidth={1.9} />
                </span>
              </div>

              <div className={styles.downloadCardBody}>
                <h3 className={styles.downloadTitle}>{card.title}</h3>
                <p className={styles.downloadText}>{card.body}</p>
              </div>

              <span className={styles.downloadAction}>
                <Download aria-hidden="true" strokeWidth={1.9} />
                <span>{locale === "he" ? "להורדה" : "Download"}</span>
              </span>
            </TrackedLink>
          ))}
        </div>
      </section>
    </div>
  );
}
