import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  Cpu,
  LayoutGrid,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  Target,
  UsersRound,
  Workflow,
  type LucideIcon
} from "lucide-react";
import { CaseStudyImageGridGallery } from "@/components/CaseStudyImageGallery";
import { SmartCampusLearningCenterAccordion } from "@/components/SmartCampusLearningCenterAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import styles from "@/components/SmartCampusLearningCenterCaseStudy.module.css";
import type { Locale } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
import {
  smartCampusLearningCenterCaseStudyContent,
  type SmartCampusLearningCenterEmphasisIconKey,
  type SmartCampusLearningCenterHighlightIconKey,
  type SmartCampusLearningCenterMetadataIconKey,
  type SmartCampusLearningCenterMetricIconKey
} from "@/lib/smartCampusLearningCenterCaseStudy";

type Props = {
  locale: Locale;
};

const MARKETING_PREVIEW_INDICES = [0, 1, 2] as const;

const METADATA_ICONS: Record<SmartCampusLearningCenterMetadataIconKey, LucideIcon> = {
  productType: LayoutGrid,
  role: BriefcaseBusiness,
  period: CalendarDays,
  duration: Clock3,
  client: Building2,
  nature: Rocket
};

const HIGHLIGHT_ICONS: Record<SmartCampusLearningCenterHighlightIconKey, LucideIcon> = {
  system: Cpu,
  permissions: UsersRound,
  insights: BarChart3
};

const METRIC_ICONS: Record<SmartCampusLearningCenterMetricIconKey, LucideIcon> = {
  screens: LayoutGrid,
  workflows: Workflow,
  lessons: CalendarDays,
  savings: BarChart3,
  lateness: Clock3,
  budget: Target,
  adoption: Rocket
};

const EMPHASIS_ICONS: Record<SmartCampusLearningCenterEmphasisIconKey, LucideIcon> = {
  permissions: ShieldCheck,
  flows: Route,
  reporting: Search,
  expansion: Rocket
};

function MetadataIcon({ icon }: { icon: SmartCampusLearningCenterMetadataIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function HighlightIcon({ icon }: { icon: SmartCampusLearningCenterHighlightIconKey }) {
  const Icon = HIGHLIGHT_ICONS[icon];

  return <Icon className={styles.highlightIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function MetricIcon({ icon }: { icon: SmartCampusLearningCenterMetricIconKey }) {
  const Icon = METRIC_ICONS[icon];

  return <Icon className={styles.metricIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function EmphasisIcon({ icon }: { icon: SmartCampusLearningCenterEmphasisIconKey }) {
  const Icon = EMPHASIS_ICONS[icon];

  return <Icon className={styles.emphasisIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function SmartCampusLearningCenterCaseStudy({ locale }: Props) {
  const content = smartCampusLearningCenterCaseStudyContent[locale];

  return (
    <div className={styles.root} data-locale={locale}>
      <section className={styles.heroSection} aria-labelledby={`learning-center-title-${locale}`}>
        <div className={styles.heroShell}>
          <div className={styles.heroVisual} aria-hidden="true">
            <img
              alt=""
              className={styles.heroImage}
              decoding="async"
              fetchPriority="high"
              height="1094"
              loading="eager"
              src={withVersionedAssetPath(
                "/images/case-studies/smart-campus-study-center/smart-campus-study-center-hero.png"
              )}
              width="1475"
            />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.heroHeadingBlock}>
                <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
                <h1 className={styles.heroTitle} id={`learning-center-title-${locale}`}>
                  {content.hero.title}
                </h1>
                <h2 className={styles.heroSubtitle}>{content.hero.subtitle}</h2>
              </div>

              <p className={styles.heroDescription}>{content.hero.description}</p>

              <div className={styles.chipsRow} aria-label={content.hero.chipsAriaLabel}>
                {content.hero.chips.map((chip) => (
                  <span className={styles.chip} key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.metadataPanel}>
              <div className={styles.metadataGrid} aria-label={content.hero.metadataTitle} role="list">
                {content.hero.metadata.map((item) => (
                  <article className={styles.metadataCard} key={item.label} role="listitem">
                    <div className={styles.metadataHeader}>
                      <MetadataIcon icon={item.icon} />
                      <h2 className={styles.metadataTitle}>{item.label}</h2>
                    </div>
                    <p className={styles.metadataValue}>{item.value}</p>
                  </article>
                ))}
              </div>

              <TrackedLink
                className={styles.externalLink}
                external
                href={content.hero.externalLinkHref}
                rel="noreferrer"
                target="_blank"
                tracking={{
                  eventName: "cta_click",
                  kind: "external",
                  label: content.hero.externalLinkLabel,
                  locale,
                  location: "learning_center_hero_link",
                  section: "case_study"
                }}
              >
                <span>{content.hero.externalLinkLabel}</span>
                <ArrowUpRight className={styles.externalLinkIcon} aria-hidden="true" strokeWidth={1.85} />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`learning-center-highlights-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`learning-center-highlights-${locale}`}>
              {content.highlightsTitle}
            </h2>
          </div>

          <div className={styles.highlightGrid}>
            {content.highlights.map((item) => (
              <article className={styles.card} key={item.title}>
                <span className={styles.cardIconWrap}>
                  <HighlightIcon icon={item.icon} />
                </span>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`learning-center-story-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`learning-center-story-${locale}`}>
              {content.accordionTitle}
            </h2>
          </div>

          <SmartCampusLearningCenterAccordion items={content.accordion} />
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`learning-center-metrics-${locale}`}>
        <div className={`${styles.surface} ${styles.metricsSurface}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`learning-center-metrics-${locale}`}>
              {content.metricsTitle}
            </h2>
          </div>

          <div className={styles.metricsGrid}>
            {content.metrics.map((item) => (
              <article className={styles.metricCard} key={`${item.value}-${item.label}`}>
                <MetricIcon icon={item.icon} />
                <p className={styles.metricValue}>{item.value}</p>
                <h2 className={styles.metricTitle}>{item.label}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`learning-center-marketing-${locale}`}>
        <div className={`${styles.surface} ${styles.marketingSurface}`}>
          <div className={styles.sectionHeader}>
            <h2
              className={`${styles.sectionTitle} ${styles.marketingSectionTitle}`}
              id={`learning-center-marketing-${locale}`}
            >
              {content.marketing.title}
            </h2>
          </div>

          <CaseStudyImageGridGallery
            ariaLabel={content.marketing.ariaLabel}
            dialogLabel={content.marketing.ariaLabel}
            images={content.marketing.slides}
            locale={locale}
            previewIndices={MARKETING_PREVIEW_INDICES}
            classNames={{
              button: styles.marketingGalleryButton,
              image: styles.marketingGalleryImage,
              item: styles.marketingGalleryItem,
              root: styles.marketingGallery
            }}
          />
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`learning-center-process-${locale}`}>
        <div className={`${styles.surface} ${styles.processSurface}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`learning-center-process-${locale}`}>
              {content.processTitle}
            </h2>
          </div>

          <ol className={styles.processList}>
            {content.processSteps.map((step, index) => (
              <li className={styles.processStep} key={step.title}>
                <span className={styles.processMarker}>
                  <span className={styles.processMarkerInner}>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <div className={styles.processCopy}>
                  <h2 className={styles.processTitle}>{step.title}</h2>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`learning-center-analysis-${locale}`}>
        <div className={`${styles.surface} ${styles.emphasisSurface}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`learning-center-analysis-${locale}`}>
              {content.emphasisTitle}
            </h2>
          </div>

          <div className={styles.emphasisGrid}>
            {content.emphasisCards.map((item) => (
              <article className={styles.emphasisCard} key={item.text}>
                <EmphasisIcon icon={item.icon} />
                <h2 className={styles.emphasisTitle}>{item.text}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`learning-center-context-${locale}`}>
        <div className={`${styles.surface} ${styles.contextSurface}`}>
          <div className={styles.contextHeader}>
            <h2 className={styles.sectionTitle} id={`learning-center-context-${locale}`}>
              {content.platform.title}
            </h2>

            <TrackedLink
              className={styles.contextLink}
              external
              href={content.platform.href}
              rel="noreferrer"
              target="_blank"
              tracking={{
                eventName: "cta_click",
                kind: "external",
                label: content.platform.linkLabel,
                locale,
                location: "learning_center_context_link",
                section: "case_study"
              }}
            >
              <span>{content.platform.linkLabel}</span>
              <ArrowUpRight className={styles.externalLinkIcon} aria-hidden="true" strokeWidth={1.85} />
            </TrackedLink>
          </div>

          <p className={styles.contextText}>{content.platform.description}</p>
        </div>
      </section>
    </div>
  );
}
