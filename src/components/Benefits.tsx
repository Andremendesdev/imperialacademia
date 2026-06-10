"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dumbbell,
  TrendingUp,
  Flame,
  Zap,
  Heart,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const benefits: { icon: LucideIcon; title: string }[] = [
  { icon: Dumbbell, title: "Equipamentos Profissionais" },
  { icon: TrendingUp, title: "Ganho de Massa Muscular" },
  { icon: Flame, title: "Emagrecimento e Definição" },
  { icon: Zap, title: "Mais Energia no Dia a Dia" },
  { icon: Heart, title: "Saúde e Qualidade de Vida" },
  { icon: Target, title: "Acompanhamento Especializado" },
];

function BenefitCard({
  icon: Icon,
  title,
  index,
  visible,
}: {
  icon: LucideIcon;
  title: string;
  index: number;
  visible: boolean;
}) {
  const delayClass = `delay-${Math.min((index + 2) * 100, 700)}`;

  return (
    <div
      role="listitem"
      className={`group/benefit glass-card flex items-center gap-3 rounded-xl border border-white/8 p-3.5 transition-[border-color,box-shadow] duration-500 hover:border-amber-800/45 hover:shadow-[0_0_28px_rgba(217,119,6,0.18)] motion-reduce:transition-none sm:gap-3.5 sm:p-4 lg:p-4 ${
        visible ? `animate-scale-in ${delayClass}` : "opacity-0"
      }`}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-800/30 bg-amber-950/40 shadow-[0_0_14px_rgba(217,119,6,0.18)] transition-shadow duration-500 group-hover/benefit:border-amber-600/50 group-hover/benefit:shadow-[0_0_20px_rgba(217,119,6,0.3)] sm:h-10 sm:w-10 sm:rounded-xl"
        aria-hidden
      >
        <Icon size={18} className="neon-icon-gold sm:h-5 sm:w-5" />
      </div>
      <h3 className="text-xs font-semibold leading-snug tracking-wide text-zinc-100 sm:text-sm lg:text-[0.9rem]">
        {title}
      </h3>
    </div>
  );
}

export function Benefits() {
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
      id="beneficios"
      aria-labelledby="benefits-heading"
      className="relative overflow-x-clip bg-[var(--bg-deep)] py-10 sm:py-12 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(217,119,6,0.07)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="ambient-orb pointer-events-none absolute -left-32 top-1/3 h-[300px] w-[300px] rounded-full opacity-30"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-4 max-w-2xl sm:mb-6 lg:mb-8">
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
            Benefícios
          </Badge>

          <h2
            id="benefits-heading"
            className={`space-y-0 leading-none ${
              visible ? "animate-slide-up delay-100" : "opacity-0"
            }`}
          >
            <span className="section-title-top">
              MAIS QUE UMA ACADEMIA.
            </span>
            <span className="section-title-bottom">
              UM NOVO ESTILO DE VIDA.
            </span>
          </h2>

          <div
            className={`mt-3 flex items-center gap-3 sm:mt-4 ${
              visible ? "animate-slide-up delay-200" : "opacity-0"
            }`}
            aria-hidden
          >
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4"
          role="list"
          aria-label="Benefícios da Academia Imperial"
        >
          {benefits.map(({ icon, title }, index) => (
            <BenefitCard
              key={title}
              icon={icon}
              title={title}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
