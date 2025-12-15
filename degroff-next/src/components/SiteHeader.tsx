'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Technology", href: "#technology" },
  { label: "Benefits", href: "#benefits" },
  { label: "Compatibility", href: "#compatibility" },
  { label: "Gallery", href: "#gallery" },
  { label: "Updates", href: "#newsletter" },
  { label: "Contact", href: "#contact" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    const options: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", handleScroll, options);
    return () => window.removeEventListener("scroll", handleScroll, options);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const headerClasses = [
    "sticky top-0 z-50 transition-all duration-300",
    scrolled ? "bg-white/95 shadow-soft backdrop-blur dark:bg-slate-800/95 dark:border-b dark:border-slate-700" : "bg-white/90 dark:bg-slate-800/90",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <Image src={asset("/assets/degroff-logo.png.png")} alt="DeGroff Aviation Technologies™" width={220} height={88} priority />
        </a>
        <nav
          className={`hidden items-center gap-6 text-sm font-medium text-brand-dark/70 dark:text-slate-100/70 lg:flex flex-nowrap ${
            scrolled ? "text-brand-dark dark:text-slate-100" : ""
          }`}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-brand dark:hover:text-brand">
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 bg-white/80 text-sm text-brand shadow-sm transition-all duration-200 hover:border-brand hover:bg-brand/10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:bg-slate-700/80 dark:text-slate-100 dark:border-slate-500"
          >
            <span aria-hidden="true">{theme === "dark" ? "☀︎" : "☾"}</span>
          </button>
          <a
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-dark whitespace-nowrap flex-shrink-0"
            href="#contact"
          >
            Connect with Sales
          </a>
        </nav>
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 text-brand dark:text-slate-100 dark:border-slate-500 lg:hidden"
        >
          <div className="flex flex-col gap-[6px]">
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition ${menuOpen ? "translate-y-[8px] rotate-45" : ""}`}
            />
            <span className={`block h-[2px] w-5 rounded-full bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>
      <div
        className={`lg:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute inset-x-0 top-full bg-white/95 dark:bg-slate-800/95 shadow-soft dark:border-b dark:border-slate-700 transition`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-base font-medium text-brand-dark/80 dark:text-slate-100/80" aria-label="Mobile navigation">
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="mb-2 inline-flex items-center justify-center rounded-full border border-brand/20 bg-white/80 px-4 py-2 text-sm font-semibold text-brand shadow-sm transition-all duration-200 hover:border-brand hover:bg-brand/10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:bg-slate-700/80 dark:text-slate-100 dark:border-slate-500"
          >
            <span aria-hidden="true" className="mr-2">
              {theme === "dark" ? "☀︎" : "☾"}
            </span>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-brand/10 dark:border-slate-700 px-4 py-3 text-center transition hover:border-brand hover:bg-brand/5 hover:text-brand-dark dark:hover:bg-slate-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-3 text-white shadow-soft transition hover:bg-brand-dark"
          >
            Connect with Sales
          </a>
        </nav>
      </div>
    </header>
  );
}