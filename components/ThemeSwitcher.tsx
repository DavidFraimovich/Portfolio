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
    if (!mounted) return "moon";
    return resolvedTheme === "light" ? "sun" : "moon";
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
        {triggerIcon === "sun" ? <SunIcon /> : <MoonIcon />}
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
            <SunIcon />
            Light
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={mode === "dark"}
            className={`theme-option ${mode === "dark" ? "active" : ""}`}
            onClick={() => setThemeMode("dark")}
          >
            <MoonIcon />
            Dark
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={mode === "system"}
            className={`theme-option ${mode === "system" ? "active" : ""}`}
            onClick={() => setThemeMode("system")}
          >
            <SystemIcon />
            System
          </button>
        </div>
      )}
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      className="theme-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M4.22 4.22l1.56 1.56M18.22 18.22l1.56 1.56M2 12h2.2M19.8 12H22M4.22 19.78l1.56-1.56M18.22 5.78l1.56-1.56" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="theme-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      className="theme-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}
