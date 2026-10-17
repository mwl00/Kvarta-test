export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-noir py-10">
      <div className="section-pad mx-auto flex max-w-content flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-extrabold text-foam">
            Кварта<span className="text-pink">.</span>
          </p>
          <p className="mt-1 text-sm text-foam/40">
            Обжарка · Минск · с&nbsp;2019
          </p>
        </div>
        <p className="text-sm text-pink">Четверг → пятница → свежесть</p>
      </div>
    </footer>
  );
}
