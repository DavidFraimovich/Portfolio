import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import styles from "./SectionHeader.module.css";

export type SectionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type SectionHeaderProps = Omit<ComponentPropsWithoutRef<"header">, "title"> & {
  action?: ReactNode;
  compatibility?: boolean;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headingId?: string;
  headingLevel: SectionHeadingLevel;
  title: ReactNode;
};

const HEADING_TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6"
} as const;

export function SectionHeader({
  action,
  className,
  compatibility = false,
  description,
  eyebrow,
  headingId,
  headingLevel,
  title,
  ...headerProps
}: SectionHeaderProps): ReactElement {
  const HeadingTag = HEADING_TAGS[headingLevel];
  const hasAction = action !== null && action !== undefined;
  const rootClassName = [
    styles.root,
    hasAction && styles.withAction,
    compatibility && styles.compatibility,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header {...headerProps} className={rootClassName}>
      <div className={styles.copy}>
        {eyebrow !== null && eyebrow !== undefined ? (
          <div className={styles.eyebrow}>{eyebrow}</div>
        ) : null}

        <HeadingTag id={headingId} className={styles.title}>
          {title}
        </HeadingTag>

        {description !== null && description !== undefined ? (
          <div className={styles.description}>{description}</div>
        ) : null}
      </div>

      {hasAction ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
}
