import styles from "@/components/SignyNotionEmbed.module.css";
import type { Locale } from "@/lib/i18n";
import { signyNotionEmbedUrls } from "@/lib/signy";

type Props = {
  locale: Locale;
};

export function SignyNotionEmbed({ locale }: Props) {
  const src = signyNotionEmbedUrls[locale];
  const title = locale === "he" ? "Signy Notion embed Hebrew" : "Signy Notion embed English";

  return (
    <section className={styles.wrap} aria-label="Signy Notion embed">
      <iframe
        allowFullScreen
        className={styles.frame}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={src}
        title={title}
      />
    </section>
  );
}
