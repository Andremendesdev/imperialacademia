"use client";

import Image from "next/image";

type Partner =
  | {
      id: string;
      kind: "image";
      src: string;
      alt: string;
      className?: string;
      plate?: boolean;
    }
  | {
      id: string;
      kind: "text";
      title: string;
      subtitle: string;
    };

const partners: Partner[] = [
  {
    id: "etec",
    kind: "image",
    src: "/logoetec.png",
    alt: "Etec Waldyr Duron Jr. Piraju",
    className: "partners-logo--etec",
  },
  {
    id: "chip",
    kind: "image",
    src: "/logochip.png",
    alt: "Chiptronic",
    className: "partners-logo--chip",
    plate: true,
  },
  {
    id: "prefeitura",
    kind: "text",
    title: "Funcionários da",
    subtitle: "Prefeitura",
  },
];

const partnersLoop = [...partners, ...partners, ...partners];

function PartnerItem({ partner }: { partner: Partner }) {
  if (partner.kind === "text") {
    return (
      <div
        className="partners-item partners-item--text"
        role="listitem"
        aria-label={`${partner.title} ${partner.subtitle}`}
      >
        <span className="partners-text-title">{partner.title}</span>
        <span className="partners-text-subtitle">{partner.subtitle}</span>
      </div>
    );
  }

  return (
    <div
      className={`partners-item partners-item--logo${partner.plate ? " partners-item--plate" : ""}`}
      role="listitem"
    >
      <Image
        src={partner.src}
        alt={partner.alt}
        width={280}
        height={80}
        unoptimized
        className={`partners-logo ${partner.className ?? ""}`}
        draggable={false}
      />
    </div>
  );
}

function PartnersTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="partners-track-set" aria-hidden={ariaHidden || undefined}>
      {partnersLoop.map((partner, index) => (
        <PartnerItem
          key={`${ariaHidden ? "dup" : "main"}-${partner.id}-${index}`}
          partner={partner}
        />
      ))}
    </div>
  );
}

export function Partners() {
  return (
    <section
      id="parcerias"
      aria-label="Parceiros da Academia Imperial"
      className="partners-section relative z-10 overflow-x-clip bg-[var(--bg-deep)] py-5 sm:py-6 lg:py-7"
    >
      <h2 className="sr-only">Parcerias</h2>
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-10" aria-hidden />

      <div className="partners-marquee relative">
        <div className="partners-fade partners-fade--left" aria-hidden />
        <div className="partners-fade partners-fade--right" aria-hidden />

        <div
          className="partners-track"
          role="list"
          aria-label="Logos dos parceiros"
        >
          <PartnersTrack />
          <PartnersTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}
