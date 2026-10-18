"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

const links = [
  { href: "#catalog", label: "Каталог" },
  { href: "#subscription", label: "Подписка" },
  { href: "#delivery", label: "Доставка" },
  { href: "#lead", label: "Заявка" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setIsDark(nextTheme === "dark");
    try {
      localStorage.setItem("kvarta-theme", nextTheme);
    } catch {
      // Theme still changes for this page view when storage is unavailable.
    }
  };

  const themeToggle = (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center border border-foam/20 text-foam"
      aria-label={isDark ? "Включить дневную тему" : "Включить ночную тему"}
      title={isDark ? "Дневная тема" : "Ночная тема"}
      onClick={toggleTheme}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          size={20}
          aria-hidden="true"
          className={`theme-icon absolute ${isDark ? "theme-icon-hidden" : "theme-icon-visible"}`}
        />
        <Moon
          size={20}
          aria-hidden="true"
          className={`theme-icon absolute ${isDark ? "theme-icon-visible" : "theme-icon-hidden"}`}
        />
      </span>
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled || open
          ? "border-b border-foam/10 bg-noir/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex max-w-content items-center justify-between py-4">
        <a
          href="#top"
          className="font-display text-xl font-extrabold text-foam sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          Кварта<span className="text-pink-contrast">.</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foam/70 hover:text-pink-contrast"
            >
              {link.label}
            </a>
          ))}
          <a href="#lead" className="btn-pink h-10 px-4 text-xs">
            Заказать
          </a>
          {themeToggle}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {themeToggle}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-foam/20 text-foam"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-foam/10 bg-noir px-5 pb-8 pt-2 md:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-foam/10 py-4 font-display text-xl font-bold text-foam"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
