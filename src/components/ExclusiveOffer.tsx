"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Flame, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const REGULAR_2_MONTHS = 240;
const PROMO_PRICE = 200;
const DISCOUNT_PERCENT = Math.round(
  ((REGULAR_2_MONTHS - PROMO_PRICE) / REGULAR_2_MONTHS) * 100
);

const OFFER_WHATSAPP_MESSAGE = `Olá! Vi a promoção exclusiva do site (${DISCOUNT_PERCENT}% off) e gostaria de garantir o plano de 2 meses por R$ ${PROMO_PRICE} (de R$ ${REGULAR_2_MONTHS}).`;

export function ExclusiveOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="oferta"
      aria-labelledby="offer-heading"
      className="offer-section relative overflow-x-clip bg-[var(--bg-deep)] py-16 sm:py-20 lg:py-24"
    >
      <div
        className="offer-ambient pointer-events-none absolute left-1/2 top-1/2 h-[min(520px,80vw)] w-[min(520px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-12">
        <div
          className={`flex flex-col items-center ${
            visible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <Badge variant="neon" className="offer-badge w-fit gap-1.5 px-3 py-1.5">
            <Flame size={12} className="text-amber-400" aria-hidden />
            −{DISCOUNT_PERCENT}% · Oferta por tempo limitado
          </Badge>

          <h2
            id="offer-heading"
            className="offer-title mt-5 flex flex-col items-center gap-2 sm:mt-6"
          >
            <span className="offer-title-icon inline-flex items-center justify-center rounded-full border border-amber-500/25 bg-amber-950/30 p-2.5 text-amber-400">
              <Gift size={22} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="section-title-top text-balance">
              OFERTA EXCLUSIVA
            </span>
            <span className="section-title-bottom text-balance">
              PARA VISITANTES DO SITE.
            </span>
          </h2>

          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>
        </div>

        <div
          className={`offer-pricing mt-7 flex flex-col items-center gap-2 sm:mt-8 ${
            visible ? "animate-fade-in delay-200" : "opacity-0"
          }`}
        >
          <p className="offer-discount-label text-xs font-semibold tracking-[0.2em] text-amber-400/90 uppercase">
            {DISCOUNT_PERCENT}% de desconto
          </p>
          <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
            <span className="offer-price-old" aria-label={`De R$ ${REGULAR_2_MONTHS}`}>
              R$&nbsp;{REGULAR_2_MONTHS}
            </span>
            <span className="offer-price" aria-label={`Por R$ ${PROMO_PRICE}`}>
              R$&nbsp;{PROMO_PRICE}
            </span>
          </div>
          <p className="text-sm font-light text-zinc-400">
            em <span className="offer-period">2&nbsp;meses</span>
          </p>
        </div>

        <p
          className={`offer-lead mx-auto mt-5 max-w-[42ch] text-base font-light leading-relaxed text-zinc-300 sm:text-lg ${
            visible ? "animate-fade-in delay-300" : "opacity-0"
          }`}
        >
          De{" "}
          <span className="font-medium text-zinc-400 line-through decoration-zinc-500">
            R$&nbsp;{REGULAR_2_MONTHS}
          </span>{" "}
          por apenas{" "}
          <span className="font-semibold text-amber-300">R$&nbsp;{PROMO_PRICE}</span>{" "}
          — cupom exclusivo disponível somente para quem acessa nosso site.
        </p>

        <p
          className={`mx-auto mt-4 max-w-[36ch] text-sm font-light leading-relaxed text-zinc-500 ${
            visible ? "animate-fade-in delay-400" : "opacity-0"
          }`}
        >
          Clique no botão abaixo e fale com nossa equipe pelo WhatsApp para
          garantir sua promoção exclusiva.
        </p>

        <div
          className={`relative mt-8 flex flex-col items-center sm:mt-10 ${
            visible ? "animate-scale-in delay-500" : "opacity-0"
          }`}
        >
          <div className="offer-arrow mb-3 flex flex-col items-center" aria-hidden>
            <ArrowDown
              size={18}
              strokeWidth={2}
              className="offer-arrow-icon text-amber-400/80"
            />
          </div>

          <Button
            asChild
            variant="default"
            size="lg"
            className="offer-cta btn-shimmer wpp-gold-pulse h-14 w-full max-w-md rounded-xl px-8 text-base font-bold tracking-wide sm:h-[3.75rem] sm:text-lg"
          >
            <WhatsAppLink
              message={OFFER_WHATSAPP_MESSAGE}
              aria-label="Garantir promoção exclusiva no WhatsApp"
            >
              Quero garantir minha promoção
            </WhatsAppLink>
          </Button>

          <p className="offer-note mt-4 max-w-[32ch] text-[11px] leading-relaxed tracking-wide text-zinc-600">
            Promoção exclusiva do site · Válida mediante confirmação no
            WhatsApp · Sujeita à disponibilidade
          </p>
        </div>
      </div>
    </section>
  );
}
