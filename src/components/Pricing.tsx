"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Billing = "monthly" | "annual";

const plans = [
  {
    name: "Básico",
    monthly: 89,
    annual: 890,
    popular: false,
    features: [
      "Acesso à musculação",
      "Horário livre",
      "App de treinos",
    ],
    cta: "Assinar",
  },
  {
    name: "Médio",
    monthly: 129,
    annual: 1290,
    popular: true,
    features: [
      "Tudo do Básico",
      "Avaliação física",
      "Treino personalizado 1x/mês",
    ],
    cta: "Assinar",
  },
  {
    name: "Avançado",
    monthly: 179,
    annual: 1790,
    popular: false,
    features: [
      "Tudo do Médio",
      "Personal 2x/semana",
      "Plano nutricional",
      "Acesso VIP",
    ],
    cta: "Assinar",
  },
] as const;

const fmt = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Período de cobrança"
      className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1"
    >
      {(["monthly", "annual"] as Billing[]).map((b) => {
        const active = billing === b;
        return (
          <button
            key={b}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(b)}
            className={`relative flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/60 ${
              active
                ? "bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.45)]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {b === "monthly" ? "Mensal" : "Anual"}
            {b === "annual" && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-amber-950/60 text-neon-gold"
                }`}
              >
                -17%
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
  billing,
  index,
  visible,
}: {
  plan: (typeof plans)[number];
  billing: Billing;
  index: number;
  visible: boolean;
}) {
  const delayClass = `delay-${Math.min((index + 2) * 100, 600)}`;
  const price = billing === "monthly" ? plan.monthly : plan.annual;
  const suffix = billing === "monthly" ? "/mês" : "/ano";

  return (
    <div
      role="listitem"
      className={`group/card relative flex flex-col rounded-2xl border p-6 transition-[border-color,box-shadow,transform] duration-500 motion-reduce:transition-none lg:p-7 ${
        plan.popular
          ? "border-amber-600/60 bg-amber-950/20 shadow-[0_0_40px_rgba(217,119,6,0.2)] lg:scale-[1.03]"
          : "glass-card border-white/8 hover:border-amber-800/40 hover:shadow-[0_0_28px_rgba(217,119,6,0.15)]"
      } ${visible ? `animate-scale-in ${delayClass}` : "opacity-0"}`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge
            variant="neon"
            className="px-3 py-1 text-[9px] font-bold tracking-[0.18em] uppercase shadow-[0_0_14px_rgba(217,119,6,0.4)]"
          >
            Mais popular
          </Badge>
        </div>
      )}

      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {plan.name}
        </p>

        <div
          key={`${plan.name}-${billing}`}
          className="flex items-end gap-1 animate-fade-in"
        >
          <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-tight text-[var(--white-neon)]">
            {fmt(price)}
          </span>
          <span className="mb-1.5 text-sm text-zinc-500">{suffix}</span>
        </div>

        {billing === "annual" && (
          <p className="mt-1.5 text-[11px] text-zinc-500">
            equivale a{" "}
            <span className="font-semibold text-zinc-300">
              {fmt(Math.round(price / 12))}/mês
            </span>
          </p>
        )}
      </div>

      <ul className="mb-7 flex flex-col gap-2.5" role="list" aria-label={`Itens incluídos no plano ${plan.name}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              size={15}
              className="neon-icon-gold mt-0.5 shrink-0"
              aria-hidden
            />
            <span className="text-sm leading-snug text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          variant={plan.popular ? "default" : "outline"}
          size="lg"
          className="w-full"
          aria-label={`${plan.cta} plano ${plan.name}`}
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [billing, setBilling] = useState<Billing>("monthly");

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
        {/* Header */}
        <div
          className={`mb-8 max-w-2xl lg:mb-10 ${visible ? "animate-slide-up" : "opacity-0"}`}
        >
          <Badge
            variant="neon"
            className="mb-4 w-fit gap-1.5 px-2.5 py-1 text-[8px] font-semibold tracking-[0.18em] uppercase sm:text-[9px]"
          >
            <span
              className="neon-dot glow-pulse h-1 w-1 rounded-full"
              aria-hidden
            />
            Planos
          </Badge>

          <h2
            id="pricing-heading"
            className="space-y-0 leading-none"
          >
            <span className="block font-display text-[clamp(2rem,5.5vw,4rem)] leading-[0.9] tracking-[0.02em] text-[var(--white-neon)]">
              ESCOLHA SEU PLANO.
            </span>
            <span className="block font-display text-[clamp(2rem,5.5vw,4rem)] leading-[0.9] tracking-[0.02em] text-amber-500 text-glow-gold">
              INVISTA EM VOCÊ.
            </span>
          </h2>

          <div className="mt-4 flex items-center gap-3" aria-hidden>
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>
        </div>

        {/* Toggle */}
        <div
          className={`mb-10 flex justify-center lg:mb-12 ${
            visible ? "animate-slide-up delay-100" : "opacity-0"
          }`}
        >
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-center"
          role="list"
          aria-label="Planos da Academia Imperial"
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billing={billing}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
