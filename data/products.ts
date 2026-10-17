export type Product = {
  id: string;
  name: string;
  origin: string;
  price: number;
  weight: string;
  notes: string[];
  roast: string;
  tag?: string;
  image: string;
  imageAlt: string;
};

export const products: Product[] = [
  {
    id: "ethiopia",
    name: "Эфиопия Иргачеффе",
    origin: "Эфиопия",
    price: 32,
    weight: "250 г",
    notes: ["Цветочный", "Бергамот"],
    roast: "Светлая обжарка",
    tag: "Фильтр",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Светло обжаренные зёрна кофе крупным планом",
  },
  {
    id: "colombia",
    name: "Колумбия Уила",
    origin: "Колумбия",
    price: 29,
    weight: "250 г",
    notes: ["Карамель", "Красное яблоко"],
    roast: "Средняя обжарка",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Чашка свежесваренного кофе",
  },
  {
    id: "brazil",
    name: "Бразилия Серрадо",
    origin: "Бразилия",
    price: 26,
    weight: "250 г",
    notes: ["Орех", "Шоколад"],
    roast: "Под эспрессо",
    tag: "Эспрессо",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Эспрессо в чашке на деревянной поверхности",
  },
  {
    id: "drips",
    name: "Дрип-пакеты",
    origin: "Ассорти",
    price: 18,
    weight: "10 шт",
    notes: ["Разные лоты", "Удобно в дороге"],
    roast: "Обжарка недели",
    tag: "В дорогу",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Кофейные зёрна и чашка на столе",
  },
];

export const subscription = {
  price: 54,
  packs: 2,
  weight: "250 г",
  period: "мес",
  delivery: "Доставка бесплатно",
};
