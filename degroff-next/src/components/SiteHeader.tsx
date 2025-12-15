'use client';

import { useEffect, useRef, useState } from "react";
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
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 16);

      // Hide header when scrolling down, show when scrolling up
      const diff = currentY - lastScrollY.current;
      if (!menuOpen && currentY > 80) {
        if (diff > 4) {
          setHiddenOnScroll(true);
        } else if (diff < -4) {
          setHiddenOnScroll(false);
        }
      } else {
        setHiddenOnScroll(false);
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const headerClasses = [
    "sticky top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-sm transform",
    hiddenOnScroll ? "-translate-y-full" : "translate-y-0",
    scrolled
      ? "bg-white/95 shadow-header border-brand-dark/10 dark:bg-slate-800/95 dark:border-slate-600"
      : "bg-white/80 border-brand/10 dark:bg-slate-800/80 dark:border-slate-600",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:py-5">
        <a 
          href="#hero" 
          className="flex items-center gap-3 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-lg"
          aria-label="DeGroff Aviation Technologies - Home"
        >
          <Image 
            src={asset("/assets/degroff-logo.png.png")} 
            alt="DeGroff Aviation Technologies™" 
            width={220} 
            height={88} 
            priority 
            className="h-auto w-auto max-h-16 sm:max-h-20"
          />
        </a>
        <nav
          className="hidden items-center gap-4 text-sm font-medium text-brand-dark/80 dark:text-slate-100 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 transition-colors hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-lg min-h-[44px] flex items-center"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand scale-x-0 transition-transform duration-200 origin-left hover:scale-x-100" />
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
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lifted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
            href="#proponent"
          >
            Connect with Sales
          </a>
        </nav>
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/20 text-brand transition-colors hover:border-brand hover:bg-brand/5 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 lg:hidden"
        >
          <div className="flex flex-col gap-[6px]">
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
                menuOpen ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span 
              className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`} 
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
                menuOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>
      <div
        className={`lg:hidden transition-all duration-300 ${
          menuOpen 
            ? "pointer-events-auto opacity-100 max-h-screen" 
            : "pointer-events-none opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <nav
          className="mx-auto flex w-full max-w-7xl flex-col gap-3 border-t border-brand/10 bg-white px-6 py-6 text-base font-medium text-brand-dark/80 shadow-header dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600"
          aria-label="Mobile navigation"
        >
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
              className="rounded-xl border border-brand/10 px-4 py-3 text-center transition-all hover:border-brand hover:bg-brand/5 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px] flex items-center justify-center dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#proponent"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-3 text-white shadow-soft transition-all hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
          >
            Connect with Sales
          </a>
        </nav>
      </div>
    </header>
  );
}
