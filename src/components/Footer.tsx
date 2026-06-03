import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ExternalLink, ArrowUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteContact } from "@/lib/site-contact";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: siteContact.social.instagram, icon: InstagramIcon },
  { label: "Facebook", href: siteContact.social.facebook, icon: FacebookIcon },
] as const;

function FooterColumnTitle({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-display text-sm tracking-[0.14em] text-neon-gold uppercase">
      {children}
    </p>
  );
}

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 shadow-[0_0_14px_rgba(217,119,6,0.15)]"
        aria-hidden
      >
        <Icon size={18} className="neon-icon-gold" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">{children}</div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contato"
      aria-labelledby="footer-heading"
      className="footer-neon-top relative overflow-x-clip bg-[var(--bg-deep)] pt-14 pb-8 sm:pt-16 lg:pt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(217,119,6,0.09)_0%,transparent_60%)]"
        aria-hidden
      />
      <div
        className="ambient-orb pointer-events-none absolute -left-40 bottom-32 h-[320px] w-[320px] rounded-full opacity-25"
        aria-hidden
      />
      <div
        className="ambient-orb pointer-events-none absolute -right-32 top-16 h-[260px] w-[260px] rounded-full opacity-30"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Cabeçalho da seção */}
        <div className="mb-10 max-w-2xl lg:mb-14">
          <Badge
            variant="neon"
            className="mb-4 w-fit gap-1.5 px-2.5 py-1 text-[8px] font-semibold tracking-[0.18em] uppercase sm:text-[9px]"
          >
            <span
              className="neon-dot glow-pulse h-1 w-1 rounded-full"
              aria-hidden
            />
            Contato
          </Badge>

          <h2 id="footer-heading" className="space-y-0 leading-none">
            <span className="block font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.9] tracking-[0.02em] text-[var(--white-neon)]">
              VENHA NOS VISITAR.
            </span>
            <span className="block font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.9] tracking-[0.02em] text-amber-500 text-glow-gold">
              ESTAMOS TE ESPERANDO.
            </span>
          </h2>

          <div className="mt-4 flex items-center gap-3" aria-hidden>
            <div className="neon-gold-line h-px w-10" />
            <div className="neon-gold-line neon-gold-line--dot h-[3px] w-[3px] rounded-full" />
            <div className="neon-gold-line neon-gold-line--fade h-px w-4" />
          </div>
        </div>

        {/* Grid principal */}
        <div className="mb-10 grid grid-cols-1 gap-10 lg:mb-12 lg:grid-cols-3 lg:gap-10">
          {/* Marca + CTA */}
          <div className="flex flex-col gap-5">
            <Link href="#inicio" className="group flex w-fit items-center gap-0">
              <Image
                src="/icon.png"
                alt=""
                width={1432}
                height={901}
                unoptimized
                className="navbar-logo-icon h-12 w-auto max-h-14 shrink-0"
                sizes="56px"
              />
              <div className="-ml-0.5 flex flex-col leading-none">
                <span className="text-[9px] font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                  Academia
                </span>
                <span className="font-display text-xl tracking-[0.06em] text-white transition-colors group-hover:text-[var(--white-neon)]">
                  IMPERIAL
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-sm font-light leading-relaxed text-zinc-500">
              Musculação, Muay Thai, Boxe e FitDance em um só lugar — estrutura
              premium e equipe preparada para sua evolução.
            </p>
            <Button asChild size="sm" className="w-fit">
              <Link href="#planos">Ver planos</Link>
            </Button>
          </div>

          {/* Endereço + horário */}
          <div>
            <FooterColumnTitle>Localização</FooterColumnTitle>
            <div className="flex flex-col gap-5">
              <ContactRow icon={MapPin}>
                <address className="not-italic">
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {siteContact.address.street}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {siteContact.address.city}
                  </p>
                  <a
                    href={siteContact.address.mapsLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-neon-gold transition-colors hover:text-amber-300"
                  >
                    Abrir no Google Maps
                    <ExternalLink size={12} aria-hidden />
                  </a>
                </address>
              </ContactRow>
              <ContactRow icon={Clock}>
                <p className="text-sm text-zinc-300">
                  {siteContact.hours.weekdays.label}
                </p>
                <p className="text-sm font-medium text-zinc-100">
                  {siteContact.hours.weekdays.time}
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  {siteContact.hours.weekend.label}
                </p>
                <p className="text-sm font-medium text-zinc-100">
                  {siteContact.hours.weekend.time}
                </p>
              </ContactRow>
            </div>
          </div>

          {/* Telefone + redes */}
          <div>
            <FooterColumnTitle>Fale conosco</FooterColumnTitle>
            <div className="flex flex-col gap-5">
              <a
                href={siteContact.phone.href}
                className="glass-card group/phone flex items-center gap-3 rounded-2xl border border-white/8 p-4 transition-[border-color,box-shadow,transform] duration-300 hover:border-amber-800/45 hover:shadow-[0_0_28px_rgba(217,119,6,0.2)] active:scale-[0.99]"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 transition-shadow duration-300 group-hover/phone:shadow-[0_0_18px_rgba(217,119,6,0.35)]"
                  aria-hidden
                >
                  <Phone
                    size={20}
                    className="neon-icon-gold"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                    Telefone
                  </p>
                  <p className="text-base font-semibold tracking-wide text-zinc-100 group-hover/phone:text-white">
                    {siteContact.phone.display}
                  </p>
                </div>
              </a>

              <div>
                <p className="mb-3 text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                  Redes sociais
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} da ${siteContact.name}`}
                      className="glass-card flex h-12 w-12 items-center justify-center rounded-full border border-white/8 text-neon-gold transition-[border-color,box-shadow,transform,color] duration-300 hover:scale-105 hover:border-amber-800/50 hover:text-amber-300 hover:shadow-[0_0_24px_rgba(251,191,36,0.35)]"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Siga a {siteContact.name} para novidades e dicas de treino.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="group/map relative mb-10 lg:mb-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Mapa
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Encontre a academia com facilidade
              </p>
            </div>
            <a
              href={siteContact.address.mapsLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-amber-800/40 hover:text-amber-300"
            >
              Rotas no Maps
              <ExternalLink size={12} aria-hidden />
            </a>
          </div>

          <div className="footer-map-frame glass-card relative overflow-hidden rounded-2xl border border-white/8 shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-500 group-hover/map:border-amber-800/35 group-hover/map:shadow-[0_0_48px_rgba(217,119,6,0.12)]">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#060608]/80 to-transparent"
              aria-hidden
            />
            <iframe
              src={siteContact.address.mapsEmbedUrl}
              title={`Localização da ${siteContact.name} no Google Maps`}
              className="aspect-[16/9] w-full min-h-[260px] border-0 sm:min-h-[300px] lg:min-h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:gap-6">
          <p className="text-center text-xs text-zinc-600 sm:text-left">
            © {year} {siteContact.name}. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <p className="hidden text-[10px] tracking-[0.15em] text-zinc-700 uppercase sm:block">
              Treinamento de alto nível
            </p>
            <a
              href="#inicio"
              className="glass-card flex h-10 w-10 items-center justify-center rounded-full border border-white/8 text-zinc-500 transition-[border-color,color,box-shadow] duration-300 hover:border-amber-800/45 hover:text-amber-300 hover:shadow-[0_0_16px_rgba(251,191,36,0.35)]"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={16} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
