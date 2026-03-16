import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Content Manager",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <>
      <noscript>This admin page requires JavaScript.</noscript>
      <Script
        src="https://unpkg.com/decap-cms@^3.5.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  );
}
