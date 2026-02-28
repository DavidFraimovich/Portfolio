import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { siteDefaults, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteDefaults.title,
    template: `%s | ${siteDefaults.title}`
  },
  description: siteDefaults.description,
  openGraph: {
    title: siteDefaults.title,
    description: siteDefaults.description,
    type: "website",
    url: siteUrl
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
