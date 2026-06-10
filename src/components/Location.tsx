"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mainPhoto = {
  src: "/fundo2.png",
  alt: "Equipamentos premium na área de musculação da Academia Imperial",
};

const galleryPhotos = [
  {
    src: "/equipamentos.png",
    alt: "Vista interna da área de musculação da Academia Imperial",
  },
  {
    src: "/fundo.png",
    alt: "Equipamentos de treino de alta performance",
  },
  {
    src: "/fundo8.png",
    alt: "Ambiente de treino da Academia Imperial",
  },
  {
    src: "/fundo5.png",
    alt: "Espaços amplos para musculação e condicionamento",
  },
  {
    src: "/fundo7.png",
    alt: "Estrutura completa da Academia Imperial",
  },
] as const;

const highlights = [
  "Equipamentos premium",
  "Áreas amplas",
  "Ambiente profissional",
];

function GalleryCard({
  photo,
  index,
  visible,
}: {
  photo: (typeof galleryPhotos)[number];
  index: number;
  visible: boolean;
}) {
  const delayClass = `delay-${Math.min((index + 2) * 100, 600)}`;

  return (
    <div
      role="listitem"
      className={`structure-photo-wrap group/card relative aspect-[4/5] w-[72vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[260px] md:w-[280px] lg:w-[300px] ${
        visible ? `animate-scale-in ${delayClass}` : "opacity-0"
      } motion-reduce:transition-none`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        unoptimized
        className="structure-photo structure-photo-hover structure-photo--carousel object-cover object-center motion-reduce:transition-none"
        sizes="(max-width: 640px) 72vw, 300px"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/15 via-transparent to-transparent" />
    </div>
  );
}

export function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < maxScroll - 8);
  }, []);

  const scrollGallery = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('[role="listitem"]');
    const step = firstCard
      ? firstCard.offsetWidth + 16
      : Math.round(el.clientWidth * 0.85);
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !visible) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      ro.disconnect();
    };
  }, [visible, updateScrollState]);

  return (
    <section
      ref={sectionRef}
      id="estrutura"
      aria-labelledby="location-heading"
      className="relative overflow-x-clip bg-[var(--bg-deep)] pt-6 pb-16 sm:pt-8 lg:pt-12 lg:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(217,119,6,0.06)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="ambient-orb pointer-events-none absolute -right-40 top-20 h-[360px] w-[360px] rounded-full opacity-40"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-6 max-w-2xl lg:mb-8">
          <Badge
            variant="neon"
            className={`badge-section w-fit ${
              visible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <span
              className="neon-dot glow-pulse h-1 w-1 rounded-full"
              aria-hidden
            />
            Estrutura
          </Badge>

          <h2
            id="location-heading"
            className={`space-y-0 leading-none ${
              visible ? "animate-slide-up delay-100" : "opacity-0"
            }`}
          >
            <span className="section-title-top section-title-top--lg">
              UMA ESTRUTURA
            </span>
            <span className="section-title-bottom section-title-bottom--lg">
              FEITA PARA SUA EVOLUÇÃO.
            </span>
          </h2>

          <div
            className={`mt-5 flex items-center gap-3 ${
              visible ? "animate-slide-up delay-200" : "opacity-0"
            }`}
            aria-hidden
          >
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>

          <p
            className={`mt-5 max-w-lg text-base font-light leading-relaxed text-zinc-400 sm:text-[1.05rem] ${
              visible ? "animate-slide-up delay-300" : "opacity-0"
            }`}
          >
            Espaços pensados para cada fase do seu treino — do primeiro passo à
            performance máxima.
          </p>

          <div
            className={`mt-6 flex flex-wrap gap-2 ${
              visible ? "animate-slide-up delay-400" : "opacity-0"
            }`}
          >
            {highlights.map((text) => (
              <Badge
                key={text}
                variant="default"
                className="text-[10px] sm:text-[11px] transition-shadow hover:border-amber-800/40 hover:shadow-[0_0_14px_rgba(217,119,6,0.18)]"
              >
                {text}
              </Badge>
            ))}
          </div>
        </div>

        {/* Foto principal — halteres */}
        <div
          className={`structure-photo-wrap structure-photo-wrap--hero group/hero relative mb-6 overflow-hidden rounded-2xl sm:mb-8 ${
            visible ? "animate-scale-in delay-100" : "opacity-0"
          }`}
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[21/9] lg:min-h-[520px]">
            <Image
              src={mainPhoto.src}
              alt={mainPhoto.alt}
              fill
              priority
              unoptimized
              className="structure-photo structure-photo-hover object-cover object-center motion-reduce:transition-none"
              sizes="(max-width: 1024px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Galeria horizontal — fotos arrastáveis */}
        <div className={visible ? "animate-slide-up delay-300" : "opacity-0"}>
          <div className="mb-4 flex items-end justify-between gap-4">
            <p className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Conheça os espaços
            </p>
            <p className="text-[11px] text-zinc-600">
              <span className="sm:hidden">Use as setas ou arraste</span>
              <span className="hidden sm:inline">Arraste ou use as setas</span>
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => scrollGallery("left")}
              disabled={!canScrollLeft}
              aria-label="Ver fotos anteriores"
              className="structure-gallery-nav structure-gallery-nav--left glass-card absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-neon-gold shadow-[0_0_20px_rgba(0,0,0,0.45)] transition-[border-color,box-shadow,opacity,transform] duration-300 hover:border-amber-800/50 hover:shadow-[0_0_24px_rgba(251,191,36,0.45)] active:scale-95 disabled:pointer-events-none disabled:opacity-35 sm:left-4 sm:h-11 sm:w-11"
            >
              <ChevronLeft size={22} strokeWidth={2.5} aria-hidden />
            </button>

            <button
              type="button"
              onClick={() => scrollGallery("right")}
              disabled={!canScrollRight}
              aria-label="Ver próximas fotos"
              className="structure-gallery-nav structure-gallery-nav--right glass-card absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-neon-gold shadow-[0_0_20px_rgba(0,0,0,0.45)] transition-[border-color,box-shadow,opacity,transform] duration-300 hover:border-amber-800/50 hover:shadow-[0_0_24px_rgba(251,191,36,0.45)] active:scale-95 disabled:pointer-events-none disabled:opacity-35 sm:right-4 sm:h-11 sm:w-11"
            >
              <ChevronRight size={22} strokeWidth={2.5} aria-hidden />
            </button>

            <div
              ref={scrollRef}
              className="structure-scroll -mx-6 flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2 active:cursor-grabbing"
              role="list"
              aria-label="Galeria da estrutura da academia"
            >
              {galleryPhotos.map((photo, index) => (
                <GalleryCard
                  key={`${photo.src}-${index}`}
                  photo={photo}
                  index={index}
                  visible={visible}
                />
              ))}
              <div className="w-2 shrink-0 snap-none sm:w-4" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
