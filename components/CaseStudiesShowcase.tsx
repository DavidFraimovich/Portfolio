import type { CSSProperties, ReactElement } from "react";
import { TrackedLink } from "@/components/TrackedLink";
import type { CaseStudyFrontmatter, ParsedContent } from "@/lib/content";
import { formatStableDate } from "@/lib/date";
import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
import styles from "./CaseStudiesShowcase.module.css";

type Props = {
  locale: Locale;
  title: string;
  caseStudies: ParsedContent<CaseStudyFrontmatter>[];
};

type AccentTone = "violet" | "sky" | "mint" | "amber" | "slate";

type MediaSlotId = "feature" | "vertical" | "split" | "stacked";

type SlotId = MediaSlotId | "text-primary" | "text-secondary" | "accent";

type CardVariant = "feature" | "vertical" | "text" | "split" | "stacked" | "accent";

type CaseStudyListCardConfig = {
  accentTone: AccentTone;
  heroEligible?: boolean;
  heroImageSrc?: string;
  heroObjectPosition?: string;
  imageSrc?: string;
  mediaEligible?: boolean;
  objectPosition?: string;
  preferredSlot?: MediaSlotId;
};

type CaseStudyToneStyle = CSSProperties & Record<"--case-accent" | "--case-accent-soft" | "--case-glow", string>;

type CardSlot = {
  id: SlotId;
  mediaRequired: boolean;
  tagLimit: number;
  variant: CardVariant;
};

type AssignedCardSlot = CardSlot & {
  config: CaseStudyListCardConfig;
  item: ParsedContent<CaseStudyFrontmatter>;
};

type HeroMedia = {
  config: CaseStudyListCardConfig;
  item: ParsedContent<CaseStudyFrontmatter>;
};

const heroCopy = {
  en: {
    eyebrow: "Selected Works",
    overflowTitle: "More Case Studies",
    scrollLabel: "Scroll to explore"
  },
  he: {
    eyebrow: "עבודות נבחרות",
    overflowTitle: "מחקרי מקרה נוספים",
    scrollLabel: "גללו כדי לראות עוד"
  }
} satisfies Record<Locale, { eyebrow: string; overflowTitle: string; scrollLabel: string }>;

const PRIMARY_SLOTS: CardSlot[] = [
  { id: "text-primary", mediaRequired: false, tagLimit: 2, variant: "text" },
  { id: "feature", mediaRequired: true, tagLimit: 3, variant: "feature" },
  { id: "text-secondary", mediaRequired: false, tagLimit: 2, variant: "text" },
  { id: "split", mediaRequired: true, tagLimit: 2, variant: "split" },
  { id: "vertical", mediaRequired: true, tagLimit: 2, variant: "vertical" },
  { id: "stacked", mediaRequired: true, tagLimit: 2, variant: "stacked" },
  { id: "accent", mediaRequired: false, tagLimit: 1, variant: "accent" }
];

const HERO_PRIORITY = [
  "paamonim-smart-financial-management-app",
  "erp-government-api-integrations",
  "mvp-6-months"
] as const;

const CASE_STUDY_PRIORITY = [
  "paamonim-smart-financial-management-app",
  "smart-campus-access-control-system",
  "signy",
  "instant-loan-request-system"
] as const;

const CASE_STUDY_LIST_CONFIG: Record<string, CaseStudyListCardConfig> = {
  "paamonim-smart-financial-management-app": {
    accentTone: "sky",
    heroEligible: true,
    heroImageSrc: withVersionedAssetPath("/images/case-studies/paamonim/hero-system.png"),
    heroObjectPosition: "center 34%",
    imageSrc: withVersionedAssetPath("/images/case-studies/paamonim/hero-system.png"),
    mediaEligible: true,
    objectPosition: "center 28%",
    preferredSlot: "feature"
  },
  "smart-campus-access-control-system": {
    accentTone: "sky",
    imageSrc: withVersionedAssetPath("/images/case-studies/smart-campus-security-module/hero.png"),
    mediaEligible: true,
    objectPosition: "center center",
    preferredSlot: "split"
  },
  "erp-government-api-integrations": {
    accentTone: "mint",
    imageSrc: withVersionedAssetPath("/images/featured/erp-gov.svg"),
    mediaEligible: true,
    objectPosition: "center center",
    preferredSlot: "split"
  },
  "mvp-6-months": {
    accentTone: "amber",
    imageSrc: withVersionedAssetPath("/images/featured/mvp-6-months.svg"),
    mediaEligible: true,
    objectPosition: "center center",
    preferredSlot: "stacked"
  },
  "instant-loan-request-system": {
    accentTone: "violet"
  },
  signy: {
    accentTone: "slate",
    imageSrc: withVersionedAssetPath("/images/case-studies/signy/hero-system.svg"),
    objectPosition: "center center"
  },
  "research-search-engine-based-on-rag": {
    accentTone: "sky",
    imageSrc: withVersionedAssetPath("/images/case-studies/research-rag/hero-image.png"),
    mediaEligible: true,
    objectPosition: "center center",
    preferredSlot: "vertical"
  },
  "website-as-product": {
    accentTone: "sky"
  },
  "checkout-optimization": {
    accentTone: "mint"
  }
};

const toneStyles: Record<AccentTone, CaseStudyToneStyle> = {
  violet: {
    "--case-accent": "#9f8cff",
    "--case-accent-soft": "rgba(159, 140, 255, 0.18)",
    "--case-glow": "rgba(127, 105, 255, 0.28)"
  },
  sky: {
    "--case-accent": "#79b7ff",
    "--case-accent-soft": "rgba(121, 183, 255, 0.16)",
    "--case-glow": "rgba(80, 154, 233, 0.24)"
  },
  mint: {
    "--case-accent": "#8fd7c3",
    "--case-accent-soft": "rgba(143, 215, 195, 0.16)",
    "--case-glow": "rgba(72, 199, 170, 0.22)"
  },
  amber: {
    "--case-accent": "#f0bc72",
    "--case-accent-soft": "rgba(240, 188, 114, 0.16)",
    "--case-glow": "rgba(232, 166, 68, 0.24)"
  },
  slate: {
    "--case-accent": "#b7c2d9",
    "--case-accent-soft": "rgba(183, 194, 217, 0.14)",
    "--case-glow": "rgba(144, 160, 191, 0.2)"
  }
};

function getCardConfig(slug: string): CaseStudyListCardConfig {
  return CASE_STUDY_LIST_CONFIG[slug] ?? { accentTone: "violet" };
}

function prioritizeCaseStudies(
  caseStudies: ParsedContent<CaseStudyFrontmatter>[]
): ParsedContent<CaseStudyFrontmatter>[] {
  const priorityMap = new Map<string, number>(CASE_STUDY_PRIORITY.map((slug, index) => [slug, index]));
  const originalOrder = new Map(caseStudies.map((item, index) => [item.slug, index]));

  return [...caseStudies].sort((left, right) => {
    const leftRank = priorityMap.get(left.slug) ?? Number.MAX_SAFE_INTEGER;
    const rightRank = priorityMap.get(right.slug) ?? Number.MAX_SAFE_INTEGER;

    if (leftRank !== rightRank) return leftRank - rightRank;

    return (originalOrder.get(left.slug) ?? 0) - (originalOrder.get(right.slug) ?? 0);
  });
}

function resolveHeroMedia(
  caseStudies: ParsedContent<CaseStudyFrontmatter>[]
): HeroMedia | null {
  for (const slug of HERO_PRIORITY) {
    const item = caseStudies.find((entry) => entry.slug === slug);
    if (!item) continue;

    const config = getCardConfig(item.slug);
    if (config.heroEligible && config.heroImageSrc) {
      return { config, item };
    }
  }

  const fallback = caseStudies.find((item) => {
    const config = getCardConfig(item.slug);
    return config.mediaEligible && config.imageSrc;
  });

  if (!fallback) return null;

  return { config: getCardConfig(fallback.slug), item: fallback };
}

function pickMediaCandidate(
  caseStudies: ParsedContent<CaseStudyFrontmatter>[],
  assigned: Set<string>,
  slotId: MediaSlotId
): ParsedContent<CaseStudyFrontmatter> | null {
  const preferred = caseStudies.find((item) => {
    const config = getCardConfig(item.slug);

    return (
      !assigned.has(item.slug) &&
      config.mediaEligible &&
      Boolean(config.imageSrc) &&
      config.preferredSlot === slotId
    );
  });

  if (preferred) return preferred;

  return (
    caseStudies.find((item) => {
      const config = getCardConfig(item.slug);
      return !assigned.has(item.slug) && config.mediaEligible && Boolean(config.imageSrc);
    }) ?? null
  );
}

function pickTextCandidate(
  caseStudies: ParsedContent<CaseStudyFrontmatter>[],
  assigned: Set<string>
): ParsedContent<CaseStudyFrontmatter> | null {
  const textOnly = caseStudies.find((item) => {
    const config = getCardConfig(item.slug);
    return !assigned.has(item.slug) && !config.mediaEligible;
  });

  if (textOnly) return textOnly;

  return caseStudies.find((item) => !assigned.has(item.slug)) ?? null;
}

function assignPrimarySlots(
  caseStudies: ParsedContent<CaseStudyFrontmatter>[]
): { overflow: ParsedContent<CaseStudyFrontmatter>[]; primary: AssignedCardSlot[] } {
  const assigned = new Set<string>();
  const primary: AssignedCardSlot[] = [];

  for (const slot of PRIMARY_SLOTS) {
    const item = slot.mediaRequired
      ? pickMediaCandidate(caseStudies, assigned, slot.id as MediaSlotId)
      : pickTextCandidate(caseStudies, assigned);

    if (!item) continue;

    assigned.add(item.slug);
    primary.push({
      ...slot,
      config: getCardConfig(item.slug),
      item
    });
  }

  const overflow = caseStudies.filter((item) => !assigned.has(item.slug));

  return { overflow, primary };
}

function renderHeroIntro(locale: Locale): ReactElement {
  if (locale === "he") {
    return (
      <>
        כל פרויקט מציג <span className={styles.heroEmphasis}>החלטות</span>,{" "}
        <span className={styles.heroEmphasisSecondary}>אילוצים</span>, אסטרטגיית ביצוע
        ותוצאות מדידות.
      </>
    );
  }

  return (
    <>
      Each project shows the <span className={styles.heroEmphasis}>decisions</span>,{" "}
      <span className={styles.heroEmphasisSecondary}>constraints</span>, delivery strategy,
      and measured results.
    </>
  );
}

function renderDate(date: string): ReactElement {
  return <span className={styles.cardDate}>{formatStableDate(date)}</span>;
}

function renderTags(tags: string[], limit: number, accent: boolean): ReactElement | null {
  if (tags.length === 0) return null;

  return (
    <div className={styles.tagRow}>
      {tags.slice(0, limit).map((tag, index) => (
        <span
          className={[
            styles.tag,
            accent ? styles.accentTag : "",
            index === 0 ? styles.tagAccent : "",
            index === 1 ? styles.tagAccentSecondary : ""
          ]
            .filter(Boolean)
            .join(" ")}
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function renderMedia(
  config: CaseStudyListCardConfig,
  title: string,
  className: string,
  showLabel = true
): ReactElement | null {
  if (!config.imageSrc) return null;

  return (
    <div className={`${styles.mediaFrame} ${className}`} aria-hidden="true">
      <img
        src={config.imageSrc}
        alt=""
        className={styles.mediaImage}
        loading="lazy"
        style={{ objectPosition: config.objectPosition }}
      />
      <div className={styles.mediaTint} />
      <div className={styles.mediaGlow} />
      {showLabel ? <span className={styles.mediaLabel}>{title}</span> : null}
    </div>
  );
}

function renderTextCard(
  slot: AssignedCardSlot,
  locale: Locale,
  extraClassName?: string
): ReactElement {
  const isAccent = slot.variant === "accent";
  const hasMedia = !isAccent && Boolean(slot.config.imageSrc);
  const cardClassName = isAccent
    ? `${styles.card} ${styles.accentCard} ${extraClassName ?? ""}`.trim()
    : `${styles.card} ${styles.textCard} ${hasMedia ? styles.textCardWithMedia : ""} ${extraClassName ?? ""}`.trim();

  return (
    <article className={cardClassName} key={slot.id} style={toneStyles[slot.config.accentTone]}>
      <TrackedLink
        className={styles.cardLink}
        href={withLocalePath(locale, `/case-studies/${slot.item.slug}`)}
        tracking={{
          eventName: "case_study_click",
          kind: "internal",
          label: slot.item.frontmatter.title,
          locale,
          location: `case_studies_${slot.id}`,
          section: "case_studies"
        }}
      >
        {hasMedia ? renderMedia(slot.config, slot.item.frontmatter.title, styles.textMedia, false) : null}
        <div className={styles.cardContent}>
          <div className={styles.cardMetaRow}>
            {renderDate(slot.item.frontmatter.date)}
            <span className={styles.cardRule} aria-hidden="true" />
          </div>
          <h2 className={styles.cardTitle}>{slot.item.frontmatter.title}</h2>
          <p className={isAccent ? `${styles.cardSummary} ${styles.accentSummary}` : styles.cardSummary}>
            {slot.item.frontmatter.description}
          </p>
          {renderTags(slot.item.frontmatter.tags, slot.tagLimit, isAccent)}
        </div>
      </TrackedLink>
    </article>
  );
}

function renderPrimaryCard(slot: AssignedCardSlot, locale: Locale): ReactElement {
  const commonTracking = {
    eventName: "case_study_click" as const,
    kind: "internal" as const,
    label: slot.item.frontmatter.title,
    locale,
    location: `case_studies_${slot.id}`,
    section: "case_studies"
  };

  if (slot.variant === "feature") {
    return (
      <article className={`${styles.card} ${styles.featureCard}`} key={slot.id} style={toneStyles[slot.config.accentTone]}>
        <TrackedLink
          className={styles.cardLink}
          href={withLocalePath(locale, `/case-studies/${slot.item.slug}`)}
          tracking={commonTracking}
        >
          {renderMedia(slot.config, slot.item.frontmatter.title, styles.featureMedia)}
          <div className={`${styles.cardContent} ${styles.featureContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(slot.item.frontmatter.date)}
              <span className={styles.cardRule} aria-hidden="true" />
            </div>
            <h2 className={`${styles.cardTitle} ${styles.featureTitle}`}>{slot.item.frontmatter.title}</h2>
            <p className={`${styles.cardSummary} ${styles.featureSummary}`}>
              {slot.item.frontmatter.description}
            </p>
            {renderTags(slot.item.frontmatter.tags, slot.tagLimit, false)}
          </div>
        </TrackedLink>
      </article>
    );
  }

  if (slot.variant === "vertical") {
    return (
      <article className={`${styles.card} ${styles.verticalCard}`} key={slot.id} style={toneStyles[slot.config.accentTone]}>
        <TrackedLink
          className={styles.cardLink}
          href={withLocalePath(locale, `/case-studies/${slot.item.slug}`)}
          tracking={commonTracking}
        >
          {renderMedia(slot.config, slot.item.frontmatter.title, styles.verticalMedia)}
          <div className={`${styles.cardContent} ${styles.verticalContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(slot.item.frontmatter.date)}
            </div>
            <h2 className={styles.cardTitle}>{slot.item.frontmatter.title}</h2>
            <p className={styles.cardSummary}>{slot.item.frontmatter.description}</p>
            {renderTags(slot.item.frontmatter.tags, slot.tagLimit, false)}
          </div>
        </TrackedLink>
      </article>
    );
  }

  if (slot.variant === "split") {
    return (
      <article className={`${styles.card} ${styles.splitCard}`} key={slot.id} style={toneStyles[slot.config.accentTone]}>
        <TrackedLink
          className={styles.splitLink}
          href={withLocalePath(locale, `/case-studies/${slot.item.slug}`)}
          tracking={commonTracking}
        >
          {renderMedia(slot.config, slot.item.frontmatter.title, styles.splitMedia)}
          <div className={`${styles.cardContent} ${styles.splitContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(slot.item.frontmatter.date)}
            </div>
            <h2 className={styles.cardTitle}>{slot.item.frontmatter.title}</h2>
            <p className={styles.cardSummary}>{slot.item.frontmatter.description}</p>
            {renderTags(slot.item.frontmatter.tags, slot.tagLimit, false)}
          </div>
        </TrackedLink>
      </article>
    );
  }

  if (slot.variant === "stacked") {
    return (
      <article className={`${styles.card} ${styles.stackedCard}`} key={slot.id} style={toneStyles[slot.config.accentTone]}>
        <TrackedLink
          className={styles.cardLink}
          href={withLocalePath(locale, `/case-studies/${slot.item.slug}`)}
          tracking={commonTracking}
        >
          <div className={`${styles.cardContent} ${styles.stackedContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(slot.item.frontmatter.date)}
            </div>
            <h2 className={styles.cardTitle}>{slot.item.frontmatter.title}</h2>
            <p className={styles.cardSummary}>{slot.item.frontmatter.description}</p>
            {renderTags(slot.item.frontmatter.tags, slot.tagLimit, false)}
          </div>
          {renderMedia(slot.config, slot.item.frontmatter.title, styles.stackedMedia)}
        </TrackedLink>
      </article>
    );
  }

  return renderTextCard(slot, locale);
}

function renderOverflowCard(
  item: ParsedContent<CaseStudyFrontmatter>,
  locale: Locale
): ReactElement {
  const config = getCardConfig(item.slug);
  const hasMedia = Boolean(config.imageSrc);

  return (
    <article className={`${styles.card} ${styles.secondaryCard}`} key={item.slug} style={toneStyles[config.accentTone]}>
      <TrackedLink
        className={styles.cardLink}
        href={withLocalePath(locale, `/case-studies/${item.slug}`)}
        tracking={{
          eventName: "case_study_click",
          kind: "internal",
          label: item.frontmatter.title,
          locale,
          location: "case_studies_secondary_grid",
          section: "case_studies"
        }}
      >
        {hasMedia ? renderMedia(config, item.frontmatter.title, styles.secondaryMedia, false) : null}
        <div className={styles.cardContent}>
          <div className={styles.cardMetaRow}>
            {renderDate(item.frontmatter.date)}
          </div>
          <h2 className={styles.cardTitle}>{item.frontmatter.title}</h2>
          <p className={styles.cardSummary}>{item.frontmatter.description}</p>
          {renderTags(item.frontmatter.tags, 3, false)}
        </div>
      </TrackedLink>
    </article>
  );
}

export function CaseStudiesShowcase({
  locale,
  title,
  caseStudies
}: Props): ReactElement {
  const orderedCaseStudies = prioritizeCaseStudies(caseStudies);
  const copy = heroCopy[locale];
  const heroMedia = resolveHeroMedia(orderedCaseStudies);
  const { overflow, primary } = assignPrimarySlots(orderedCaseStudies);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="case-studies-hero-title">
        {heroMedia ? (
          <div className={styles.heroBackdrop} aria-hidden="true">
            <img
              src={heroMedia.config.heroImageSrc ?? heroMedia.config.imageSrc}
              alt=""
              className={styles.heroImage}
              style={{ objectPosition: heroMedia.config.heroObjectPosition ?? heroMedia.config.objectPosition }}
            />
            <div className={styles.heroGlowCyan} />
            <div className={styles.heroGlowIndigo} />
          </div>
        ) : null}

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>{copy.eyebrow}</span>
            </div>

            <h1 className={styles.heroTitle} id="case-studies-hero-title">
              {title}
            </h1>

            <p className={styles.heroIntro}>{renderHeroIntro(locale)}</p>

            <TrackedLink
              className={styles.scrollCue}
              href="#case-studies-grid"
              tracking={{
                eventName: "cta_click",
                kind: "internal",
                label: copy.scrollLabel,
                locale,
                location: "case_studies_scroll_cue",
                section: "case_studies"
              }}
            >
              <span className={styles.scrollLine} aria-hidden="true" />
              <span className={styles.scrollText}>{copy.scrollLabel}</span>
            </TrackedLink>
          </div>
        </div>
      </section>

      <div className={styles.canvas}>
        <div className={`${styles.ambientGlow} ${styles.ambientGlowLeft}`} aria-hidden="true" />
        <div className={`${styles.ambientGlow} ${styles.ambientGlowRight}`} aria-hidden="true" />

        <section className={styles.editorialGrid} id="case-studies-grid" aria-label={title}>
          {primary.map((slot) => renderPrimaryCard(slot, locale))}
        </section>

        {overflow.length > 0 ? (
          <section className={styles.secondarySection} aria-labelledby="case-studies-overflow-title">
            <h2 className={styles.secondaryHeading} id="case-studies-overflow-title">
              {copy.overflowTitle}
            </h2>
            <div className={styles.secondaryGrid}>
              {overflow.map((item) => renderOverflowCard(item, locale))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
