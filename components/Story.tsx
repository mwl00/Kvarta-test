import Image from "next/image";

export function Story() {
  return (
    <section id="about" className="bg-roast-900 py-16 sm:py-24">
      <div className="section-pad mx-auto max-w-content">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="section-title text-pink-contrast">Кто мы?</h2>
            <p className="section-lede mt-3 text-foam">
              Аня и&nbsp;Дмитрий.
              <span className="mt-1 block text-foam/80">
                Были бариста — стали обжарщиками.
              </span>
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-foam/65 sm:text-base lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p>
              С&nbsp;2019 в&nbsp;Минске жарим микро-партиями по&nbsp;5&nbsp;кг.
              Маленький объём — проще держать профиль и&nbsp;не копить зерно
              на&nbsp;складе.
            </p>
            <p>
              Свежесть — это скорость. Четверг: обжарка. Пятница: развоз. Вы
              получаете лот на&nbsp;1–3 день после жарки.
            </p>
          </div>
        </div>

        <div className="relative mt-12 aspect-[16/10] overflow-hidden bg-noir sm:mt-16 sm:aspect-[21/9]">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80"
            alt="Работа с кофе в мастерской"
            fill
            sizes="(max-width: 1024px) 100vw, 72rem"
            className="object-cover"
          />
        </div>

        <p className="mt-4 max-w-lg text-sm text-foam/55">
          5&nbsp;кг за&nbsp;раз — чтобы четверг оставался свежим, а&nbsp;не
          превращался в&nbsp;склад.
        </p>

        <dl className="mt-10 grid gap-8 border-t border-foam/10 pt-10 sm:grid-cols-3">
          {[
            { label: "Партия", value: "5 кг" },
            { label: "Обжарка", value: "Четверг" },
            { label: "Доставка", value: "Пятница" },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wider text-foam/40">
                {item.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-extrabold text-foam sm:text-4xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
