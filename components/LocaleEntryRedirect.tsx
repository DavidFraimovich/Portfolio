"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { withLocalePath } from "@/lib/i18n";
import { resolveInitialLocale } from "@/lib/localePreference";

export function LocaleEntryRedirect() {
  const router = useRouter();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;

    const redirectToResolvedLocale = async () => {
      const locale = await resolveInitialLocale(window.location.search);
      if (cancelled) return;
      router.replace(withLocalePath(locale));
    };

    void redirectToResolvedLocale();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main aria-live="polite">
      <noscript>
        JavaScript is required for automatic language detection. Open <a href="en">English</a> or{" "}
        <a href="he">עברית</a>.
      </noscript>
    </main>
  );
}
