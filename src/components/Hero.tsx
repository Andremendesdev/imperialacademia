"use client";

import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  Shield,
  Zap,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getWhatsAppHref } from "@/lib/site-contact";

const stats = [
  { value: "+1.200", label: "Alunos Ativos" },
  { value: "8 Anos", label: "De Excelência" },
  { value: "4.9", label: "Avaliação", icon: true },
];

const trustBadges = [
  { icon: Dumbbell, text: "+200 Equipamentos", short: "+200 equip." },
  { icon: Shield, text: "Equipamentos premium", short: "Premium" },
  { icon: Zap, text: "Acomp. profissional", short: "Acomp." },
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative min-h-dvh overflow-x-hidden bg-[var(--bg-deep)]"
    >
      {/* ── fundo mobile / desktop ── */}
      <div
        className="hero-bg-mobile absolute inset-0 min-h-dvh lg:hidden"
        style={{ backgroundImage: "url(/fundo7.png)" }}
        aria-hidden
      />
      <div
        className="hero-bg-mobile absolute inset-0 hidden min-h-dvh lg:block"
        style={{ backgroundImage: "url(/fundo2.png)" }}
        aria-hidden
      />

      {/* ── Escurecimento para leitura do texto ── */}
      <div className="hero-bg-scrim pointer-events-none absolute inset-0 min-h-dvh" aria-hidden />
      <div
        className="hero-bg-content-scrim pointer-events-none absolute inset-0 min-h-dvh"
        aria-hidden
      />

      {/* ── Overlay dourado ── */}
      <div
        className="pointer-events-none absolute inset-0 min-h-dvh"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_18%_28%,rgba(217,119,6,0.08)_0%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_85%_70%,rgba(251,191,36,0.03)_0%,transparent_50%)]" />
      </div>

      {/* ── Atmospheric layers ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_4%_6%,rgba(8,10,35,0.42)_0%,transparent_65%)] max-lg:bg-[radial-gradient(ellipse_55%_50%_at_4%_6%,rgba(8,10,35,0.32)_0%,transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_45%,transparent_32%,rgba(0,0,0,0.80)_100%)] max-lg:bg-[radial-gradient(ellipse_85%_85%_at_50%_45%,transparent_38%,rgba(0,0,0,0.72)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg-deep)]/75 to-transparent sm:h-56 sm:from-[var(--bg-deep)]"
        aria-hidden
      />
      <div className="grain-overlay z-0 opacity-22" aria-hidden />

      {/* ── Decorative depth (tons neutros) ── */}
      <div
        className="ambient-orb pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full"
        aria-hidden
      />
      <div
        className="ambient-orb pointer-events-none absolute -left-24 bottom-1/4 h-[280px] w-[280px] rounded-full opacity-50"
        aria-hidden
      />
      {/* ── Content ── */}
      <div className="relative z-10 flex min-h-dvh w-full flex-col pt-[70px] pb-6 sm:pb-6 md:items-start lg:pt-[calc(70px+2.5rem)] lg:pb-8">
        <div className="mx-auto w-full max-w-7xl px-6 pt-14 pb-36 sm:py-12 sm:pb-10 lg:px-12 lg:pb-10 lg:pt-0">
          <div className="flex flex-col gap-5 max-sm:gap-6 lg:grid lg:grid-cols-[minmax(0,48rem)_auto] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-10 lg:gap-y-5">
            <div className="flex max-w-3xl flex-col gap-5 sm:gap-5 lg:col-start-1 lg:row-start-1 lg:gap-6">
              <Badge
                variant="neon"
                className="badge-section hero-badge-soft animate-slide-up w-fit self-center sm:self-start !shadow-[0_0_6px_rgba(251,191,36,0.06)]"
              >
                <span
                  className="neon-dot glow-pulse rounded-full"
                  aria-hidden
                />
                <span className="sm:hidden">Melhor academia de Piraju</span>
                <span className="hidden sm:inline">
                  Academia Imperial · Melhor Academia de Piraju
                </span>
              </Badge>

              <div className="flex flex-col gap-0.5 max-sm:items-center sm:gap-1">
                <h1
                  id="hero-heading"
                  className="animate-slide-in-left delay-100 flex flex-col gap-2 leading-none max-sm:items-center max-sm:text-center sm:gap-2.5"
                >
                  <span className="hero-title-welcome flex items-center justify-center gap-2 font-sans text-[clamp(0.75rem,2.4vw,1rem)] font-semibold uppercase tracking-[0.35em] text-amber-400/75 sm:justify-start">
                    <span className="hero-eyebrow-line hidden sm:inline-block" aria-hidden />
                    Bem-vindo à
                    <span className="hero-eyebrow-line hidden sm:inline-block" aria-hidden />
                  </span>

                  <span className="relative inline-flex flex-col items-center gap-1.5 sm:items-start sm:gap-2">
                    <span
                      className="hero-title-glow-bg pointer-events-none absolute inset-x-0 bottom-[-8%] top-[-6%]"
                      aria-hidden
                    />
                    <span className="hero-title-line hero-title-imperial relative text-white">
                      Academia
                    </span>
                    <span className="hero-title-line hero-title-imperial-accent">
                      Imperial
                    </span>
                  </span>
                </h1>

                <div
                  className="animate-fade-in delay-300 flex items-center justify-center gap-3 sm:justify-start"
                  aria-hidden
                >
                  <div className="neon-gold-line h-px w-10" />
                  <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
                  <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
                </div>
              </div>

              <p className="hero-lead animate-slide-up delay-400 max-w-[27rem] text-base font-light leading-[1.75] text-zinc-300 sm:text-[1.05rem]">
                Treinos personalizados, equipamentos modernos e resultados reais.
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:justify-end lg:col-start-2 lg:row-start-2 lg:w-auto lg:items-end lg:justify-end lg:self-end">
              <div className="animate-hero-btn-in delay-600 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="hero-btn hero-btn-primary wpp-gold-pulse group w-full rounded-lg font-bold sm:w-auto"
                >
                  <a
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-center"
                  >
                    Começar Agora
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </Button>
              </div>
              <div className="animate-hero-btn-in delay-700 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="hero-btn hero-btn-secondary hero-btn-secondary--compact w-full rounded-lg !bg-transparent font-bold !shadow-none backdrop-blur-none hover:!bg-transparent hover:!shadow-none sm:w-auto"
                >
                  <Link href="#estrutura" className="w-full justify-center">
                    Ver fotos da Academia
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex max-w-3xl flex-col gap-5 max-sm:-mt-3 max-sm:gap-4 sm:gap-5 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:gap-6">
              <div
                className="hero-trust-scroll animate-slide-up delay-900 mx-auto grid w-full max-w-xl grid-cols-3 gap-1.5 sm:gap-3 lg:mx-0 lg:justify-start"
                role="list"
                aria-label="Diferenciais da academia"
              >
                {trustBadges.map(({ icon: Icon, text, short }) => (
                  <div key={text} role="listitem" className="hero-trust-card">
                    <Icon
                      className="neon-icon-gold size-3 shrink-0 sm:size-3.5"
                      aria-hidden
                    />
                    <span className="whitespace-normal sm:hidden">{short}</span>
                    <span className="hidden whitespace-normal sm:inline">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="animate-slide-up delay-1000 mx-auto grid w-full max-w-xl grid-cols-3 divide-x divide-zinc-800/60 border-t border-amber-900/15 pt-4 text-center shadow-[0_-1px_12px_rgba(217,119,6,0.04)] sm:pt-6 lg:mx-0 lg:justify-start lg:border-0 lg:pt-1 lg:shadow-none"
                role="list"
                aria-label="Indicadores da academia"
              >
                {stats.map(({ value, label, icon }) => (
                  <div
                    key={label}
                    role="listitem"
                    className="flex min-w-0 flex-col items-center gap-0.5 px-2 sm:min-w-[100px] sm:items-start sm:px-5 sm:text-left first:sm:pl-0 last:sm:pr-0"
                  >
                    <span className="flex items-center justify-center gap-1 text-base font-semibold tracking-tight text-white max-sm:leading-tight sm:text-xl">
                      {value}
                      {icon && (
                        <Star
                          size={14}
                          className="fill-amber-400/90 text-amber-400/90 drop-shadow-[0_0_2px_rgba(251,191,36,0.2)]"
                          aria-label="estrelas"
                        />
                      )}
                    </span>
                    <span className="text-[9px] font-medium uppercase leading-tight tracking-wide text-zinc-600 max-sm:whitespace-nowrap sm:text-[11px] sm:tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a
          href="#estrutura"
          className="group/explore animate-fade-in delay-1100 mt-2 hidden flex-col items-center gap-0.5 self-center text-zinc-600 transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/50 rounded-lg px-1 sm:flex lg:absolute lg:bottom-10 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 lg:gap-1.5 lg:px-2"
          aria-label="Rolar para conhecer a estrutura"
        >
          <span className="text-[8px] font-semibold tracking-[0.22em] uppercase sm:text-[9px] lg:text-[11px] lg:tracking-[0.26em]">
            Explorar
          </span>
          <div className="explore-scroll-track lg:h-6" aria-hidden />
          <ChevronDown
            size={13}
            className="neon-icon-gold explore-scroll-bounce opacity-80 group-hover/explore:opacity-100 lg:hidden"
            aria-hidden
          />
          <ChevronDown
            size={18}
            className="neon-icon-gold explore-scroll-bounce hidden opacity-80 group-hover/explore:opacity-100 lg:block"
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
}
