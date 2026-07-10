/**
 * Avaliações do carrossel. `reviewsAreSample: true` indica conteúdo ilustrativo
 * até integrar reviews reais do Google Business.
 */

export const googleReviewsMeta = {
  rating: 4.9,
  totalReviews: 120,
  googleReviewsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() ||
    "https://maps.google.com/?q=Academia+Imperial+Piraju",
  reviewsAreSample: true,
} as const;

export const googleReviews = [
  {
    id: "1",
    name: "Ali",
    rating: 5,
    text: "Sem dúvidas, a melhor academia de Piraju. Com profissionais atenciosos e equipamentos muito bons",
    date: "há 1 mês",
  },
  {
    id: "2",
    name: "Aline F. Nunes",
    rating: 5,
    text: "Academia excelente! Conta com ótimos profissionais, sempre prontos para orientar e ajudar na performance de cada aluno. O ambiente é motivador e acolhe pessoas de todas as idades. Super indico para quem busca resultados de verdade!",
    date: "há 8 meses",
  },
  {
    id: "3",
    name: "Vítor Tonon",
    rating: 4,
    text: "Considerando os padrões de Piraju, é uma excelente academia. Como sugestão, diria para adicionar mais alguns ventiladores, principalmente nos horários de pico.",
    date: "há 2 anos",
  },
  {
    id: "4",
    name: "Lenita Do Val",
    rating: 5,
    text: "Top! Uma das maiores de Piraju. Meu filho frequenta quase todos os dias. Bem equipada, bem localizada.",
    date: "há 2 anos",
  },
  {
    id: "5",
    name: "Celia Constantino",
    rating: 5,
    text: "Adoro treinar lá, profissionais competentes e atenciosos, aparelhos novos e modernos",
    date: "há 1 ano",
  },
  {
    id: "6",
    name: "Eduardo Ricardo",
    rating: 5,
    text: "A melhor academia de PIRAJU não tem nada que chegue perto, as melhores pessoas se encontra na Academia Imperial",
    date: "há 3 anos",
  },
  {
    id: "7",
    name: "Anselmo Cavalheiro",
    rating: 5,
    text: "Melhor academia para a prática de musculação da cidade e região.",
    date: "há 3 anos",
  },
  {
    id: "8",
    name: "Shirley Regina Clemente lattari",
    rating: 5,
    text: "Ótima academia com aparelhos bons e ótimos profissionais",
    date: "há 2 anos",
  },
] as const;
