"use client";

import { useEffect, useRef } from "react";
import { trackException } from "@/lib/analytics";

const MAX_REPORTED_ERRORS = 40;

function buildErrorFingerprint(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join("|");
}

export function AnalyticsErrorTracking() {
  const reportedErrorsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    function rememberFingerprint(fingerprint: string): boolean {
      if (!fingerprint) return true;

      if (reportedErrorsRef.current.has(fingerprint)) {
        return false;
      }

      if (reportedErrorsRef.current.size >= MAX_REPORTED_ERRORS) {
        const firstKey = reportedErrorsRef.current.values().next().value;

        if (firstKey) {
          reportedErrorsRef.current.delete(firstKey);
        }
      }

      reportedErrorsRef.current.add(fingerprint);
      return true;
    }

    function handleRuntimeError(event: ErrorEvent): void {
      const fingerprint = buildErrorFingerprint([
        "window_error",
        event.filename,
        event.message,
        String(event.lineno),
        String(event.colno)
      ]);

      if (!rememberFingerprint(fingerprint)) return;

      trackException(event.error || event.message, {
        fatal: true,
        source: "window_error",
        extra: {
          error_column: event.colno || undefined,
          error_file: event.filename || undefined,
          error_line: event.lineno || undefined
        }
      });
    }

    function handleUnhandledRejection(event: PromiseRejectionEvent): void {
      const fingerprint = buildErrorFingerprint([
        "unhandled_rejection",
        typeof event.reason === "string" ? event.reason : JSON.stringify(event.reason)
      ]);

      if (!rememberFingerprint(fingerprint)) return;

      trackException(event.reason, {
        fatal: true,
        source: "unhandled_rejection"
      });
    }

    window.addEventListener("error", handleRuntimeError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleRuntimeError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
