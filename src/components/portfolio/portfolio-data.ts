export type Work = {
  id: number;
  image: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
};

export const featuredWorks: Work[] = [
  {
    id: 1,
    image: "/images/work-1.jpg",
    title: "Terras do Silencio",
    year: "2022",
    medium: "Acrilica sobre tela",
    dimensions: "100 x 140 cm",
  },
  {
    id: 2,
    image: "/images/work-2.jpg",
    title: "Fluxo da Tarde",
    year: "2023",
    medium: "Pigmento natural e colagem",
    dimensions: "90 x 120 cm",
  },
  {
    id: 3,
    image: "/images/work-3.jpg",
    title: "Corpo de Barro",
    year: "2024",
    medium: "Tecnica mista sobre papel",
    dimensions: "70 x 100 cm",
  },
  {
    id: 4,
    image: "/images/work-4.jpg",
    title: "Luz do Sertao",
    year: "2025",
    medium: "Oleo e areia sobre linho",
    dimensions: "110 x 150 cm",
  },
  {
    id: 5,
    image: "/images/work-5.jpg",
    title: "Memoria Organica",
    year: "2025",
    medium: "Guache e grafite",
    dimensions: "60 x 80 cm",
  },
  {
    id: 6,
    image: "/images/work-6.jpg",
    title: "Ritmo do Vento",
    year: "2026",
    medium: "Aquarela em papel algodao",
    dimensions: "50 x 70 cm",
  },
  {
    id: 7,
    image: "/images/work-7.jpg",
    title: "Raiz e Horizonte",
    year: "2026",
    medium: "Carvao e tinta mineral",
    dimensions: "80 x 120 cm",
  },
  {
    id: 8,
    image: "/images/work-8.jpg",
    title: "Pele da Paisagem",
    year: "2026",
    medium: "Tecnica mista em madeira",
    dimensions: "95 x 135 cm",
  },
];
