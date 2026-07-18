"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getPlanWhatsAppMessage } from "@/lib/site-contact";

const BASE_MONTHLY_PRICE = 120;

type PlanGroup = "mensal" | "longo";

const baseFeatures = [
  "Acesso à musculação",
  "Horário livre",
] as const;

const plans = [
  {
    label: "Mensal",
    price: 120,
    period: "mensal",
    group: "mensal" as const,
    installments: null,
    popular: false,
    priceNote: "individual" as string | null,
    features: [...baseFeatures],
  },
  {
    label: "Familiar",
    price: 110,
    period: "familiar mensal",
    group: "mensal" as const,
    installments: null,
    popular: false,
    priceNote: "por pessoa" as string | null,
    features: [...baseFeatures],
  },
  {
    label: "Trimestral",
    price: 105,
    period: "trimestral",
    group: "mensal" as const,
    installments: 3,
    popular: false,
    priceNote: null as string | null,
    features: [...baseFeatures, "1 squeeze"],
  },
  {
    label: "Semestral",
    price: 100,
    period: "semestral",
    group: "longo" as const,
    installments: 6,
    popular: false,
    priceNote: null as string | null,
    features: [
      ...baseFeatures,
      "1 avaliação física",
      "1 squeeze",
      "Congelamento de 15 dias",
    ],
  },
  {
    label: "Anual",
    price: 94.9,
    period: "anual",
    group: "longo" as const,
    installments: 12,
    popular: true,
    priceNote: null as string | null,
    features: [
      ...baseFeatures,
      "2 avaliações físicas",
      "1 squeeze",
      "Congelamento de 30 dias",
    ],
  },
] as const;

const fmt = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

function getDiscountPercent(price: number): number | null {
  if (price >= BASE_MONTHLY_PRICE) return null;
  return Math.round(
    ((BASE_MONTHLY_PRICE - price) / BASE_MONTHLY_PRICE) * 100
  );
}

function PlanGroupToggle({
  group,
  onChange,
}: {
  group: PlanGroup;
  onChange: (g: PlanGroup) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Tipo de plano"
      className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1"
    >
      {(
        [
          { id: "mensal" as const, label: "Mensais", hint: null },
          { id: "longo" as const, label: "Longo prazo", hint: "−21%" },
        ] as const
      ).map((option) => {
        const active = group === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/60 sm:px-5 ${
              active
                ? "bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.45)]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {option.label}
            {option.hint && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-amber-950/60 text-amber-400"
                }`}
              >
                {option.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
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
  const planDetail = plan.installments
    ? `${plan.installments}x de ${fmt(plan.price)}/mês`
    : plan.priceNote
      ? `${fmt(plan.price)}/mês — ${plan.priceNote}`
      : `${fmt(plan.price)}/mês`;
  const whatsAppMessage = getPlanWhatsAppMessage(plan.label, planDetail);
  const discount = getDiscountPercent(plan.price);

  return (
    <div
      role="listitem"
      className={`relative flex h-full w-full max-w-md flex-col lg:max-w-none ${
        visible ? `animate-scale-in ${delayClass}` : "opacity-0"
      }`}
    >
      {plan.popular && (
        <div className="pricing-popular-badge absolute -top-3.5 left-1/2 z-[3] -translate-x-1/2">
          <Badge
            variant="neon"
            className="px-3 py-1 text-[9px] font-bold tracking-[0.18em] uppercase shadow-[0_0_14px_rgba(217,119,6,0.4)]"
          >
            Mais popular
          </Badge>
        </div>
      )}

      <div
        className={`pricing-card group/card relative flex h-full w-full flex-col rounded-2xl p-6 motion-reduce:transition-none motion-reduce:hover:transform-none lg:p-7 ${
          plan.popular ? "pricing-card--popular" : ""
        }`}
      >
      <div className="relative z-[1] mb-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="pricing-card-label text-xs font-bold uppercase tracking-[0.22em]">
            {plan.label}
          </p>
          {discount !== null && (
            <span
              className="pricing-discount-badge"
              aria-label={`${discount}% de desconto`}
            >
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

        {plan.installments ? (
          <p className="mt-2 text-[11px] text-zinc-500">
            {plan.installments}x de{" "}
            <span className="font-semibold text-amber-300/90">
              {fmt(plan.price)}
            </span>
          </p>
        ) : plan.priceNote ? (
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-amber-300/90">
            {plan.priceNote}
          </p>
        ) : null}
      </div>

      <div className="pricing-card-divider relative z-[1] mb-6" aria-hidden />

      <ul
        className="relative z-[1] mb-7 flex flex-col gap-2.5"
        role="list"
        aria-label={`Itens incluídos no plano ${plan.label}`}
      >
        {plan.features.map((feature) => (
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
        <Button
          asChild
          variant={plan.popular ? "default" : "outline"}
          size="lg"
          className={`w-full ${plan.popular ? "wpp-gold-pulse" : ""}`}
        >
          <WhatsAppLink
            message={whatsAppMessage}
            aria-label={`Falar no WhatsApp — plano ${plan.label}`}
          >
            Falar no WhatsApp
          </WhatsAppLink>
        </Button>
      </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [group, setGroup] = useState<PlanGroup>("mensal");

  const visiblePlans = plans.filter((plan) => plan.group === group);
  const hasPopular = visiblePlans.some((plan) => plan.popular);

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
        className="ambient-orb pointer-events-none absolute -right-32 bottom-1/4 h-[320px] w-[320px] rounded-full opacity-35"
        aria-hidden
      />
      <div
        className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`mb-8 max-w-2xl lg:mb-10 ${visible ? "animate-slide-up" : "opacity-0"}`}
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
          className={`mb-8 flex justify-center ${visible ? "animate-fade-in delay-100" : "opacity-0"}`}
        >
          <PlanGroupToggle group={group} onChange={setGroup} />
        </div>

        <div
          key={group}
          className={`mx-auto grid max-w-md grid-cols-1 gap-6 md:max-w-none md:grid-cols-2 xl:items-stretch xl:gap-5 ${
            visiblePlans.length === 3
              ? "xl:grid-cols-3"
              : "xl:mx-auto xl:max-w-4xl xl:grid-cols-2"
          } ${hasPopular ? "pt-4" : "pt-2"}`}
          role="list"
          aria-label={
            group === "mensal"
              ? "Planos mensais da Academia Imperial"
              : "Planos de longo prazo da Academia Imperial"
          }
        >
          {visiblePlans.map((plan, index) => (
            <PricingCard
              key={plan.label}
              plan={plan}
              index={index}
              visible={visible}
            />
          ))}
        </div>

        <div
          className={`mt-8 space-y-2 text-center text-sm font-light text-zinc-500 ${
            visible ? "animate-fade-in delay-700" : "opacity-0"
          }`}
        >
        
         
          <p>Sem compromisso — escolha o plano e continue a conversa no WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}
