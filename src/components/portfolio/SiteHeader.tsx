"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#ao-vivo", label: "Ao vivo" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#casas", label: "Restaurantes e Bares" },
  { href: "#contratacao", label: "Contratação" },
  { href: "#especiais", label: "Especiais" },
  { href: "#contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--cream)]/10 bg-[color-mix(in_oklab,var(--stage)_90%,black_10%)] backdrop-blur-md">
      <div className="section-shell flex h-14 items-center justify-between gap-4 md:h-16">
        <a
          href="#inicio"
          className="font-[family-name:var(--font-fraunces)] text-lg font-bold tracking-tight text-[var(--cream)] transition-colors hover:text-[var(--highlight)] md:text-xl"
          onClick={() => setOpen(false)}
        >
          Kaell Ferreira
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Seções">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2.5 py-2 text-sm font-semibold text-[var(--cream)]/80 transition-colors hover:text-[var(--highlight)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-[var(--cream)]/20 text-[var(--cream)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="text-xl leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--cream)]/10 bg-[color-mix(in_oklab,var(--stage)_94%,black_6%)] px-5 py-4 lg:hidden"
          aria-label="Seções"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex min-h-11 items-center text-base font-semibold text-[var(--cream)] transition-colors hover:text-[var(--highlight)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
