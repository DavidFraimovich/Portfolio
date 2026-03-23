import styles from "@/components/SignyNotionEmbed.module.css";
import type { Locale } from "@/lib/i18n";
import { signyExecutiveSummary, signyNotionEmbedUrls } from "@/lib/signy";

type Props = {
  locale: Locale;
};

export function SignyNotionEmbed({ locale }: Props) {
  const src = signyNotionEmbedUrls[locale];
  const executiveSummary = signyExecutiveSummary[locale];
  const title = locale === "he" ? "Signy Notion embed Hebrew" : "Signy Notion embed English";

  return (
    <div className={styles.root}>
      <section className={styles.summarySection} aria-label={executiveSummary.eyebrow}>
        <div className={styles.summaryShell}>
          <p className={styles.eyebrow}>{executiveSummary.eyebrow}</p>
          <p className={styles.summary}>{executiveSummary.summary}</p>
          <dl className={styles.highlights}>
            {executiveSummary.highlights.map((highlight) => (
              <div className={styles.highlight} key={highlight.label}>
                <dt className={styles.highlightLabel}>{highlight.label}</dt>
                <dd className={styles.highlightValue}>{highlight.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.embedWrap} aria-label="Signy Notion embed">
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
