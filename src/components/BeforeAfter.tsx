"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

const transformations = [
  {
    id: "1",
    combined: {
      src: "/resultados/transformacao-1.png",
      alt: "Transformação antes e depois na Academia Imperial",
    },
  },
  {
    id: "2",
    before: {
      src: "/resultados/antes-1.png",
      alt: "Aluno da Academia Imperial — antes",
    },
    after: {
      src: "/resultados/depois-1.png",
      alt: "Aluno da Academia Imperial — depois",
    },
  },
  {
    id: "3",
    before: {
      src: "/resultados/antes-2.png",
      alt: "Aluna da Academia Imperial — antes",
    },
    after: {
      src: "/resultados/depois-2.png",
      alt: "Aluna da Academia Imperial — depois",
    },
  },
  {
    id: "4",
    before: {
      src: "/resultados/antes-3.jpeg",
      alt: "Aluno da Academia Imperial — antes",
    },
    after: {
      src: "/resultados/depois-3.jpeg",
      alt: "Aluno da Academia Imperial — depois",
    },
  },
  {
    id: "5",
    combined: {
      src: "/fotochange.jpeg",
      alt: "Transformação antes e depois de aluno da Academia Imperial",
    },
  },
] as const;

function PhotoLabel({ children }: { children: string }) {
  return (
    <span className="absolute top-3 left-3 z-10 rounded-md border border-amber-600/40 bg-[#000000]/75 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-amber-400/95 uppercase backdrop-blur-sm">
      {children}
    </span>
  );
}

function TransformationCard({
  item,
  index,
  visible,
}: {
  item: (typeof transformations)[number];
  index: number;
  visible: boolean;
}) {
  const delayClass = `delay-${Math.min((index + 2) * 100, 600)}`;

  return (
    <article
      role="listitem"
      className={`group/ba relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-[border-color,box-shadow] duration-500 hover:border-amber-600/35 motion-reduce:transition-none ${
        visible ? `animate-scale-in ${delayClass}` : "opacity-0"
      }`}
    >
      <div className="relative aspect-[3/2] w-full">
        {"combined" in item ? (
          <>
            <Image
              src={item.combined.src}
              alt={item.combined.alt}
              fill
              unoptimized
              className="object-cover object-center transition-transform duration-700 group-hover/ba:scale-[1.03] motion-reduce:transition-none"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/50 via-transparent to-transparent" />
            <PhotoLabel>Antes</PhotoLabel>
            <span className="absolute top-3 right-3 z-10 rounded-md border border-amber-600/40 bg-[#000000]/75 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-amber-400/95 uppercase backdrop-blur-sm">
              Depois
            </span>
          </>
        ) : (
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative h-full overflow-hidden border-r border-white/8">
              <Image
                src={item.before.src}
                alt={item.before.alt}
                fill
                unoptimized
                className="object-cover object-center transition-transform duration-700 group-hover/ba:scale-[1.03] motion-reduce:transition-none"
                sizes="(max-width: 1024px) 50vw, 17vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/45 via-transparent to-transparent" />
              <PhotoLabel>Antes</PhotoLabel>
            </div>
            <div className="relative h-full overflow-hidden">
              <Image
                src={item.after.src}
                alt={item.after.alt}
                fill
                unoptimized
                className="object-cover object-center transition-transform duration-700 group-hover/ba:scale-[1.03] motion-reduce:transition-none"
                sizes="(max-width: 1024px) 50vw, 17vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/45 via-transparent to-transparent" />
              <PhotoLabel>Depois</PhotoLabel>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function BeforeAfter() {
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
      id="transformacoes"
      aria-labelledby="before-after-heading"
      className="relative overflow-x-clip bg-[var(--bg-deep)] py-16 lg:py-24"
    >
      <div
        className="ambient-orb pointer-events-none absolute -left-32 top-1/4 h-[320px] w-[320px] rounded-full opacity-35"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`mb-10 max-w-2xl lg:mb-12 ${visible ? "animate-slide-up" : "opacity-0"}`}
        >
          <Badge variant="section" className="badge-section w-fit">
            <span className="badge-section-dot" aria-hidden />
            Resultados
          </Badge>

          <h2 id="before-after-heading" className="space-y-0 leading-none">
            <span className="section-title-top">ANTES E DEPOIS.</span>
            <span className="section-title-bottom">RESULTADOS REAIS.</span>
          </h2>

          <div className="mt-4 flex items-center gap-3" aria-hidden>
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>

          <p
            className={`mt-5 max-w-lg text-base font-light leading-relaxed text-zinc-400 sm:text-[1.05rem] ${
              visible ? "animate-slide-up delay-200" : "opacity-0"
            }`}
          >
            Transformações de alunos que treinam na Academia Imperial — disciplina,
            acompanhamento e consistência.
          </p>
        </div>

        <div
          className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6"
          role="list"
          aria-label="Transformações antes e depois"
        >
          {transformations.map((item, index) => (
            <TransformationCard
              key={item.id}
              item={item}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
