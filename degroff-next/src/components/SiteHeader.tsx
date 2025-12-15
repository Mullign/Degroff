'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

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
    scrolled ? "bg-white/95 shadow-soft backdrop-blur" : "bg-white/90",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <Image src={asset("/assets/degroff-logo.png.png")} alt="DeGroff Aviation Technologies™" width={220} height={88} priority />
        </a>
        <nav
          className={`hidden items-center gap-8 text-sm font-medium text-brand-dark/70 lg:flex ${
            scrolled ? "text-brand-dark" : ""
          }`}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-brand">
              {link.label}
            </a>
          ))}
          <a
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-dark"
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 text-brand lg:hidden"
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
        className={`lg:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute inset-x-0 top-full bg-white/95 shadow-soft transition`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-base font-medium text-brand-dark/80" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-brand/10 px-4 py-3 text-center transition hover:border-brand hover:bg-brand/5 hover:text-brand-dark"
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