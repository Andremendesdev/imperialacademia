/**
 * Contato da Academia Imperial (Piraju — SP).
 *
 * Valores padrão são os dados públicos da unidade. Sobrescreva via `.env.local`
 * (veja `.env.example`).
 *
 * mapsEmbedUrl: Google Maps → Compartilhar → Incorporar um mapa → copiar `src`.
 */

function readEnv(name: string, fallback: string): string {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

const DEFAULT_STREET =
  "Av. Doutor Álvaro Schmidt Gallo, 1861 — Jardim Ana Carolina II";
const DEFAULT_CITY = "Piraju — SP, CEP 18807-270";
const DEFAULT_MAPS_QUERY =
  "Academia Imperial, Av. Doutor Álvaro Schmidt Gallo, 1861, Piraju SP";
const DEFAULT_MAPS_LINK = `https://maps.google.com/?q=${encodeURIComponent(DEFAULT_MAPS_QUERY)}`;
const DEFAULT_MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(DEFAULT_MAPS_QUERY)}&z=16&output=embed`;

export const siteContact = {
  name: readEnv("NEXT_PUBLIC_SITE_NAME", "Academia Imperial"),
  address: {
    street: readEnv("NEXT_PUBLIC_ADDRESS_STREET", DEFAULT_STREET),
    city: readEnv("NEXT_PUBLIC_ADDRESS_CITY", DEFAULT_CITY),
    mapsEmbedUrl: readEnv("NEXT_PUBLIC_MAPS_EMBED_URL", DEFAULT_MAPS_EMBED),
    mapsLinkUrl: readEnv("NEXT_PUBLIC_MAPS_LINK_URL", DEFAULT_MAPS_LINK),
  },
  phone: {
    display: readEnv("NEXT_PUBLIC_PHONE_DISPLAY", "(14) 99864-6840"),
    href: readEnv("NEXT_PUBLIC_PHONE_HREF", "tel:+5514998646840"),
  },
  whatsapp: {
    number: readEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "5514998646840"),
    message: readEnv(
      "NEXT_PUBLIC_WHATSAPP_MESSAGE",
      "Olá! Vim pelo site da Academia Imperial e gostaria de mais informações."
    ),
  },
  hours: {
    weekdays: {
      label: readEnv("NEXT_PUBLIC_HOURS_WEEKDAYS_LABEL", "Seg — Sex"),
      time: readEnv("NEXT_PUBLIC_HOURS_WEEKDAYS_TIME", "05h às 22h"),
    },
    weekend: {
      label: readEnv("NEXT_PUBLIC_HOURS_WEEKEND_LABEL", "Sábado"),
      time: readEnv("NEXT_PUBLIC_HOURS_WEEKEND_TIME", "08h às 13h"),
    },
  },
  social: {
    instagram: readEnv(
      "NEXT_PUBLIC_INSTAGRAM_URL",
      "https://www.instagram.com/imperial.piraju/"
    ),
    facebook: readEnv(
      "NEXT_PUBLIC_FACEBOOK_URL",
      "https://www.facebook.com/imperialpiraju/"
    ),
  },
};

export type SiteContactReadiness = {
  whatsapp: boolean;
  phone: boolean;
  address: boolean;
  maps: boolean;
  hasDirectContact: boolean;
};

const PLACEHOLDER_WHATSAPP = /^550*$/;
const PLACEHOLDER_PHONE = /\(00\)|00000-0000|0000000000/i;
const PLACEHOLDER_ADDRESS = /exemplo|00000-000|cidade\s*—/i;

export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidWhatsAppNumber(number: string): boolean {
  const digits = normalizePhoneDigits(number);
  return (
    digits.length >= 12 &&
    digits.length <= 13 &&
    digits.startsWith("55") &&
    !PLACEHOLDER_WHATSAPP.test(digits)
  );
}

export function getSiteContactReadiness(): SiteContactReadiness {
  const whatsapp = isValidWhatsAppNumber(siteContact.whatsapp.number);
  const phone =
    !PLACEHOLDER_PHONE.test(siteContact.phone.display) &&
    normalizePhoneDigits(siteContact.phone.href).length >= 12;
  const address = !PLACEHOLDER_ADDRESS.test(siteContact.address.street);
  const maps =
    siteContact.address.mapsEmbedUrl.length > 0 &&
    siteContact.address.mapsLinkUrl.length > 0;

  return {
    whatsapp,
    phone,
    address,
    maps,
    hasDirectContact: whatsapp || phone,
  };
}

export function getContactFallbackHref(): string {
  const { phone } = getSiteContactReadiness();
  if (phone) return siteContact.phone.href;
  return "#contato";
}

export function getWhatsAppHref(options?: { message?: string }): string | null {
  if (!getSiteContactReadiness().whatsapp) return null;

  const { number, message } = siteContact.whatsapp;
  const text = (options?.message ?? message).trim();
  const params = new URLSearchParams({ text });
  return `https://wa.me/${normalizePhoneDigits(number)}?${params.toString()}`;
}

/** WhatsApp configurado, ou telefone / seção contato como fallback. */
export function getWhatsAppHrefOrFallback(options?: { message?: string }): string {
  return getWhatsAppHref(options) ?? getContactFallbackHref();
}

export function getPlanWhatsAppMessage(planLabel: string, detail?: string): string {
  const safePlan = planLabel.trim().slice(0, 80);
  const safeDetail = detail?.trim().slice(0, 120);
  const detailPart = safeDetail ? ` (${safeDetail})` : "";
  return `Olá! Vim pelo site da Academia Imperial e quero o Plano ${safePlan}${detailPart}. Pode me ajudar?`;
}

export function getPlanWhatsAppHref(planLabel: string, detail?: string): string {
  return getWhatsAppHrefOrFallback({
    message: getPlanWhatsAppMessage(planLabel, detail),
  });
}
