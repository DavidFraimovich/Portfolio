"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { withLocalePath } from "@/lib/i18n";
import { resolveInitialLocale } from "@/lib/localePreference";

export function LocaleEntryRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = useMemo(() => searchParams.toString(), [searchParams]);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;

    const redirectToResolvedLocale = async () => {
      const locale = await resolveInitialLocale(search);
      if (cancelled) return;
      router.replace(withLocalePath(locale));
    };

    void redirectToResolvedLocale();

    return () => {
      cancelled = true;
    };
  }, [router, search]);

  return (
    <main className="locale-chooser-wrap" aria-live="polite">
      <section className="locale-chooser card">
        <p>Redirecting to your preferred language...</p>
        <noscript>
          JavaScript is required for automatic language detection. Open <a href="/en">English</a> or{" "}
          <a href="/he">עברית</a>.
        </noscript>
      </section>
    </main>
  );
}
