/**
 * Dados de contato da Academia Imperial.
 *
 * Como obter mapsEmbedUrl:
 * 1. Abra Google Maps e busque o endereço da academia
 * 2. Clique em "Compartilhar" → "Incorporar um mapa"
 * 3. Copie o valor do atributo src do iframe gerado
 *
 * mapsLinkUrl: use o link "Abrir no Google Maps" da mesma tela de compartilhamento.
 */

export const siteContact = {
  name: "Academia Imperial",
  address: {
    street: "Rua Exemplo, 123 — Bairro",
    city: "Cidade — UF, CEP 00000-000",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197!2d-46.6333!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzcnNTkuOSJX!5e0!3m2!1spt-BR!2sbr!4v1",
    mapsLinkUrl: "https://maps.google.com/?q=Academia+Imperial",
  },
  phone: {
    display: "(00) 00000-0000",
    href: "tel:+5500000000000",
  },
  /** Número só com DDI + DDD + número (sem +, espaços ou traços) para wa.me */
  whatsapp: {
    number: "5500000000000",
    message:
      "Olá! Vim pelo site da Academia Imperial e gostaria de mais informações.",
  },
  hours: {
    weekdays: { label: "Seg — Sex", time: "06h às 22h" },
    weekend: { label: "Sáb — Dom", time: "08h às 14h" },
  },
  social: {
    instagram: "https://instagram.com/academiaimperial",
    facebook: "https://facebook.com/academiaimperial",
  },
} as const;

export function getWhatsAppHref() {
  const { number, message } = siteContact.whatsapp;
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${number}?${params.toString()}`;
}
