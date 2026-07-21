"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { onLoadingReveal } from "@/lib/loading-reveal";
import { siteContact } from "@/lib/site-contact";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const HERO_SLIDES = [
  {
    src: "/galeria-1.png",
    alt: "Racks de agachamento e área de musculação da Academia Imperial",
  },
  {
    src: "/galeria-2.png",
    alt: "Estante de halteres na Academia Imperial",
  },
  {
    src: "/galeria-3.png",
    alt: "Equipamentos de musculação e estrutura da Academia Imperial",
  },
] as const;

const SLIDE_MS = 5000;
const FADE_MS = 1200;
/** Tempo mínimo de zoom antes de mostrar o slide (evita flash estático). */
const ZOOM_WARMUP_MS = 180;

export function Hero() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [firstReady, setFirstReady] = useState(false);
  const [zoomLive, setZoomLive] = useState(false);
  const activeRef = useRef(0);
  const warmupRef = useRef<number | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const unsub = onLoadingReveal(() => setRevealed(true));
    const fallback = window.setTimeout(() => setRevealed(true), 4500);
    return () => {
      unsub();
      window.clearTimeout(fallback);
    };
  }, []);

  // Fallback se onLoadingComplete não disparar (cache / race)
  useEffect(() => {
    const t = window.setTimeout(() => setFirstReady(true), 2200);
    return () => window.clearTimeout(t);
  }, []);

  // Assim que a 1ª foto carrega, inicia o zoom (ainda atrás do loading)
  useEffect(() => {
    if (!firstReady) return;

    if (reduceMotion) {
      setZoomLive(true);
      return;
    }

    // Dois frames garantem que a animação CSS já está rodando antes de aparecer
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        warmupRef.current = window.setTimeout(() => {
          setZoomLive(true);
        }, ZOOM_WARMUP_MS);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      if (warmupRef.current !== null) window.clearTimeout(warmupRef.current);
    };
  }, [firstReady, reduceMotion]);

  // Ciclo de slides começa com o zoom vivo (não espera o loading acabar)
  useEffect(() => {
    if (!zoomLive || reduceMotion) return;
    const id = window.setInterval(() => {
      const current = activeRef.current;
      const next = (current + 1) % HERO_SLIDES.length;
      setLeaving(current);
      setActive(next);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [zoomLive, reduceMotion]);

  useEffect(() => {
    if (leaving === null) return;
    const id = window.setTimeout(() => setLeaving(null), FADE_MS);
    return () => window.clearTimeout(id);
  }, [leaving]);

  const slideshowReady = zoomLive || reduceMotion;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative h-dvh min-h-dvh overflow-hidden bg-[var(--bg-deep)]"
    >
      <div
        className={`hero-slideshow absolute inset-0 overflow-hidden${
          slideshowReady ? " is-ready" : ""
        }`}
        aria-hidden
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = reduceMotion
            ? index === 0
            : firstReady && index === active;
          const isLeaving = !reduceMotion && index === leaving;
          return (
            <div
              key={slide.src}
              className={`hero-kb-slide${isActive ? " is-active" : ""}${isLeaving ? " is-leaving" : ""}`}
              data-pan={index % 3}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="hero-kb-image"
                onLoadingComplete={() => {
                  if (index === 0) setFirstReady(true);
                }}
              />
            </div>
          );
        })}
        <div className="hero-grade hero-grade-shadows" />
        <div className="hero-grade hero-grade-highlights" />
        <div className="hero-grade hero-grade-warm" />
        <div className="hero-grade hero-grade-contrast" />
        <div className="hero-cinematic-bloom" />
        <div className="hero-film-grain" />
        <div className="hero-letterbox" />
      </div>

      <div className="hero-bg-scrim pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="hero-side-scrim pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
      />
      <div
        className="hero-bg-content-scrim pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-1" aria-hidden />
      <div className="hero-bg-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-2" aria-hidden />

      <div className="relative z-10 flex h-full min-h-0 flex-col pt-[70px] pb-12 sm:pb-14 lg:pt-[calc(70px+2rem)] lg:pb-16">
        <div
          className={`absolute top-[calc(70px+0.75rem)] right-5 z-20 flex flex-col items-center gap-2.5 sm:top-[calc(70px+1rem)] sm:right-8 sm:flex-row sm:gap-3 lg:top-[calc(70px+1.5rem)] lg:right-12 ${
            revealed ? "animate-fade-in delay-300" : "opacity-0"
          }`}
        >
          <a
            href={siteContact.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Academia Imperial"
            className="hero-social-link"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={siteContact.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook da Academia Imperial"
            className="hero-social-link"
          >
            <FacebookIcon size={18} />
          </a>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 lg:px-12">
          {/* key força remount — animações CSS só começam depois do loading */}
          <div
            key={revealed ? "hero-revealed" : "hero-waiting"}
            className={`hero-content relative flex max-w-2xl flex-col gap-6 sm:gap-7 max-sm:mx-auto max-sm:items-center max-sm:text-center lg:items-start lg:text-left ${
              revealed ? "" : "pointer-events-none opacity-0"
            }`}
          >
            {revealed && (
              <>
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
              </>
            )}
          </div>
        </div>

        {revealed && (
          <div
            className="hero-scroll-cue animate-fade-in delay-1000 absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block"
            aria-hidden
          />
        )}
      </div>
    </section>
  );
}
