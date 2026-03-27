import {
  BriefcaseBusiness,
  Building2,
  Clock3,
  Expand,
  PiggyBank,
  Repeat2,
  ShieldCheck,
  Smartphone,
  Tags,
  Target,
  TriangleAlert,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import styles from "@/components/PaamonimCaseStudy.module.css";
import {
  paamonimCaseStudyContent,
  type PaamonimMetadataIconKey,
  type PaamonimMetricIconKey,
  type PaamonimSectionIconKey
} from "@/lib/paamonimCaseStudy";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

const METADATA_ICONS: Record<PaamonimMetadataIconKey, LucideIcon> = {
  organization: Building2,
  product: Smartphone,
  team: UsersRound,
  tags: Tags
};

const METRIC_ICONS: Record<PaamonimMetricIconKey, LucideIcon> = {
  adoption: Smartphone,
  retention: Repeat2,
  engagement: Clock3
};

const SECTION_ICONS: Record<PaamonimSectionIconKey, LucideIcon> = {
  challenges: TriangleAlert,
  advantages: ShieldCheck,
  delivery: BriefcaseBusiness,
  goals: Target
};

function MetadataIcon({ icon }: { icon: PaamonimMetadataIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function MetricIcon({ icon }: { icon: PaamonimMetricIconKey }) {
  const Icon = METRIC_ICONS[icon];

  return <Icon className={styles.metricIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function SectionIcon({ icon }: { icon: PaamonimSectionIconKey }) {
  const Icon = SECTION_ICONS[icon];

  return <Icon className={styles.sectionCardTitleIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function PaamonimCaseStudy({ locale }: Props) {
  const content = paamonimCaseStudyContent[locale];

  return (
    <div className={styles.root}>
      <section className={styles.summarySection} aria-labelledby={`paamonim-title-${locale}`}>
        <div className={styles.summaryShell}>
          <div className={styles.heroRow}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>{content.metadataTitle}</p>
              <h1 className={styles.title} id={`paamonim-title-${locale}`}>
                {content.title}
              </h1>
              <h2 className={styles.valueStatement}>{content.valueStatement}</h2>
              <p className={styles.summary}>{content.summary}</p>
            </div>

            <div className={styles.heroMedia}>
              <div className={styles.heroMediaBadge} aria-hidden="true">
                <PiggyBank className={styles.heroMediaBadgeIcon} strokeWidth={1.85} />
              </div>

              <div className={styles.heroImageFrame}>
                <img
                  alt={content.heroImageAlt}
                  className={styles.heroImage}
                  decoding="async"
                  loading="eager"
                  src="/images/case-studies/paamonim/hero-system.png"
                />
              </div>
            </div>
          </div>

          <dl className={styles.metadataGrid} aria-label={content.metadataTitle}>
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

      <section className={styles.revealSection} aria-label={content.revealLabel}>
        <details className={styles.mediaDisclosure}>
          <summary className={styles.mediaDisclosureSummary}>
            <span className={styles.mediaDisclosureLabel}>{content.revealLabel}</span>
            <span className={styles.mediaDisclosureIconWrap} aria-hidden="true">
              <Expand className={styles.mediaDisclosureIcon} strokeWidth={1.9} />
            </span>
          </summary>

          <div className={styles.expandedMediaFrame}>
            <img
              alt={content.expandedImageAlt}
              className={styles.expandedImage}
              decoding="async"
              loading="lazy"
              src="/images/case-studies/paamonim/expanded-system.png"
            />
          </div>
        </details>
      </section>

      <section className={styles.metricsSection} aria-labelledby={`paamonim-metrics-${locale}`}>
        <div className={styles.metricsSurface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`paamonim-metrics-${locale}`}>
              {content.metricsTitle}
            </h2>
          </div>

          <div className={styles.metricsGrid} aria-label={content.metricsAriaLabel}>
            {content.metrics.map((metric) => (
              <article className={styles.metricCard} key={metric.description}>
                <div className={styles.metricTopRow}>
                  <p className={styles.metricValue}>{metric.value}</p>
                  <span className={styles.metricIconWrap}>
                    <MetricIcon icon={metric.icon} />
                  </span>
                </div>
                <p className={styles.metricDescription}>{metric.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.detailsSection} aria-labelledby={`paamonim-story-${locale}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id={`paamonim-story-${locale}`}>
            {content.storyTitle}
          </h2>
        </div>

        <div className={styles.detailsGrid}>
          {content.sections.map((section) => (
            <article className={styles.sectionCard} key={section.title}>
              <div className={styles.sectionCardTitleRow}>
                <span className={styles.sectionCardTitleIconWrap} aria-hidden="true">
                  <SectionIcon icon={section.icon} />
                </span>
                <h3 className={styles.sectionCardTitle}>{section.title}</h3>
              </div>

              <ul className={styles.sectionList}>
                {section.bullets.map((bullet) => (
                  <li className={styles.sectionListItem} key={bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
