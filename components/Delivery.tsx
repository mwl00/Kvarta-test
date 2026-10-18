export function Delivery() {
  return (
    <section id="delivery" className="bg-roast-800 py-16 sm:py-24">
      <div className="section-pad mx-auto max-w-content">
        <div className="mb-10 max-w-2xl">
          <h2 className="section-title text-pink-contrast">
            Доставка и&nbsp;самовывоз
          </h2>
        </div>

        <div className="grid gap-8 border-t border-foam/10 pt-10 md:grid-cols-2 md:gap-16">
          <article>
            <h3 className="font-display text-2xl font-bold text-foam">
              Самовывоз
            </h3>
            <p className="mt-3 text-sm text-foam/70 sm:text-base">
              Минск, ул.&nbsp;Короля,&nbsp;9
            </p>
            <p className="mt-3 text-sm text-foam/50">
              Пн–пт 8:00–20:00
              <br />
              Сб–вс 10:00–18:00
            </p>
          </article>

          <article>
            <h3 className="font-display text-2xl font-bold text-foam">
              Доставка по&nbsp;Минску
            </h3>
            <p className="mt-3 text-sm text-foam/70 sm:text-base">
              По&nbsp;пятницам — сразу после обжарки.
            </p>
            <p className="mt-3 text-sm text-foam/50">
              От&nbsp;50&nbsp;BYN — бесплатно. Меньше — скажем при звонке.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
