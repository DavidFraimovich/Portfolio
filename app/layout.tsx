import type { Metadata } from "next";
import "./globals.css";
import { GlobalClickRipple } from "@/components/GlobalClickRipple";
import { siteDefaults, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteDefaults.title,
    template: `%s | ${siteDefaults.title}`
  },
  description: siteDefaults.description,
  alternates: {
    canonical: siteUrl
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: siteDefaults.title,
    description: siteDefaults.description,
    type: "website",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: siteDefaults.title,
    description: siteDefaults.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `
    (function () {
      try {
        var key = "site-theme";
        var stored = localStorage.getItem(key);
        if (stored === "light" || stored === "dark") {
          document.documentElement.setAttribute("data-theme", stored);
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <GlobalClickRipple />
      </body>
    </html>
  );
}
