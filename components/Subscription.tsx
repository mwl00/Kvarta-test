import { subscription } from "@/data/products";

export function Subscription() {
  return (
    <section id="subscription" className="bg-pink py-16 text-ink sm:py-24">
      <div className="section-pad mx-auto grid max-w-content gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <h2 className="section-title text-ink">Подписка</h2>
          <p className="section-lede mt-3 text-ink/80">
            Свежак каждый месяц.
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
            Две пачки × 250&nbsp;г. Подберём лоты под ваш способ заваривания.
            Доставка бесплатно. Паузу можно поставить по запросу.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink">
            <li>— обжарка в ваш четверг</li>
            <li>— приход на 1–3 день</li>
            <li>— без склада и компромиссов</li>
          </ul>
        </div>

        <div className="bg-noir p-8 text-foam sm:p-10 lg:col-span-5 lg:col-start-8">
          <p className="text-xs uppercase tracking-wider text-pink-contrast">в месяц</p>
          <p className="mt-2 font-display text-6xl font-extrabold leading-none sm:text-7xl">
            {subscription.price}
            <span className="ml-2 text-xl text-pink-contrast">BYN</span>
          </p>
          <p className="mt-4 text-sm text-foam/60">
            {subscription.packs} × {subscription.weight} ·{" "}
            {subscription.delivery}
          </p>
          <a href="#lead" className="btn-pink mt-8 w-full sm:w-auto">
            Оформить
          </a>
          <p className="mt-4 text-xs text-foam/40">
            Заявка → звонок → уточним вкус и адрес.
          </p>
        </div>
      </div>
    </section>
  );
}
