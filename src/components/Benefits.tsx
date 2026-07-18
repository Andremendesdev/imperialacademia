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
      className={`benefit-card group/benefit relative flex items-center gap-3 overflow-hidden rounded-xl px-3.5 py-3 sm:gap-3.5 sm:px-4 sm:py-3.5 ${
        visible ? `animate-scale-in ${delayClass}` : "opacity-0"
      }`}
    >
      <div
        className="benefit-card-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10"
        aria-hidden
      >
        <Icon
          size={18}
          className="text-amber-400 transition-transform duration-400 group-hover/benefit:scale-110 motion-reduce:transition-none sm:h-[19px] sm:w-[19px]"
        />
      </div>
      <h3 className="text-xs font-semibold leading-snug tracking-wide text-zinc-100 sm:text-sm">
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
      className="relative overflow-x-clip bg-[var(--bg-deep)] py-10 sm:py-12 lg:py-14"
    >
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`mb-5 max-w-2xl sm:mb-6 lg:mb-7 ${visible ? "animate-slide-up" : "opacity-0"}`}
        >
          <Badge variant="section" className="badge-section w-fit">
            <span className="badge-section-dot" aria-hidden />
            Benefícios
          </Badge>

          <h2 id="benefits-heading" className="space-y-0 leading-none">
            <span className="section-title-top">MAIS QUE UMA ACADEMIA.</span>
            <span className="section-title-bottom">UM NOVO ESTILO DE VIDA.</span>
          </h2>

          <div className="mt-3 flex items-center gap-3 sm:mt-4" aria-hidden>
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3"
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
