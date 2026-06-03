"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início",     href: "#inicio"    },
  { label: "Planos",     href: "#planos"    },
  { label: "Estrutura",  href: "#estrutura" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Resultados", href: "#resultados"},
  { label: "Contato",    href: "#contato"   },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`navbar-neon-border fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "navbar-glass" : "navbar-glass-top"
        }`}
      >
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* ── Logo ── */}
          <a href="#inicio" className="group flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="Academia Imperial"
              width={1432}
              height={901}
              unoptimized
              className="navbar-logo-icon h-11 w-auto max-h-12 shrink-0 sm:h-12 sm:max-h-[3.25rem]"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                Academia
              </span>
              <span className="font-display text-lg tracking-[0.06em] text-white sm:text-xl">
                IMPERIAL
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-zinc-400 transition-colors duration-200 hover:text-white group"
              >
                {label}
                <span className="neon-gold-line absolute inset-x-4 bottom-1.5 h-px scale-x-0 transition-transform duration-200 group-hover:scale-x-100 origin-left" />
              </a>
            ))}
          </nav>

          {/* ── CTA + Mobile Toggle ── */}
          <div className="flex items-center gap-3">
            <a
              href="#planos"
              className="neon-gold-soft btn-shimmer relative hidden overflow-hidden rounded-lg bg-amber-600 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white shadow-[0_0_18px_rgba(217,119,6,0.45)] transition-all duration-300 hover:bg-amber-500 hover:shadow-[0_0_32px_rgba(217,119,6,0.65)] md:inline-flex"
            >
              Começar Agora
            </a>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
              className="navbar-menu-btn flex h-10 w-10 items-center justify-center rounded-lg border border-amber-600/25 bg-white/5 transition-colors hover:border-amber-600/40 md:hidden"
            >
              {mobileOpen ? (
                <X size={18} className="navbar-menu-icon" />
              ) : (
                <Menu size={18} className="navbar-menu-icon" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed inset-x-0 top-[70px] z-40 transition-all duration-500 ease-out md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-3"
        }`}
      >
        <div className="navbar-glass mx-4 rounded-2xl p-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-3 border-t border-white/5 pt-3">
            <a
              href="#planos"
              className="block rounded-xl bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Começar Agora
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
