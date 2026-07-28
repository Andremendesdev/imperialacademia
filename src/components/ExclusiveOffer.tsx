"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, Check, ClipboardCopy, Flame, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const REGULAR_2_MONTHS = 240;
const PROMO_PRICE = 200;
const DISCOUNT_PERCENT = Math.round(
  ((REGULAR_2_MONTHS - PROMO_PRICE) / REGULAR_2_MONTHS) * 100
);

const PIX_KEY = "30384977000110";
const COUNTDOWN_SECONDS = 120;

const COMPROVANTE_WHATSAPP_MESSAGE = `Olá! Acabei de fazer o PIX da promoção exclusiva do site (${DISCOUNT_PERCENT}% off — plano de 2 meses por R$ ${PROMO_PRICE}). Segue o comprovante:`;

export function ExclusiveOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  /* Countdown timer — starts when PIX is copied */
  useEffect(() => {
    if (!pixCopied) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pixCopied]);

  const handleCopyPix = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
    } catch {
      /* Fallback for older browsers */
      const ta = document.createElement("textarea");
      ta.value = PIX_KEY;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setPixCopied(true);
    setSecondsLeft(COUNTDOWN_SECONDS);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = secondsLeft / COUNTDOWN_SECONDS;

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
          {pixCopied
            ? "PIX copiado! Faça o pagamento e envie o comprovante pelo WhatsApp."
            : "Clique no botão abaixo para copiar a chave PIX e efetuar o pagamento."}
        </p>

        <div
          className={`relative mt-8 flex flex-col items-center sm:mt-10 ${
            visible ? "animate-scale-in delay-500" : "opacity-0"
          }`}
        >
          {/* ── PIX copied state ── */}
          {pixCopied ? (
            <div className="flex w-full max-w-md flex-col items-center gap-5">
              {/* PIX key display box */}
              <div className="relative w-full overflow-hidden rounded-xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-amber-400/70 uppercase">
                      Chave PIX (CNPJ)
                    </span>
                    <span className="font-mono text-base font-semibold tracking-wider text-amber-200 sm:text-lg">
                      {PIX_KEY}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-400 transition-colors hover:bg-amber-500/20"
                    aria-label="Copiar chave PIX novamente"
                  >
                    <Check size={14} aria-hidden />
                    Copiado
                  </button>
                </div>

                {/* Countdown progress bar */}
                <div className="relative h-1.5 w-full overflow-hidden bg-white/5">
                  <div
                    className="absolute inset-y-0 left-0 rounded-r-full transition-[width] duration-1000 ease-linear"
                    style={{
                      width: `${progress * 100}%`,
                      background:
                        progress > 0.3
                          ? "linear-gradient(90deg, #d97706, #f59e0b)"
                          : progress > 0.1
                            ? "linear-gradient(90deg, #ea580c, #f97316)"
                            : "linear-gradient(90deg, #dc2626, #ef4444)",
                    }}
                  />
                </div>
              </div>

              {/* Countdown label */}
              <p className="flex items-center gap-2 text-sm text-zinc-400">
                <span
                  className={`font-mono text-base font-bold ${
                    secondsLeft <= 30 ? "text-red-400" : "text-amber-400"
                  }`}
                >
                  {formatTime(secondsLeft)}
                </span>
                {secondsLeft > 0
                  ? "para efetuar o pagamento"
                  : "Tempo expirado — copie novamente"}
              </p>

              {/* WhatsApp CTA for sending receipt */}
              <Button
                asChild
                variant="default"
                size="lg"
                className="offer-cta btn-shimmer wpp-gold-pulse h-14 w-full rounded-xl px-8 text-base font-bold tracking-wide sm:h-[3.75rem] sm:text-lg"
              >
                <WhatsAppLink
                  message={COMPROVANTE_WHATSAPP_MESSAGE}
                  aria-label="Enviar comprovante do PIX no WhatsApp"
                >
                  Enviar comprovante no WhatsApp
                </WhatsAppLink>
              </Button>

              <p className="offer-note max-w-[32ch] text-[11px] leading-relaxed tracking-wide text-zinc-600">
                Após o pagamento, envie o comprovante pelo WhatsApp para confirmar
                sua matrícula com a promoção exclusiva.
              </p>
            </div>
          ) : (
            /* ── Initial state — copy PIX button ── */
            <>
              <div className="offer-arrow mb-3 flex flex-col items-center" aria-hidden>
                <ArrowDown
                  size={18}
                  strokeWidth={2}
                  className="offer-arrow-icon text-amber-400/80"
                />
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={handleCopyPix}
                className="offer-cta btn-shimmer wpp-gold-pulse h-14 w-full max-w-md rounded-xl px-8 text-base font-bold tracking-wide sm:h-[3.75rem] sm:text-lg"
                aria-label="Copiar chave PIX para pagamento"
              >
                <ClipboardCopy size={18} className="mr-1" aria-hidden />
                Copiar chave PIX e pagar
              </Button>

              <p className="offer-note mt-4 max-w-[32ch] text-[11px] leading-relaxed tracking-wide text-zinc-600">
                Promoção exclusiva do site · Pagamento via PIX ·
                Sujeita à disponibilidade
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
