import {
  BriefcaseBusiness,
  Building2,
  Clock3,
  Landmark,
  SearchCheck,
  Target,
  TrendingUp,
  TriangleAlert,
  UsersRound,
  Workflow,
  Zap,
  type LucideIcon
} from "lucide-react";
import styles from "@/components/InstantLoanRequestCaseStudy.module.css";
import type {
  InstantLoanMetadataIconKey,
  InstantLoanMetricIconKey
} from "@/lib/instantLoanRequestSystem";
import { instantLoanRequestSystemCaseStudyContent } from "@/lib/instantLoanRequestSystem";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

const METADATA_ICONS: Record<InstantLoanMetadataIconKey, LucideIcon> = {
  timeline: Clock3,
  role: BriefcaseBusiness,
  team: UsersRound,
  type: Workflow,
  validation: SearchCheck,
  client: Building2
};

const METRIC_ICONS: Record<InstantLoanMetricIconKey, LucideIcon> = {
  dropoff: TriangleAlert,
  setup: Clock3,
  completion: Target,
  firstValue: Zap,
  activation: TrendingUp,
  errors: SearchCheck
};

function MetadataIcon({ icon }: { icon: InstantLoanMetadataIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function MetricIcon({ icon }: { icon: InstantLoanMetricIconKey }) {
  const Icon = METRIC_ICONS[icon];

  return <Icon className={styles.metricIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function InstantLoanRequestCaseStudy({ locale }: Props) {
  const content = instantLoanRequestSystemCaseStudyContent[locale];

  return (
    <div className={styles.root}>
      <section className={styles.summarySection} aria-labelledby={`instant-loan-title-${locale}`}>
        <div className={styles.summaryShell}>
          <div className={styles.heroRow}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>{content.metadataTitle}</p>
              <h1 className={styles.title} id={`instant-loan-title-${locale}`}>
                {content.title}
              </h1>
              <h2 className={styles.valueStatement}>{content.valueStatement}</h2>
              <p className={styles.summary}>{content.summary}</p>
            </div>

            <div className={styles.heroBadge} aria-hidden="true">
              <Landmark className={styles.heroBadgeIcon} strokeWidth={1.85} />
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

      <section className={styles.metricsSection} aria-labelledby={`instant-loan-metrics-${locale}`}>
        <div className={styles.metricsSurface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`instant-loan-metrics-${locale}`}>
              {content.metricsTitle}
            </h2>
          </div>

          <div className={styles.metricsGrid} aria-label={content.metricsAriaLabel}>
            {content.metrics.map((metric) => (
              <article
                className={`${styles.metricCard} ${
                  metric.kind === "concept" ? styles.metricCardConcept : ""
                }`}
                key={metric.kind === "value" ? metric.label : metric.title}
              >
                {metric.kind === "value" ? (
                  <>
                    <div className={styles.metricTopRow}>
                      <p className={styles.metricValue}>{metric.value}</p>
                      <span className={styles.metricIconWrap}>
                        <MetricIcon icon={metric.icon} />
                      </span>
                    </div>
                    <h3 className={styles.metricLabel}>{metric.label}</h3>
                    <p className={styles.metricDescription}>{metric.description}</p>
                  </>
                ) : (
                  <>
                    <div className={styles.metricTopRow}>
                      <h3 className={styles.metricConceptTitle}>{metric.title}</h3>
                      <span className={styles.metricIconWrap}>
                        <MetricIcon icon={metric.icon} />
                      </span>
                    </div>
                    <p className={styles.metricConceptSubtitle}>{metric.subtitle}</p>
                    <p className={styles.metricDescription}>{metric.description}</p>
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.detailsSection} aria-labelledby={`instant-loan-details-${locale}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id={`instant-loan-details-${locale}`}>
            {locale === "he" ? "המהלך המוצרי" : "Product story"}
          </h2>
        </div>

        <div className={styles.detailsGrid}>
          {content.sections.map((section) => (
            <article
              className={`${styles.sectionCard} ${section.wide ? styles.sectionCardWide : ""}`}
              key={section.title}
            >
              <h3 className={styles.sectionCardTitle}>{section.title}</h3>

              {section.intro ? <p className={styles.sectionIntroText}>{section.intro}</p> : null}

              {section.paragraphs?.map((paragraph) => (
                <p className={styles.sectionParagraph} key={paragraph}>
                  {paragraph}
                </p>
              ))}

              {section.bullets?.length ? (
                <ul className={styles.sectionList}>
                  {section.bullets.map((bullet) => (
                    <li className={styles.sectionListItem} key={bullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
