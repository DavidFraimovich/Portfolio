import type { CSSProperties, ReactElement } from "react";
import { TrackedLink } from "@/components/TrackedLink";
import type { CaseStudyFrontmatter, ParsedContent } from "@/lib/content";
import { formatCaseStudyStartDate } from "@/lib/date";
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

type CardVariant = "feature" | "vertical" | "text" | "split" | "stacked" | "accent";

type ShowcaseRowLayout = "lead-a" | "lead-b";

type CaseStudyListCardConfig = {
  accentTone: AccentTone;
  heroEligible?: boolean;
  heroImageSrc?: string;
  heroObjectPosition?: string;
  imageSrc?: string;
  objectPosition?: string;
};

type CaseStudyToneStyle = CSSProperties & Record<"--case-accent" | "--case-accent-soft" | "--case-glow", string>;

type AssignedCard = {
  config: CaseStudyListCardConfig;
  item: ParsedContent<CaseStudyFrontmatter>;
  locationId: string;
  tagLimit: number;
  variant: CardVariant;
};

type ShowcaseRow = {
  cards: AssignedCard[];
  id: string;
  layout: ShowcaseRowLayout;
};

type HeroMedia = {
  config: CaseStudyListCardConfig;
  item: ParsedContent<CaseStudyFrontmatter>;
};

type RowBlueprint = {
  id: string;
  layout: ShowcaseRowLayout;
  slots: Array<Pick<AssignedCard, "tagLimit" | "variant">>;
};

const heroCopy = {
  en: {
    eyebrow: "Selected Works",
    scrollLabel: "Scroll to explore"
  },
  he: {
    eyebrow: "עבודות נבחרות",
    scrollLabel: "גללו כדי לראות עוד"
  }
} satisfies Record<Locale, { eyebrow: string; scrollLabel: string }>;

const HERO_PRIORITY = [
  "paamonim-smart-financial-management-app",
  "research-search-engine-based-on-rag",
  "smart-campus-learning-center-module"
] as const;

const CASE_STUDY_ORDER = [
  "signy",
  "research-search-engine-based-on-rag",
  "instant-loan-request-system",
  "smart-campus-learning-center-module",
  "smart-campus-access-control-system",
  "rentil",
  "smart-campus-maintenance-service-calls-module",
  "paamonim-smart-financial-management-app",
  "erp-government-api-integrations",
  "checkout-optimization",
  "website-as-product",
  "mvp-6-months"
] as const;

const ROW_BLUEPRINTS: RowBlueprint[] = [
  {
    id: "lead-row-a",
    layout: "lead-a",
    slots: [
      { tagLimit: 3, variant: "feature" },
      { tagLimit: 2, variant: "text" }
    ]
  },
  {
    id: "lead-row-b",
    layout: "lead-b",
    slots: [
      { tagLimit: 2, variant: "text" },
      { tagLimit: 3, variant: "split" }
    ]
  }
];

const CASE_STUDY_LIST_CONFIG: Record<string, CaseStudyListCardConfig> = {
  "paamonim-smart-financial-management-app": {
    accentTone: "sky",
    heroEligible: true,
    heroImageSrc: withVersionedAssetPath("/images/case-studies/paamonim/hero-system.png"),
    heroObjectPosition: "center 34%",
    imageSrc: withVersionedAssetPath("/images/case-studies/paamonim/hero-system.png"),
    objectPosition: "center 28%"
  },
  "smart-campus-access-control-system": {
    accentTone: "sky",
    imageSrc: withVersionedAssetPath("/images/case-studies/smart-campus-security-module/hero.png"),
    objectPosition: "center center"
  },
  "smart-campus-learning-center-module": {
    accentTone: "mint",
    imageSrc: withVersionedAssetPath("/images/case-studies/smart-campus-study-center/smart-campus-study-center-hero.png"),
    objectPosition: "center top"
  },
  "smart-campus-maintenance-service-calls-module": {
    accentTone: "amber",
    imageSrc: withVersionedAssetPath(
      "/images/case-studies/smart-campus-maintence/smart-campus-maintence-hero.png"
    ),
    objectPosition: "center center"
  },
  "erp-government-api-integrations": {
    accentTone: "mint",
    imageSrc: withVersionedAssetPath("/images/featured/erp-gov.svg"),
    objectPosition: "center center"
  },
  "mvp-6-months": {
    accentTone: "amber",
    imageSrc: withVersionedAssetPath("/images/featured/mvp-6-months.svg"),
    objectPosition: "center center"
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
    objectPosition: "center center"
  },
  rentil: {
    accentTone: "slate",
    imageSrc: withVersionedAssetPath("/images/case-studies/rentil/hero-system.svg"),
    objectPosition: "center center"
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
  const priorityMap = new Map<string, number>(CASE_STUDY_ORDER.map((slug, index) => [slug, index]));
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

  const fallback = caseStudies.find((item) => Boolean(getCardConfig(item.slug).imageSrc));

  if (!fallback) return null;

  return { config: getCardConfig(fallback.slug), item: fallback };
}

function buildRow(
  items: ParsedContent<CaseStudyFrontmatter>[],
  blueprint: RowBlueprint,
  rowIndex = 0
): ShowcaseRow | null {
  const rowSuffix = rowIndex === 0 ? "" : `-${rowIndex + 1}`;
  const cards = items.slice(0, blueprint.slots.length).map((item, index) => {
    const slot = blueprint.slots[index];

    return {
      config: getCardConfig(item.slug),
      item,
      locationId: `${blueprint.id}${rowSuffix}_${index + 1}`,
      tagLimit: slot.tagLimit,
      variant: slot.variant
    } satisfies AssignedCard;
  });

  if (cards.length === 0) return null;

  return {
    cards,
    id: `${blueprint.id}${rowSuffix}`,
    layout: blueprint.layout
  };
}

function buildShowcaseRows(
  caseStudies: ParsedContent<CaseStudyFrontmatter>[]
): ShowcaseRow[] {
  const rows: ShowcaseRow[] = [];

  for (let index = 0; index < caseStudies.length; index += 2) {
    const row = buildRow(
      caseStudies.slice(index, index + 2),
      ROW_BLUEPRINTS[(index / 2) % ROW_BLUEPRINTS.length],
      index / 2
    );
    if (row) rows.push(row);
  }

  return rows;
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
  return <span className={styles.cardDate}>{formatCaseStudyStartDate(date)}</span>;
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
  className: string
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
    </div>
  );
}

function renderTextCard(
  card: AssignedCard,
  locale: Locale,
  extraClassName?: string
): ReactElement {
  const isAccent = card.variant === "accent";
  const hasMedia = !isAccent && Boolean(card.config.imageSrc);
  const cardClassName = isAccent
    ? `${styles.card} ${styles.accentCard} ${extraClassName ?? ""}`.trim()
    : `${styles.card} ${styles.textCard} ${hasMedia ? styles.textCardWithMedia : ""} ${extraClassName ?? ""}`.trim();

  return (
    <article className={cardClassName} key={card.item.slug} style={toneStyles[card.config.accentTone]}>
      <TrackedLink
        className={styles.cardLink}
        href={withLocalePath(locale, `/case-studies/${card.item.slug}`)}
        tracking={{
          eventName: "case_study_click",
          kind: "internal",
          label: card.item.frontmatter.title,
          locale,
          location: `case_studies_${card.locationId}`,
          section: "case_studies"
        }}
      >
        {hasMedia ? renderMedia(card.config, styles.textMedia) : null}
        <div className={styles.cardContent}>
          <div className={styles.cardMetaRow}>
            {renderDate(card.item.frontmatter.date)}
            <span className={styles.cardRule} aria-hidden="true" />
          </div>
          <h2 className={styles.cardTitle}>{card.item.frontmatter.title}</h2>
          <p className={isAccent ? `${styles.cardSummary} ${styles.accentSummary}` : styles.cardSummary}>
            {card.item.frontmatter.description}
          </p>
          {renderTags(card.item.frontmatter.tags, card.tagLimit, isAccent)}
        </div>
      </TrackedLink>
    </article>
  );
}

function renderPrimaryCard(card: AssignedCard, locale: Locale): ReactElement {
  const commonTracking = {
    eventName: "case_study_click" as const,
    kind: "internal" as const,
    label: card.item.frontmatter.title,
    locale,
    location: `case_studies_${card.locationId}`,
    section: "case_studies"
  };

  if (card.variant === "feature") {
    return (
      <article className={`${styles.card} ${styles.featureCard}`} key={card.item.slug} style={toneStyles[card.config.accentTone]}>
        <TrackedLink
          className={styles.cardLink}
          href={withLocalePath(locale, `/case-studies/${card.item.slug}`)}
          tracking={commonTracking}
        >
          {renderMedia(card.config, styles.featureMedia)}
          <div className={`${styles.cardContent} ${styles.featureContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(card.item.frontmatter.date)}
              <span className={styles.cardRule} aria-hidden="true" />
            </div>
            <h2 className={`${styles.cardTitle} ${styles.featureTitle}`}>{card.item.frontmatter.title}</h2>
            <p className={`${styles.cardSummary} ${styles.featureSummary}`}>
              {card.item.frontmatter.description}
            </p>
            {renderTags(card.item.frontmatter.tags, card.tagLimit, false)}
          </div>
        </TrackedLink>
      </article>
    );
  }

  if (card.variant === "vertical") {
    return (
      <article className={`${styles.card} ${styles.verticalCard}`} key={card.item.slug} style={toneStyles[card.config.accentTone]}>
        <TrackedLink
          className={styles.cardLink}
          href={withLocalePath(locale, `/case-studies/${card.item.slug}`)}
          tracking={commonTracking}
        >
          {renderMedia(card.config, styles.verticalMedia)}
          <div className={`${styles.cardContent} ${styles.verticalContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(card.item.frontmatter.date)}
            </div>
            <h2 className={styles.cardTitle}>{card.item.frontmatter.title}</h2>
            <p className={styles.cardSummary}>{card.item.frontmatter.description}</p>
            {renderTags(card.item.frontmatter.tags, card.tagLimit, false)}
          </div>
        </TrackedLink>
      </article>
    );
  }

  if (card.variant === "split") {
    return (
      <article className={`${styles.card} ${styles.splitCard}`} key={card.item.slug} style={toneStyles[card.config.accentTone]}>
        <TrackedLink
          className={styles.splitLink}
          href={withLocalePath(locale, `/case-studies/${card.item.slug}`)}
          tracking={commonTracking}
        >
          {renderMedia(card.config, styles.splitMedia)}
          <div className={`${styles.cardContent} ${styles.splitContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(card.item.frontmatter.date)}
            </div>
            <h2 className={styles.cardTitle}>{card.item.frontmatter.title}</h2>
            <p className={styles.cardSummary}>{card.item.frontmatter.description}</p>
            {renderTags(card.item.frontmatter.tags, card.tagLimit, false)}
          </div>
        </TrackedLink>
      </article>
    );
  }

  if (card.variant === "stacked") {
    return (
      <article className={`${styles.card} ${styles.stackedCard}`} key={card.item.slug} style={toneStyles[card.config.accentTone]}>
        <TrackedLink
          className={styles.cardLink}
          href={withLocalePath(locale, `/case-studies/${card.item.slug}`)}
          tracking={commonTracking}
        >
          <div className={`${styles.cardContent} ${styles.stackedContent}`}>
            <div className={styles.cardMetaRow}>
              {renderDate(card.item.frontmatter.date)}
            </div>
            <h2 className={styles.cardTitle}>{card.item.frontmatter.title}</h2>
            <p className={styles.cardSummary}>{card.item.frontmatter.description}</p>
            {renderTags(card.item.frontmatter.tags, card.tagLimit, false)}
          </div>
          {renderMedia(card.config, styles.stackedMedia)}
        </TrackedLink>
      </article>
    );
  }

  return renderTextCard(card, locale);
}

function renderShowcaseCard(card: AssignedCard, locale: Locale): ReactElement {
  return card.variant === "text" || card.variant === "accent"
    ? renderTextCard(card, locale)
    : renderPrimaryCard(card, locale);
}

function renderShowcaseRow(row: ShowcaseRow, locale: Locale): ReactElement {
  const rowClassName = [
    styles.showcaseRow,
    row.layout === "lead-a" ? styles.leadRowA : "",
    row.layout === "lead-b" ? styles.leadRowB : "",
    row.cards.length === 1 ? styles.singleCardRow : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rowClassName} key={row.id}>
      {row.cards.map((card) => renderShowcaseCard(card, locale))}
    </div>
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
  const rows = buildShowcaseRows(orderedCaseStudies);

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
          {rows.map((row) => renderShowcaseRow(row, locale))}
        </section>
      </div>
    </div>
  );
}
