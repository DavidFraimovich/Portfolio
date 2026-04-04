import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  LayoutGrid,
  Package,
  Rocket,
  Route,
  Search,
  Settings2,
  ShieldCheck,
  UsersRound,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { SmartCampusMaintenanceServiceCallsAccordion } from "@/components/SmartCampusMaintenanceServiceCallsAccordion";
import styles from "@/components/SmartCampusMaintenanceServiceCallsCaseStudy.module.css";
import type { Locale } from "@/lib/i18n";
import {
  smartCampusMaintenanceServiceCallsCaseStudyContent,
  type SmartCampusMaintenanceEmphasisIconKey,
  type SmartCampusMaintenanceHighlightIconKey,
  type SmartCampusMaintenanceMetadataIconKey,
  type SmartCampusMaintenanceMetricIconKey
} from "@/lib/smartCampusMaintenanceServiceCallsCaseStudy";

type Props = {
  locale: Locale;
};

const METADATA_ICONS: Record<SmartCampusMaintenanceMetadataIconKey, LucideIcon> = {
  productType: LayoutGrid,
  role: BriefcaseBusiness,
  team: UsersRound,
  stage: Rocket,
  version: Wrench,
  users: Settings2,
  duration: Clock3,
  period: CalendarDays
};

const HIGHLIGHT_ICONS: Record<SmartCampusMaintenanceHighlightIconKey, LucideIcon> = {
  field: Search,
  workflow: Route,
  impact: BarChart3
};

const METRIC_ICONS: Record<SmartCampusMaintenanceMetricIconKey, LucideIcon> = {
  launch: Rocket,
  staff: UsersRound,
  workflow: Route,
  speed: BarChart3,
  redesign: Wrench,
  inventory: Package
};

const EMPHASIS_ICONS: Record<SmartCampusMaintenanceEmphasisIconKey, LucideIcon> = {
  manualToDigital: Route,
  bottlenecks: Search,
  permissions: ShieldCheck,
  evolution: Rocket
};

function MetadataIcon({ icon }: { icon: SmartCampusMaintenanceMetadataIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function HighlightIcon({ icon }: { icon: SmartCampusMaintenanceHighlightIconKey }) {
  const Icon = HIGHLIGHT_ICONS[icon];

  return <Icon className={styles.highlightIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function MetricIcon({ icon }: { icon: SmartCampusMaintenanceMetricIconKey }) {
  const Icon = METRIC_ICONS[icon];

  return <Icon className={styles.metricIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function EmphasisIcon({ icon }: { icon: SmartCampusMaintenanceEmphasisIconKey }) {
  const Icon = EMPHASIS_ICONS[icon];

  return <Icon className={styles.emphasisIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function SmartCampusMaintenanceServiceCallsCaseStudy({ locale }: Props) {
  const content = smartCampusMaintenanceServiceCallsCaseStudyContent[locale];

  return (
    <div className={styles.root} data-locale={locale}>
      <section className={styles.heroSection} aria-labelledby={`maintenance-service-title-${locale}`}>
        <div className={styles.heroShell}>
          <div className={styles.heroContent}>
            <div className={styles.heroNarrative}>
              <div className={styles.heroText}>
                <div className={styles.heroHeadingBlock}>
                  <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
                  <h1 className={styles.heroTitle} id={`maintenance-service-title-${locale}`}>
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
                    <article className={styles.metadataCard} key={`${item.label}-${item.value}`} role="listitem">
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
                    location: "maintenance_service_hero_link",
                    section: "case_study"
                  }}
                >
                  <span>{content.hero.externalLinkLabel}</span>
                  <ArrowUpRight className={styles.externalLinkIcon} aria-hidden="true" strokeWidth={1.85} />
                </TrackedLink>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.placeholderPanel}>
                <img
                  alt={content.hero.mediaLabel}
                  className={styles.heroImage}
                  decoding="async"
                  fetchPriority="high"
                  height="1412"
                  loading="eager"
                  src="/images/case-studies/smart-campus-maintence/smart-campus-maintence-hero.png"
                  width="1765"
                />
                <span className={styles.heroImageScrim} aria-hidden="true" />
                <span className={styles.placeholderGlow} aria-hidden="true" />
                <span className={styles.placeholderGlowSecondary} aria-hidden="true" />
                <span className={styles.placeholderHalo} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`maintenance-highlights-${locale}`}>
        <h2 className={styles.srOnly} id={`maintenance-highlights-${locale}`}>
          {content.highlightsAriaLabel}
        </h2>
        <div className={styles.surface}>
          <div className={styles.highlightGrid} aria-label={content.highlightsAriaLabel} role="list">
            {content.highlights.map((item) => (
              <article className={styles.card} key={item.title} role="listitem">
                <span className={styles.cardIconWrap}>
                  <HighlightIcon icon={item.icon} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`maintenance-accordion-${locale}`}>
        <h2 className={styles.srOnly} id={`maintenance-accordion-${locale}`}>
          {content.accordionAriaLabel}
        </h2>
        <div className={styles.surface}>
          <SmartCampusMaintenanceServiceCallsAccordion items={content.accordion} />
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`maintenance-metrics-${locale}`}>
        <h2 className={styles.srOnly} id={`maintenance-metrics-${locale}`}>
          {content.metricsAriaLabel}
        </h2>
        <div className={`${styles.surface} ${styles.metricsSurface}`}>
          <div className={styles.metricsGrid} aria-label={content.metricsAriaLabel} role="list">
            {content.metrics.map((item) => (
              <article className={styles.metricCard} key={`${item.accent}-${item.label}`} role="listitem">
                <MetricIcon icon={item.icon} />
                <p className={styles.metricAccent}>{item.accent}</p>
                <h3 className={styles.metricLabel}>{item.label}</h3>
              </article>
            ))}
          </div>

          <ol className={styles.processList} aria-label={content.processAriaLabel}>
            {content.processSteps.map((step, index) => (
              <li className={styles.processStep} key={`${step.primary}-${step.secondary}`}>
                <span className={styles.processMarker}>
                  <span className={styles.processMarkerInner}>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <div className={styles.processCopy}>
                  <p className={styles.processPrimary}>{step.primary}</p>
                  <p className={styles.processSecondary}>{step.secondary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`maintenance-analysis-${locale}`}>
        <div className={`${styles.surface} ${styles.emphasisSurface}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`maintenance-analysis-${locale}`}>
              {content.emphasisTitle}
            </h2>
          </div>

          <div className={styles.emphasisGrid} role="list">
            {content.emphasisCards.map((item) => (
              <article className={styles.emphasisCard} key={item.text} role="listitem">
                <EmphasisIcon icon={item.icon} />
                <h3 className={styles.emphasisText}>{item.text}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`maintenance-context-${locale}`}>
        <div className={`${styles.surface} ${styles.contextSurface}`}>
          <div className={styles.contextHeader}>
            <h2 className={styles.sectionTitle} id={`maintenance-context-${locale}`}>
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
                location: "maintenance_service_context_link",
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
