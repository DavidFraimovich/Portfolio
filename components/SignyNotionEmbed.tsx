import {
  BriefcaseBusiness,
  Building2,
  FileSignature,
  Gauge,
  Map,
  Repeat2,
  Rocket,
  SearchCheck,
  Send,
  UsersRound,
  Workflow,
  type LucideIcon
} from "lucide-react";
import styles from "@/components/SignyNotionEmbed.module.css";
import type { Locale } from "@/lib/i18n";
import {
  signyCaseStudyContent,
  type SignyIconKey,
  signyNotionEmbedUrls
} from "@/lib/signy";
import { withVersionedAssetPath } from "@/lib/site";

type Props = {
  locale: Locale;
};

const METADATA_ICONS: Record<SignyIconKey, LucideIcon> = {
  product: FileSignature,
  stage: Rocket,
  team: UsersRound,
  role: BriefcaseBusiness,
  validation: SearchCheck,
  client: Building2
};

const METRIC_ICONS: LucideIcon[] = [Rocket, Send, FileSignature];
const PAIN_ICONS: LucideIcon[] = [Workflow, Repeat2, Map, Gauge, UsersRound];
const SIGNY_HERO_IMAGE = withVersionedAssetPath("/images/case-studies/signy/hero-system.svg");

const SIGNY_HERO_IMAGE_ALT: Record<Locale, string> = {
  en: "Illustration of the Signy document workflow system and digital signature flow.",
  he: "אילוסטרציה של מערכת תהליך המסמכים והחתימה הדיגיטלית של Signy."
};

function MetadataIcon({ icon }: { icon: SignyIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function PainPointIcon({ index }: { index: number }) {
  const Icon = PAIN_ICONS[index % PAIN_ICONS.length];

  return <Icon className={styles.painIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function SignyNotionEmbed({ locale }: Props) {
  const src = signyNotionEmbedUrls[locale];
  const content = signyCaseStudyContent[locale];
  const title = locale === "he" ? "Signy Notion embed Hebrew" : "Signy Notion embed English";
  const metricsHeadingId = `signy-metrics-${locale}`;
  const painsHeadingId = `signy-pains-${locale}`;
  const heroImageAlt = SIGNY_HERO_IMAGE_ALT[locale];

  return (
    <div className={styles.root}>
      <section className={styles.summarySection} aria-labelledby={`signy-title-${locale}`}>
        <div className={styles.summaryShell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroBlock}>
              <h1 className={styles.title} id={`signy-title-${locale}`}>
                {content.title}
              </h1>
              <h2 className={styles.valueStatement}>{content.valueStatement}</h2>
              <p className={styles.summary}>{content.summary}</p>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualFrame}>
                <img
                  alt={heroImageAlt}
                  className={styles.heroVisualImage}
                  decoding="async"
                  loading="eager"
                  src={SIGNY_HERO_IMAGE}
                />
              </div>
            </div>
          </div>

          <dl className={styles.metadataGrid}>
            {content.metadata.map((item) => (
              <div className={styles.metadataCard} key={item.label}>
                <dt className={styles.metadataLabel}>
                  <MetadataIcon icon={item.icon} />
                  <span className={styles.metadataLabelText}>{item.label}</span>
                </dt>
                <dd className={styles.metadataValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.metricsSection} aria-labelledby={metricsHeadingId}>
        <div className={styles.metricsSurface}>
          <h2 className={`${styles.sectionTitle} ${styles.metricsTitle}`} id={metricsHeadingId}>
            {content.metricsTitle}
          </h2>

          <div className={styles.metricsGrid}>
            {content.metrics.map((metric, index) => {
              const Icon = METRIC_ICONS[index % METRIC_ICONS.length];

              return (
                <article className={styles.metricCard} key={metric.label}>
                  <span className={styles.metricIconWrap}>
                    <Icon className={styles.metricIcon} aria-hidden="true" strokeWidth={1.9} />
                  </span>
                  <p className={styles.metricValue}>{metric.value}</p>
                  <h3 className={styles.metricLabel}>{metric.label}</h3>
                  <p className={styles.metricDescription}>{metric.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.insightsSection}>
        <div className={styles.insightsSurface}>
          <div className={styles.accordionShell}>
            <h2 className={styles.sectionTitle} id={painsHeadingId}>
              {content.painsTitle}
            </h2>

            <div className={styles.accordionList} aria-labelledby={painsHeadingId}>
              {content.pains.map((item, index) => (
                <details className={styles.accordionItem} key={item.title} open={index === 0}>
                  <summary className={styles.accordionSummary}>
                    <span className={styles.accordionSummaryInner}>
                      <PainPointIcon index={index} />
                      <span className={styles.accordionTitle}>{item.title}</span>
                    </span>
                    <span className={styles.accordionIndicator} aria-hidden="true" />
                  </summary>

                  <div className={styles.accordionBody}>
                    <div className={styles.accordionDetail}>
                      <p className={styles.detailLabel}>{content.painLabels.pain}</p>
                      <p className={styles.detailText}>{item.pain}</p>
                    </div>

                    <div className={styles.accordionDetail}>
                      <p className={styles.detailLabel}>{content.painLabels.solution}</p>
                      <p className={styles.detailText}>{item.solution}</p>
                    </div>

                    <div className={styles.accordionDetail}>
                      <p className={styles.detailLabel}>{content.painLabels.outcome}</p>
                      <p className={styles.detailText}>{item.outcome}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <aside className={styles.spotlightCard} aria-label={content.spotlight.eyebrow}>
            <p className={styles.spotlightEyebrow}>{content.spotlight.eyebrow}</p>
            <p className={styles.spotlightValue}>{content.spotlight.value}</p>
            <h3 className={styles.spotlightLabel}>{content.spotlight.label}</h3>
            <p className={styles.spotlightDescription}>{content.spotlight.description}</p>
            <p className={styles.spotlightNote}>
              <span className={styles.spotlightNoteLabel}>{content.spotlight.noteLabel}:</span>{" "}
              {content.spotlight.note}
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.chipsSection} aria-label={content.chipsAriaLabel}>
        <div className={styles.chipRow}>
          {content.chips.map((chip) => (
            <span className={styles.chip} key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.embedWrap} aria-label={content.embedAriaLabel}>
        <iframe
          allowFullScreen
          className={styles.frame}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={src}
          title={title}
        />
      </section>
    </div>
  );
}
