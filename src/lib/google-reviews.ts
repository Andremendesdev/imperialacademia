/**
 * Avaliações exibidas no carrossel (placeholders — substitua por reviews reais do Google).
 * googleReviewsUrl: link da página de avaliações no Google Maps / Google Business.
 */

export const googleReviewsMeta = {
  rating: 4.9,
  totalReviews: 120,
  googleReviewsUrl: "https://maps.google.com/?q=Academia+Imperial",
} as const;

export const googleReviews = [
  {
    id: "1",
    name: "Carlos M.",
    rating: 5,
    text: "Melhor academia da região! Equipamentos novos e ambiente muito limpo.",
    date: "há 2 semanas",
  },
  {
    id: "2",
    name: "Ana Paula S.",
    rating: 5,
    text: "Comecei no Muay Thai e a equipe é super atenciosa. Recomendo demais!",
    date: "há 1 mês",
  },
  {
    id: "3",
    name: "Rafael T.",
    rating: 5,
    text: "Estrutura impecável e horários flexíveis. Vale cada centavo do plano.",
    date: "há 3 semanas",
  },
  {
    id: "4",
    name: "Juliana R.",
    rating: 5,
    text: "As aulas de FitDance são incríveis! Ambiente motivador e profissional.",
    date: "há 2 meses",
  },
  {
    id: "5",
    name: "Marcos V.",
    rating: 5,
    text: "Treino de boxe com ótima didática. Academia séria e bem organizada.",
    date: "há 1 mês",
  },
  {
    id: "6",
    name: "Fernanda L.",
    rating: 4,
    text: "Muito boa a musculação, espaço amplo. Só faltou mais vagas no estacionamento.",
    date: "há 2 meses",
  },
  {
    id: "7",
    name: "Diego H.",
    rating: 5,
    text: "Resultados visíveis em poucas semanas. Acompanhamento top dos professores.",
    date: "há 3 semanas",
  },
  {
    id: "8",
    name: "Patrícia N.",
    rating: 5,
    text: "Ambiente acolhedor desde o primeiro dia. Já indiquei para várias amigas.",
    date: "há 1 semana",
  },
] as const;
