"use client";

import { createPortal } from "react-dom";
import {
  type FocusEvent,
  type FormEvent,
  type ReactElement,
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import { getCurrentPageAnalyticsContext, getMessageLengthBucket, trackEvent, trackException } from "@/lib/analytics";
import { submitContactForm } from "@/lib/contactForm";
import { localeDirection, type Locale } from "@/lib/i18n";
import styles from "./Footer.module.css";

const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const MOBILE_LAYOUT_MEDIA_QUERY = "(max-width: 720px)";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ContactPanelCopy = {
  close: string;
  errorMessage: string;
  heading: string;
  infoLabel: string;
  intro: string;
  messageLabel: string;
  placeholder: string;
  send: string;
  sending: string;
  successSubtitle: string;
  successTitle: string;
  tooltipLines: [string, string];
};

type Props = {
  copy: ContactPanelCopy;
  locale: Locale;
  messageFieldId: string;
  panelId: string;
};

export function FooterContactPanel({
  copy,
  locale,
  messageFieldId,
  panelId
}: Props): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [tooltipMode, setTooltipMode] = useState<"closed" | "hover" | "manual">("closed");
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const desktopTooltipId = useId();
  const mobileTooltipId = useId();
  const statusMessageId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const isTooltipOpen = tooltipMode !== "closed";
  const submitButtonDescription = [
    !isMobileLayout && isTooltipOpen ? desktopTooltipId : null,
    submissionError ? statusMessageId : null
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hoverMediaQuery = window.matchMedia(HOVER_MEDIA_QUERY);
    const mobileLayoutMediaQuery = window.matchMedia(MOBILE_LAYOUT_MEDIA_QUERY);

    const syncHoverSupport = (): void => {
      setSupportsHover(hoverMediaQuery.matches);
      if (!hoverMediaQuery.matches) {
        setTooltipMode((current) => (current === "hover" ? "closed" : current));
      }
    };

    const syncMobileLayout = (): void => {
      setIsMobileLayout(mobileLayoutMediaQuery.matches);
      if (mobileLayoutMediaQuery.matches) {
        setTooltipMode((current) => (current === "hover" ? "closed" : current));
      }
    };

    syncHoverSupport();
    syncMobileLayout();

    hoverMediaQuery.addEventListener("change", syncHoverSupport);
    mobileLayoutMediaQuery.addEventListener("change", syncMobileLayout);

    return () => {
      hoverMediaQuery.removeEventListener("change", syncHoverSupport);
      mobileLayoutMediaQuery.removeEventListener("change", syncMobileLayout);
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

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
        setIsModalOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
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
  }, [isModalOpen]);

  useEffect(() => {
    if (tooltipMode !== "manual") return;

    const onPointerDown = (event: PointerEvent): void => {
      if (!formRef.current?.contains(event.target as Node)) {
        setTooltipMode("closed");
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [tooltipMode]);

  function handleActionBlur(event: FocusEvent<HTMLElement>): void {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setTooltipMode("closed");
    }
  }

  function closeModal(): void {
    setIsModalOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (isSubmitting) return;

    const normalizedMessage = message.trim();
    if (!normalizedMessage) {
      setSubmissionError(copy.errorMessage);
      return;
    }

    setTooltipMode("closed");
    setSubmissionError(null);
    setIsSubmitting(true);

    const pageContext = getCurrentPageAnalyticsContext();
    const pagePath = typeof window !== "undefined" ? `${pageContext.path}${window.location.search}` : pageContext.path;

    try {
      await submitContactForm({
        locale,
        message: normalizedMessage,
        pagePath,
        pageTitle: typeof document !== "undefined" ? document.title : undefined,
        referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
        source: "footer_contact",
        submittedAt: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined
      });

      trackEvent("generate_lead", {
        contact_method: "message",
        form_name: "footer_contact",
        locale,
        message_length_bucket: getMessageLengthBucket(normalizedMessage),
        page_path: pagePath,
        page_route: pageContext.route,
        page_type: pageContext.pageType
      });
      trackEvent("contact_notification_sent", {
        channel: "telegram",
        form_name: "footer_contact",
        locale,
        page_path: pagePath,
        page_route: pageContext.route,
        page_type: pageContext.pageType
      });

      setMessage("");
      setIsModalOpen(true);
    } catch (error) {
      trackEvent("contact_notification_failed", {
        channel: "telegram",
        form_name: "footer_contact",
        locale,
        page_path: pagePath,
        page_route: pageContext.route,
        page_type: pageContext.pageType
      });
      trackException(error, {
        fatal: false,
        source: "footer_contact_form_submit",
        extra: {
          form_name: "footer_contact",
          locale,
          page_path: pagePath,
          page_route: pageContext.route,
          page_type: pageContext.pageType
        }
      });
      setSubmissionError(copy.errorMessage);
      console.error("Footer contact form submission failed.", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function openHoverTooltip(): void {
    if (!supportsHover || isMobileLayout) return;
    setTooltipMode("hover");
  }

  function closeHoverTooltip(): void {
    if (!supportsHover || isMobileLayout) return;
    setTooltipMode((current) => (current === "manual" ? current : "closed"));
  }

  return (
    <>
      <div id={panelId} className={styles.contactColumn}>
        <h3 className={styles.sectionHeading}>{copy.heading}</h3>
        <p className={styles.contactIntro}>{copy.intro}</p>

        <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit} onBlurCapture={handleActionBlur}>
          <div className={styles.fieldLabelRow}>
            <label className={styles.fieldLabel} htmlFor={messageFieldId}>
              {copy.messageLabel}
            </label>

            <button
              type="button"
              className={`${styles.infoButton} ${styles.mobileInfoButton}`}
              aria-controls={mobileTooltipId}
              aria-describedby={isMobileLayout && isTooltipOpen ? mobileTooltipId : undefined}
              aria-expanded={isMobileLayout ? isTooltipOpen : false}
              aria-label={copy.infoLabel}
              onClick={() => setTooltipMode((current) => (current === "manual" ? "closed" : "manual"))}
            >
              i
            </button>

            <div
              id={mobileTooltipId}
              role="tooltip"
              aria-hidden={!isMobileLayout || !isTooltipOpen}
              className={`${styles.tooltip} ${styles.mobileTooltip}`}
              data-open={isMobileLayout && isTooltipOpen ? "true" : "false"}
            >
              <p>{copy.tooltipLines[0]}</p>
              <p>{copy.tooltipLines[1]}</p>
            </div>
          </div>

          <textarea
            id={messageFieldId}
            className={styles.messageField}
            name="message"
            placeholder={copy.placeholder}
            aria-describedby={submissionError ? statusMessageId : undefined}
            aria-invalid={submissionError ? "true" : "false"}
            rows={4}
            required
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);

              if (submissionError) {
                setSubmissionError(null);
              }
            }}
            disabled={isSubmitting}
          />

          <div
            className={styles.sendRow}
            onMouseLeave={closeHoverTooltip}
          >
            <div
              id={desktopTooltipId}
              role="tooltip"
              aria-hidden={isMobileLayout || !isTooltipOpen}
              className={`${styles.tooltip} ${styles.desktopTooltip}`}
              data-open={!isMobileLayout && isTooltipOpen ? "true" : "false"}
            >
              <p>{copy.tooltipLines[0]}</p>
              <p>{copy.tooltipLines[1]}</p>
            </div>

            <button
              type="submit"
              className={styles.sendButton}
              aria-describedby={submitButtonDescription}
              onFocus={openHoverTooltip}
              onMouseEnter={openHoverTooltip}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? copy.sending : copy.send}</span>
              <span className={styles.sendIcon} aria-hidden="true">
                <SendArrowIcon />
              </span>
            </button>
          </div>

          <p
            id={statusMessageId}
            className={styles.statusMessage}
            data-visible={submissionError ? "true" : "false"}
            role={submissionError ? "alert" : "status"}
            aria-live="polite"
          >
            {submissionError || ""}
          </p>
        </form>
      </div>

      {mounted && isModalOpen
        ? createPortal(
            <div className={styles.dialogPortal} onClick={closeModal} role="presentation">
              <div className={styles.dialogBackdrop} aria-hidden="true" />
              <div className={styles.dialogShell}>
                <div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  aria-describedby={descriptionId}
                  className={styles.dialog}
                  dir={localeDirection(locale)}
                  tabIndex={-1}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className={styles.dialogIcon} aria-hidden="true">
                    <CheckIcon />
                  </div>
                  <h4 id={titleId} className={styles.dialogTitle}>
                    {copy.successTitle}
                  </h4>
                  <p id={descriptionId} className={styles.dialogDescription}>
                    {copy.successSubtitle}
                  </p>
                  <button type="button" className={styles.dialogCloseButton} onClick={closeModal}>
                    {copy.close}
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

function SendArrowIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path
        d="M6.29602 2.90603C3.91012 1.80484 1.36183 4.08567 2.19279 6.57859L3.45424 10.3197C3.59136 10.7263 3.97267 11.0002 4.40182 11.0002H13C13.5523 11.0002 14 11.4479 14 12.0002C14 12.5524 13.5523 13.0002 13 13.0002H4.40182C3.97267 13.0002 3.59136 13.274 3.45424 13.6806L2.19281 17.4217C1.36183 19.9147 3.91012 22.1955 6.29603 21.0943L20.0983 14.7241C22.422 13.6516 22.422 10.3488 20.0983 9.27632L6.29602 2.90603Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path
        d="m7.2 12.6 3.2 3.2 6.4-7.4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}
