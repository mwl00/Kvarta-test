# Кварта — лендинг ремесленной обжарки (Минск)

Mobile-first лендинг на **Next.js (App Router) + Tailwind CSS**.  
Заявки сохраняются локально в `data/leads.json`.

## Стек

| Слой | Решение |
|------|---------|
| UI | Next.js 15, React 19, Tailwind, Lucide |
| API | `POST /api/lead` |
| Хранилище | JSON-файл `data/leads.json` |

## Быстрый старт

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Абсолютный URL сайта для Open Graph |

## Заявки

- Валидация BY-телефона (`25 / 29 / 33 / 44`)
- Anti-double-click на кнопке
- Anti-dupe: повтор номера в течение 10 минут не создаёт новую запись
- UTM и referrer уходят вместе с заявкой

## Структура

```
app/page.tsx, layout.tsx, api/lead/route.ts
components/  Hero, Story, Catalog, Subscription, Delivery, LeadForm…
lib/         phone, utm, leads-store
data/products.ts
```
