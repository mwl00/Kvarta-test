import Image from "next/image";

const ticker = [
  "ЧЕТВЕРГ — ОБЖАРКА",
  "ПЯТНИЦА — РАЗВОЗ",
  "1–3 ДНЯ — У ВАС",
  "5 КГ — ПАРТИЯ",
  "МИНСК",
  "СВЕЖЕСТЬ = КАЧЕСТВО",
];

export function Hero() {
  return (
    <section id="top" className="relative bg-noir text-foam">
      <div className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2000&q=80"
            alt="Свежеобжаренный кофе"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/75 to-noir/40" />
        </div>

        <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-content flex-col justify-end pb-10 pt-28 sm:pb-14">
          <p className="mb-4 text-sm text-pink-contrast">Минск · с 2019 · без склада</p>

          <h1 className="font-display text-hero max-w-[16ch] text-foam">
            Это вам не&nbsp;турецкий базар.
            <span className="mt-1 block">
              Это&nbsp;— <span className="text-pink-contrast">Кварта.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-foam/70 sm:text-base">
            Мастерская «Кварта»: партии по&nbsp;5&nbsp;кг. Обжарили&nbsp;—
            развезли. Свежесть без склада.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#subscription" className="btn-pink">
              Подписка 54 BYN
            </a>
            <a href="#catalog" className="btn-ghost">
              Каталог
            </a>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-y border-pink/30 bg-pink py-3 text-ink">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xs font-bold tracking-wider sm:text-sm">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              {item}
              <span aria-hidden className="opacity-40">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
