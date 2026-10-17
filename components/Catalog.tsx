import Image from "next/image";
import { products } from "@/data/products";

export function Catalog() {
  return (
    <section id="catalog" className="bg-noir py-16 sm:py-24">
      <div className="section-pad mx-auto max-w-content">
        <div className="mb-10 max-w-xl sm:mb-14">
          <h2 className="section-title text-pink">Каталог</h2>
          <p className="section-lede mt-3 text-foam">Что жарим сейчас</p>
        </div>

        <ul className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
          {products.map((product) => (
            <li key={product.id}>
              <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-roast-900">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                {product.tag && (
                  <span className="absolute left-3 top-3 bg-pink px-2 py-1 text-xs font-bold text-noir">
                    {product.tag}
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-foam sm:text-2xl">
                  {product.name}
                </h3>
                <p className="shrink-0 font-display text-xl font-bold text-pink">
                  {product.price}{" "}
                  <span className="text-sm font-medium text-foam/45">BYN</span>
                </p>
              </div>

              <p className="mt-1 text-xs text-roast-300">
                {product.weight} · {product.roast}
              </p>
              <p className="mt-2 text-sm text-foam/55">
                {product.notes.join(" · ")}
              </p>

              <a href="#lead" className="mt-4 inline-block text-sm text-pink">
                Заказать →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
