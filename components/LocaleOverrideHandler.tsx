"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeDirection, switchLocalePath, type Locale } from "@/lib/i18n";
import { parseLocaleOverride, saveLocalePreference } from "@/lib/localePreference";

type Props = {
  locale: Locale;
};

export function LocaleOverrideHandler({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname() || "";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirection(locale);
  }, [locale]);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const localeOverride = parseLocaleOverride(currentParams.get("lang"));

    if (!localeOverride) return;

    saveLocalePreference(localeOverride);
    currentParams.delete("lang");

    const query = currentParams.toString();
    const targetPath = localeOverride === locale ? pathname : switchLocalePath(pathname, localeOverride);
    const target = query ? `${targetPath}?${query}` : targetPath;
    const current = `${pathname}${window.location.search}`;

    if (target !== current) {
      router.replace(target);
    }
  }, [locale, pathname, router]);

  return null;
}
