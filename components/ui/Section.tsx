import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { PageContainer, type PageContainerWidth } from "./PageContainer";
import styles from "./Section.module.css";

export type SectionLayout = "contained" | "full-bleed";
export type SectionSpacing = "compact" | "standard" | "major";

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  containerCompatibility?: boolean;
  containerWidth?: PageContainerWidth;
  layout?: SectionLayout;
  spacing?: SectionSpacing;
};

export function Section({
  children,
  className,
  containerCompatibility = false,
  containerWidth = "standard",
  layout = "contained",
  spacing,
  ...sectionProps
}: SectionProps): ReactElement {
  const rootClassName = [styles.root, styles[layout], spacing && styles[spacing], className]
    .filter(Boolean)
    .join(" ");

  return (
    <section {...sectionProps} className={rootClassName}>
      {layout === "contained" ? (
        <PageContainer width={containerWidth} compatibility={containerCompatibility}>
          {children}
        </PageContainer>
      ) : (
        children
      )}
    </section>
  );
}
