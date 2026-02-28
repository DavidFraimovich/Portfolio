"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

function switchLocale(pathname: string, locale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return `/${locale}`;

  const localeIndex = parts.findIndex((part) => locales.includes(part as Locale));
  if (localeIndex >= 0) {
    parts[localeIndex] = locale;
    return `/${parts.join("/")}`;
  }

  parts.unshift(locale);
  return `/${parts.join("/")}`;
}

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="lang-switch" aria-label="Language selector">
      <Link href={switchLocale(pathname, "en")} className={locale === "en" ? "active" : ""}>
        EN
      </Link>
      <Link href={switchLocale(pathname, "he")} className={locale === "he" ? "active" : ""}>
        HE
      </Link>
    </div>
  );
}
