"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative min-h-dvh overflow-hidden bg-[var(--bg-deep)]"
    >
      {/* Imagem de fundo — zoom cinematográfico lento na entrada */}
      <div className="absolute inset-0 min-h-dvh overflow-hidden" aria-hidden>
        <div
          className="hero-bg-media hero-bg-mobile absolute inset-0 lg:hidden"
          style={{ backgroundImage: "url(/fundo7.png)" }}
        />
        <div
          className="hero-bg-media hero-bg-mobile absolute inset-0 hidden lg:block"
          style={{ backgroundImage: "url(/fundo2.png)" }}
        />
      </div>

      {/* Camadas de profundidade */}
      <div className="hero-bg-scrim pointer-events-none absolute inset-0 min-h-dvh" aria-hidden />
      <div
        className="hero-side-scrim pointer-events-none absolute inset-0 hidden min-h-dvh lg:block"
        aria-hidden
      />
      <div
        className="hero-bg-content-scrim pointer-events-none absolute inset-0 min-h-dvh"
        aria-hidden
      />
      <div className="hero-gold-light pointer-events-none absolute inset-0 min-h-dvh" aria-hidden />
      <div className="hero-vignette pointer-events-none absolute inset-0 min-h-dvh" aria-hidden />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-1" aria-hidden />
      <div className="hero-bg-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-2" aria-hidden />

      <div className="relative z-10 flex min-h-dvh flex-col pt-[70px] pb-10 sm:pb-12 lg:pt-[calc(70px+2rem)] lg:pb-16">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 lg:px-12">
          <div className="hero-content relative flex max-w-2xl flex-col gap-6 sm:gap-7 max-sm:mx-auto max-sm:items-center max-sm:text-center lg:items-start lg:text-left">
            {/* Régua vertical decorativa — desktop */}
            <div
              className="hero-frame-line animate-fade-in delay-500 absolute -left-8 top-1 bottom-1 hidden w-px xl:block"
              aria-hidden
            />

            <h1
              id="hero-heading"
              className="hero-heading animate-slide-in-left delay-100 flex flex-col gap-1 leading-none sm:gap-1.5"
            >
              <span className="hero-title-line hero-title-imperial text-white">
                Academia
              </span>
              <span className="hero-title-line hero-title-imperial-accent">
                Imperial
              </span>
            </h1>

            {/* Linha de acento dourada — assinatura visual das seções */}
            <div
              className="animate-fade-in delay-300 -my-1 flex items-center gap-3 max-sm:justify-center"
              aria-hidden
            >
              <div className="hero-accent-line h-px w-12" />
              <div className="hero-accent-dot h-[3px] w-[3px] rounded-full" />
              <div className="hero-accent-line--fade h-px w-5" />
            </div>

            <p className="hero-lead animate-slide-up delay-200 max-w-[38ch] text-base font-light leading-[1.75] sm:text-[1.05rem]">
              Academia completa perto de você em Piraju — equipamentos,
              acompanhamento e planos claros.
            </p>

            <div className="hero-actions animate-hero-btn-in delay-400 mt-1 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
              <WhatsAppLink className="hero-btn hero-btn-primary wpp-gold-pulse group inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg px-9 text-base font-bold sm:w-auto">
                Começar Agora
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden
                />
              </WhatsAppLink>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hero-btn hero-btn-secondary hero-btn-secondary--compact w-full rounded-lg sm:w-auto"
              >
                <Link href="#estrutura" className="w-full justify-center">
                  Ver fotos da Academia
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Indicador de rolagem — discreto, desktop */}
        <div
          className="hero-scroll-cue animate-fade-in delay-1000 absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block"
          aria-hidden
        />
      </div>
    </section>
  );
}
