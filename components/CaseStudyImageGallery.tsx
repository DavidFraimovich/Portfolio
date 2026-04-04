"use client";

import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import styles from "@/components/CaseStudyImageGallery.module.css";
import {
  getCaseStudyImageGalleryCopy,
  type CaseStudyGalleryImage,
  type CaseStudyImageGalleryCopy
} from "@/lib/caseStudyImageGallery";
import { localeDirection, type Locale } from "@/lib/i18n";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

type GalleryClassNames = {
  button?: string;
  caption?: string;
  dialog?: string;
  image?: string;
  item?: string;
  root?: string;
};

type BaseProps = {
  ariaLabel: string;
  classNames?: GalleryClassNames;
  copy?: CaseStudyImageGalleryCopy;
  dialogLabel?: string;
  locale: Locale;
};

type GridProps = BaseProps & {
  images: CaseStudyGalleryImage[];
  layout?: "grid";
};

type SingleProps = BaseProps & {
  image: CaseStudyGalleryImage;
  layout: "single";
};

type Props = GridProps | SingleProps;

function cn(...values: Array<string | undefined | false>): string {
  return values.filter(Boolean).join(" ");
}

function clampZoom(value: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));
}

function normalizeOrientation(image: CaseStudyGalleryImage): "landscape" | "portrait" {
  return image.orientation ?? "landscape";
}

export function CaseStudyImageGallery(props: Props) {
  const images = props.layout === "single" ? [props.image] : props.images;
  const copy = props.copy ?? getCaseStudyImageGalleryCopy(props.locale);
  const direction = localeDirection(props.locale);
  const isRtl = direction === "rtl";
  const PreviousIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const previousKey = isRtl ? "ArrowRight" : "ArrowLeft";
  const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const captionId = useId();
  const isOpen = activeIndex !== null;
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const activePosition = activeIndex === null ? 0 : activeIndex + 1;
  const canNavigate = images.length > 1;
  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM;

  useEffect(() => {
    if (!isOpen) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialogNode = dialogRef.current;
    const focusableElements = dialogNode
      ? Array.from(dialogNode.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      dialogNode?.focus();
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
        setZoom(MIN_ZOOM);
        return;
      }

      if (canNavigate && event.key === nextKey) {
        event.preventDefault();
        setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
        setZoom(MIN_ZOOM);
        return;
      }

      if (canNavigate && event.key === previousKey) {
        event.preventDefault();
        setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
        setZoom(MIN_ZOOM);
        return;
      }

      if ((event.key === "+" || event.key === "=") && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setZoom((current) => clampZoom(current + ZOOM_STEP));
        return;
      }

      if (event.key === "-" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setZoom((current) => clampZoom(current - ZOOM_STEP));
        return;
      }

      if (event.key !== "Tab") return;

      const currentDialog = dialogRef.current;
      const currentFocusable = currentDialog
        ? Array.from(currentDialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        : [];

      if (currentFocusable.length === 0) return;

      const firstElement = currentFocusable[0];
      const lastElement = currentFocusable[currentFocusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      lastActiveRef.current?.focus();
    };
  }, [canNavigate, images.length, isOpen, nextKey, previousKey]);

  function openGallery(index: number): void {
    setActiveIndex(index);
    setZoom(MIN_ZOOM);
  }

  function closeGallery(): void {
    setActiveIndex(null);
    setZoom(MIN_ZOOM);
  }

  function showNext(): void {
    if (!canNavigate) return;

    setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
    setZoom(MIN_ZOOM);
  }

  function showPrevious(): void {
    if (!canNavigate) return;

    setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
    setZoom(MIN_ZOOM);
  }

  function zoomIn(): void {
    setZoom((current) => clampZoom(current + ZOOM_STEP));
  }

  function zoomOut(): void {
    setZoom((current) => clampZoom(current - ZOOM_STEP));
  }

  const dialogLabel = props.dialogLabel ?? copy.dialogLabel ?? props.ariaLabel;
  const galleryFigureStyle = activeImage
    ? ({
        "--gallery-base-width":
          normalizeOrientation(activeImage) === "portrait"
            ? "var(--gallery-portrait-width)"
            : "var(--gallery-landscape-width)",
        "--gallery-zoom": String(zoom)
      } as CSSProperties)
    : undefined;

  const rootClassName =
    props.layout === "single"
      ? cn(styles.singleRoot, props.classNames?.root)
      : cn(styles.grid, props.classNames?.root);
  const itemClassName =
    props.layout === "single"
      ? cn(styles.singleItem, props.classNames?.item)
      : cn(styles.gridItem, props.classNames?.item);
  const captionText = activeImage?.alt.trim() ?? "";

  return (
    <>
      <div className={rootClassName} aria-label={props.ariaLabel}>
        {images.map((image, index) => (
          <figure
            className={itemClassName}
            data-orientation={normalizeOrientation(image)}
            key={`${image.src}-${index}`}
          >
            <button
              type="button"
              className={cn(styles.trigger, props.classNames?.button)}
              onClick={() => openGallery(index)}
              aria-label={image.alt ? `${copy.open}: ${image.alt}` : copy.open}
            >
              <img
                alt={image.alt}
                className={cn(styles.image, props.classNames?.image)}
                decoding="async"
                loading={image.loading ?? (props.layout === "single" ? "eager" : "lazy")}
                src={image.src}
              />
            </button>
          </figure>
        ))}
      </div>

      {activeImage ? (
        <div className={styles.portal} onClick={closeGallery} role="presentation">
          <div className={styles.backdrop} aria-hidden="true" />
          <div className={styles.shell}>
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={dialogLabel}
              aria-describedby={captionText ? captionId : undefined}
              className={cn(styles.dialog, props.classNames?.dialog)}
              dir={direction}
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.toolbar}>
                <span className={styles.counter}>
                  {activePosition} / {images.length}
                </span>

                <div className={styles.toolbarActions}>
                  {canNavigate ? (
                    <>
                      <button
                        type="button"
                        className={styles.iconButton}
                        onClick={showPrevious}
                        aria-label={copy.previous}
                      >
                        <PreviousIcon aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={styles.iconButton}
                        onClick={showNext}
                        aria-label={copy.next}
                      >
                        <NextIcon aria-hidden="true" />
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={zoomOut}
                    aria-label={copy.zoomOut}
                    disabled={!canZoomOut}
                  >
                    <Minus aria-hidden="true" />
                  </button>
                  <span className={styles.zoomValue}>{Math.round(zoom * 100)}%</span>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={zoomIn}
                    aria-label={copy.zoomIn}
                    disabled={!canZoomIn}
                  >
                    <Plus aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={closeGallery}
                    aria-label={copy.close}
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className={styles.stage}>
                {canNavigate ? (
                  <button
                    type="button"
                    className={cn(styles.navButton, styles.navPrev)}
                    onClick={showPrevious}
                    aria-label={copy.previous}
                  >
                    <PreviousIcon aria-hidden="true" />
                  </button>
                ) : null}

                <div className={styles.viewport}>
                  <figure className={styles.figure} style={galleryFigureStyle}>
                    <img
                      alt={activeImage.alt}
                      className={styles.fullImage}
                      decoding="async"
                      src={activeImage.src}
                    />
                  </figure>
                </div>

                {canNavigate ? (
                  <button
                    type="button"
                    className={cn(styles.navButton, styles.navNext)}
                    onClick={showNext}
                    aria-label={copy.next}
                  >
                    <NextIcon aria-hidden="true" />
                  </button>
                ) : null}
              </div>

              {captionText ? (
                <p id={captionId} className={cn(styles.caption, props.classNames?.caption)}>
                  {captionText}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CaseStudyImageGridGallery(props: Omit<GridProps, "layout">) {
  return <CaseStudyImageGallery {...props} layout="grid" />;
}

export function CaseStudyZoomableImage(props: Omit<SingleProps, "layout">) {
  return <CaseStudyImageGallery {...props} layout="single" />;
}
