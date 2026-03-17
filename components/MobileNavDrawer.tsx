"use client";

import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TrackedLink } from "@/components/TrackedLink";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { Locale } from "@/lib/i18n";

export type NavItem = {
  href: string;
  label: string;
};

type Props = {
  locale: Locale;
  navItems: NavItem[];
};

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function isActiveNavItem(pathname: string, href: string): boolean {
  const normalizedPathname = normalizePath(pathname);
  const normalizedHref = normalizePath(href);
  const pathParts = normalizedHref.split("/").filter(Boolean);
  const isLocaleHome = pathParts.length === 1;

  if (isLocaleHome) return normalizedPathname === normalizedHref;
  return (
    normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}

export function MobileNavDrawer({ locale, navItems }: Props): ReactElement {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = normalizePath(usePathname() || `/${locale}`);
  const panelId = useId();

  const labels =
    locale === "he"
      ? {
          open: "פתח תפריט ניווט",
          close: "סגור תפריט ניווט",
          navigation: "ניווט ראשי"
        }
      : {
          open: "Open navigation menu",
          close: "Close navigation menu",
          navigation: "Main navigation"
        };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div className="mobile-nav" data-open={open ? "true" : "false"}>
      <button
        type="button"
        className="mobile-nav-trigger"
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="mobile-nav-trigger-lines" aria-hidden="true" />
      </button>

      {mounted && open
        ? createPortal(
            <>
              <button
                type="button"
                className="mobile-nav-backdrop"
                aria-label={open ? labels.close : labels.open}
                onClick={() => setOpen(false)}
              />
              <aside id={panelId} className="mobile-nav-panel card" aria-label={labels.navigation}>
                <div className="mobile-nav-panel-inner">
                  <ul className="mobile-nav-list">
                    {navItems.map((item) => {
                      const active = isActiveNavItem(pathname, item.href);

                      return (
                        <li key={item.href}>
                          <TrackedLink
                            href={item.href}
                            className={`mobile-nav-link ${active ? "active" : ""}`}
                            onClick={() => setOpen(false)}
                            tracking={{
                              eventName: "navigation_click",
                              kind: "internal",
                              label: item.label,
                              locale,
                              location: "mobile_nav",
                              section: "header"
                            }}
                          >
                            <span className="mobile-nav-bullet" aria-hidden="true" />
                            <span>{item.label}</span>
                          </TrackedLink>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mobile-nav-controls">
                    <LanguageSwitcher locale={locale} />
                    <ThemeSwitcher />
                  </div>
                </div>
              </aside>
            </>,
            document.body
          )
        : null}
    </div>
  );
}
