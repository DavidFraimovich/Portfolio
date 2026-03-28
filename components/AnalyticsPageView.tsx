"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { googleAnalyticsMeasurementId, trackPageView } from "@/lib/analytics";

export function AnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!googleAnalyticsMeasurementId || !pathname) return;

    const path = search ? `${pathname}?${search}` : pathname;
    trackPageView(path, document.title);
  }, [pathname, search]);

  return null;
}
