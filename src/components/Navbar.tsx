"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getWhatsAppHref } from "@/lib/site-contact";

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "navbar-glass" : "navbar-glass-top"
        }`}
      >
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* ── Logo ── */}
          <a href="#inicio" className="group flex items-center gap-1.5">
            <Image
              src="/icon.png"
              alt="Academia Imperial"
              width={1432}
              height={901}
              unoptimized
              className="navbar-logo-icon h-11 w-auto max-h-12 shrink-0 sm:h-12 sm:max-h-14"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-semibold tracking-[0.2em] text-zinc-400 uppercase sm:text-[10px]">
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
                className="px-4 py-2 text-[13px] font-medium tracking-wide text-zinc-400 transition-colors duration-200 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── CTA + Mobile Toggle ── */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="wpp-gold-pulse btn-shimmer relative hidden overflow-visible rounded-lg bg-amber-600 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-amber-500 md:inline-flex"
            >
              Falar no WhatsApp
            </a>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/20 hover:text-white md:hidden"
            >
              {mobileOpen ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
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
              href={getWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="wpp-gold-pulse block rounded-xl bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
