"use client";

import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { type CSSProperties, type ReactElement, useEffect, useId, useRef, useState } from "react";
import styles from "@/components/SmartCampusCaseStudy.module.css";
import type { SmartCampusGalleryCopy, SmartCampusScreen } from "@/lib/smartCampusCaseStudy";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

type Props = {
  ariaLabel: string;
  copy: SmartCampusGalleryCopy;
  direction: "ltr" | "rtl";
  screens: SmartCampusScreen[];
};

function clampZoom(value: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));
}

export function SmartCampusScreensGallery({
  ariaLabel,
  copy,
  direction,
  screens
}: Props): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const captionId = useId();
  const isOpen = activeIndex !== null;
  const activeScreen = activeIndex === null ? null : screens[activeIndex];
  const activePosition = activeIndex === null ? 0 : activeIndex + 1;
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

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => (current === null ? current : (current + 1) % screens.length));
        setZoom(MIN_ZOOM);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => (current === null ? current : (current - 1 + screens.length) % screens.length));
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
  }, [isOpen, screens.length]);

  function openGallery(index: number): void {
    setActiveIndex(index);
    setZoom(MIN_ZOOM);
  }

  function closeGallery(): void {
    setActiveIndex(null);
    setZoom(MIN_ZOOM);
  }

  function showNext(): void {
    setActiveIndex((current) => (current === null ? current : (current + 1) % screens.length));
    setZoom(MIN_ZOOM);
  }

  function showPrevious(): void {
    setActiveIndex((current) => (current === null ? current : (current - 1 + screens.length) % screens.length));
    setZoom(MIN_ZOOM);
  }

  function zoomIn(): void {
    setZoom((current) => clampZoom(current + ZOOM_STEP));
  }

  function zoomOut(): void {
    setZoom((current) => clampZoom(current - ZOOM_STEP));
  }

  const galleryFigureStyle = activeScreen
    ? ({
        "--gallery-base-width":
          activeScreen.orientation === "portrait"
            ? "var(--sc-gallery-portrait-width)"
            : "var(--sc-gallery-landscape-width)",
        "--gallery-zoom": String(zoom)
      } as CSSProperties)
    : undefined;

  return (
    <>
      <div className={styles.screensGrid} aria-label={ariaLabel}>
        {screens.map((screen, index) => (
          <figure
            className={styles.screenCard}
            data-orientation={screen.orientation}
            key={screen.src}
          >
            <button
              type="button"
              className={styles.screenButton}
              onClick={() => openGallery(index)}
              aria-label={`${copy.open}: ${screen.alt}`}
              data-smart-campus-screen-index={index}
            >
              <img
                alt={screen.alt}
                className={styles.screenImage}
                decoding="async"
                loading="lazy"
                src={screen.src}
              />
            </button>
          </figure>
        ))}
      </div>

      {activeScreen ? (
        <div className={styles.galleryPortal} onClick={closeGallery} role="presentation">
          <div className={styles.galleryBackdrop} aria-hidden="true" />
          <div className={styles.galleryShell}>
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={copy.dialogLabel}
              aria-describedby={captionId}
              className={styles.galleryDialog}
              data-smart-campus-gallery="dialog"
              dir={direction}
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.galleryToolbar}>
                <span className={styles.galleryCounter} data-smart-campus-gallery="counter">
                  {activePosition} / {screens.length}
                </span>

                <div className={styles.galleryToolbarActions}>
                  <button
                    type="button"
                    className={styles.galleryIconButton}
                    onClick={showPrevious}
                    aria-label={copy.previous}
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.galleryIconButton}
                    onClick={showNext}
                    aria-label={copy.next}
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.galleryIconButton}
                    onClick={zoomOut}
                    aria-label={copy.zoomOut}
                    disabled={!canZoomOut}
                  >
                    <Minus aria-hidden="true" />
                  </button>
                  <span className={styles.galleryZoomValue} data-smart-campus-gallery="zoom">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    className={styles.galleryIconButton}
                    onClick={zoomIn}
                    aria-label={copy.zoomIn}
                    disabled={!canZoomIn}
                  >
                    <Plus aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.galleryIconButton}
                    onClick={closeGallery}
                    aria-label={copy.close}
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className={styles.galleryStage}>
                <button
                  type="button"
                  className={`${styles.galleryNavButton} ${styles.galleryNavPrev}`}
                  onClick={showPrevious}
                  aria-label={copy.previous}
                >
                  <ChevronLeft aria-hidden="true" />
                </button>

                <div className={styles.galleryViewport}>
                  <figure className={styles.galleryFigure} style={galleryFigureStyle}>
                    <img
                      alt={activeScreen.alt}
                      className={styles.galleryImage}
                      decoding="async"
                      src={activeScreen.src}
                    />
                  </figure>
                </div>

                <button
                  type="button"
                  className={`${styles.galleryNavButton} ${styles.galleryNavNext}`}
                  onClick={showNext}
                  aria-label={copy.next}
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>

              <p id={captionId} className={styles.galleryCaption}>
                {activeScreen.alt}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
