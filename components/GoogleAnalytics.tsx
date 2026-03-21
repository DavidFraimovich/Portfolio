import { Suspense } from "react";
import Script from "next/script";
import { AnalyticsErrorTracking } from "@/components/AnalyticsErrorTracking";
import { googleAnalyticsMeasurementId } from "@/lib/analytics";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";

export function GoogleAnalytics() {
  if (!googleAnalyticsMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsMeasurementId}', { send_page_view: true });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsPageView />
      </Suspense>
      <AnalyticsErrorTracking />
    </>
  );
}
