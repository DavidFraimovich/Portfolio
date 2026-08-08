import type { ComponentPropsWithoutRef, ReactElement } from "react";
import styles from "./PageContainer.module.css";

export type PageContainerWidth = "standard" | "wide" | "reading";

export type PageContainerProps = ComponentPropsWithoutRef<"div"> & {
  compatibility?: boolean;
  width?: PageContainerWidth;
};

export function PageContainer({
  children,
  className,
  compatibility = false,
  width = "standard",
  ...divProps
}: PageContainerProps): ReactElement {
  const rootClassName = [
    styles.root,
    styles[width],
    compatibility && styles.compatibility,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...divProps} className={rootClassName}>
      {children}
    </div>
  );
}
