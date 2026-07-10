"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const features = [
  "Acesso à musculação",
  "Horário livre",
  "App de treinos",
  "Avaliação física",
] as const;

const BASE_MONTHLY_PRICE = 180;

const plans = [
  {
    label: "Mensal",
    price: 180,
    period: "mensal",
    totalLabel: null,
  },
  {
    label: "Trimestral",
    price: 170,
    period: "trimestral",
    totalLabel: "trimestre" as const,
    totalMultiplier: 3,
  },
  {
    label: "Anual",
    price: 150,
    period: "anual",
    totalLabel: "ano" as const,
    totalMultiplier: 12,
  },
] as const;

const fmt = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);

function getDiscountPercent(price: number): number | null {
  if (price >= BASE_MONTHLY_PRICE) return null;
  return Math.round(
    ((BASE_MONTHLY_PRICE - price) / BASE_MONTHLY_PRICE) * 100
  );
}

function PricingCard({
  plan,
  index,
  visible,
}: {
  plan: (typeof plans)[number];
  index: number;
  visible: boolean;
}) {
  const delayClass = `delay-${Math.min((index + 1) * 100, 600)}`;
  const whatsAppMessage = `Olá! Vim pelo site da Academia Imperial e quero o plano Imperial (${plan.period}). Pode me ajudar?`;

  const billedTotal =
    "totalMultiplier" in plan && plan.totalMultiplier
      ? `${fmt(plan.price * plan.totalMultiplier)}/${plan.totalLabel}`
      : null;
  const discount = getDiscountPercent(plan.price);

  return (
    <div
      role="listitem"
      className={`pricing-card group/card relative flex w-full max-w-md flex-col rounded-2xl p-6 motion-reduce:transition-none motion-reduce:hover:transform-none lg:p-8 ${
        visible ? `animate-scale-in ${delayClass}` : "opacity-0"
      }`}
    >
      <div className="relative z-[1] mb-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="pricing-card-label text-xs font-bold uppercase tracking-[0.22em]">
            {plan.label}
          </p>
          {discount !== null && (
            <span className="pricing-discount-badge" aria-label={`${discount}% de desconto`}>
              -{discount}%
            </span>
          )}
        </div>

        <div className="mb-3 flex items-center gap-3" aria-hidden>
          <div className="neon-gold-line h-px w-8" />
          <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
          <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
        </div>

        <div className="flex items-end gap-1">
          <span className="pricing-price font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-tight">
            {fmt(plan.price)}
          </span>
          <span className="mb-1.5 text-sm font-medium text-amber-400/70">/mês</span>
        </div>

        {billedTotal && (
          <p className="mt-2 text-[11px] text-zinc-500">
            cobrado em{" "}
            <span className="font-semibold text-amber-300/90">{billedTotal}</span>
          </p>
        )}
      </div>

      <div className="pricing-card-divider relative z-[1] mb-6" aria-hidden />

      <ul
        className="relative z-[1] mb-7 flex flex-col gap-2.5"
        role="list"
        aria-label={`Itens incluídos no plano ${plan.label}`}
      >
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              size={15}
              className="neon-icon-gold mt-0.5 shrink-0"
              aria-hidden
            />
            <span className="text-sm leading-snug text-zinc-200">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-[1] mt-auto">
        <Button asChild variant="default" size="lg" className="wpp-gold-pulse w-full">
          <WhatsAppLink
            message={whatsAppMessage}
            aria-label={`Falar no WhatsApp — plano ${plan.label}`}
          >
            Falar no WhatsApp
          </WhatsAppLink>
        </Button>
      </div>
    </div>
  );
}

export function Pricing() {
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="planos"
      aria-labelledby="pricing-heading"
      className="relative overflow-x-clip bg-[var(--bg-deep)] py-16 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(217,119,6,0.07)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="ambient-orb pointer-events-none absolute -right-32 bottom-1/4 h-[320px] w-[320px] rounded-full opacity-35"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`mb-10 max-w-2xl lg:mb-12 ${visible ? "animate-slide-up" : "opacity-0"}`}
        >
          <Badge variant="section" className="badge-section w-fit">
            <span className="badge-section-dot" aria-hidden />
            Planos
          </Badge>

          <h2 id="pricing-heading" className="space-y-0 leading-none">
            <span className="section-title-top">ESCOLHA SEU PLANO.</span>
            <span className="section-title-bottom">INVISTA EM VOCÊ.</span>
          </h2>

          <div className="mt-4 flex items-center gap-3" aria-hidden>
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>
        </div>

        <div
          className="mx-auto flex max-w-md flex-col gap-6"
          role="list"
          aria-label="Planos da Academia Imperial"
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.label}
              plan={plan}
              index={index}
              visible={visible}
            />
          ))}
        </div>

        <p
          className={`mt-8 text-center text-sm font-light text-zinc-500 ${
            visible ? "animate-fade-in delay-700" : "opacity-0"
          }`}
        >
          Sem compromisso — escolha o plano e continue a conversa no WhatsApp.
        </p>
      </div>
    </section>
  );
}
