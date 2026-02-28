"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const THEME_STORAGE_KEY = "site-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === "system") {
    root.removeAttribute("data-theme");
    return;
  }

  root.setAttribute("data-theme", mode);
}

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const rawValue = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (rawValue === "light" || rawValue === "dark" || rawValue === "system") return rawValue;
  return "system";
}

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nextMode = readStoredTheme();
    setMode(nextMode);
    applyTheme(nextMode);
    setResolvedTheme(nextMode === "system" ? getSystemTheme() : nextMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onPointerDown = (event: PointerEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [mounted]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (): void => {
      if (mode === "system") setResolvedTheme(getSystemTheme());
    };
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mode]);

  const triggerIcon = useMemo(() => {
    if (!mounted) return "/icons/moon.svg";
    return resolvedTheme === "light" ? "/icons/sun.svg" : "/icons/moon.svg";
  }, [mounted, resolvedTheme]);

  function setThemeMode(nextMode: ThemeMode): void {
    setMode(nextMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    applyTheme(nextMode);
    setResolvedTheme(nextMode === "system" ? getSystemTheme() : nextMode);
    setOpen(false);
  }

  return (
    <div className="theme-switcher" ref={containerRef}>
      <button
        type="button"
        className="theme-trigger"
        aria-label="Theme menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        <img src={triggerIcon} alt="" width={18} height={18} />
      </button>

      {open && (
        <div className="theme-menu card" role="menu" aria-label="Theme options">
          <button
            type="button"
            role="menuitemradio"
            aria-checked={mode === "light"}
            className={`theme-option ${mode === "light" ? "active" : ""}`}
            onClick={() => setThemeMode("light")}
          >
            <img src="/icons/sun.svg" alt="" width={16} height={16} />
            Light
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={mode === "dark"}
            className={`theme-option ${mode === "dark" ? "active" : ""}`}
            onClick={() => setThemeMode("dark")}
          >
            <img src="/icons/moon.svg" alt="" width={16} height={16} />
            Dark
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={mode === "system"}
            className={`theme-option ${mode === "system" ? "active" : ""}`}
            onClick={() => setThemeMode("system")}
          >
            <img src="/icons/system.svg" alt="" width={16} height={16} />
            System
          </button>
        </div>
      )}
    </div>
  );
}
