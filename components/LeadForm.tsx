"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  formatBelarusPhoneDisplay,
  normalizeBelarusPhone,
  phoneValidationMessage,
} from "@/lib/phone";
import { collectClientUtm } from "@/lib/utm";

type Interest = "subscription" | "order" | "question";
type FormState = "idle" | "submitting" | "success" | "error";

const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  { value: "subscription", label: "Подписка" },
  { value: "order", label: "Разовый заказ" },
  { value: "question", label: "Вопрос" },
];

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [interest, setInterest] = useState<Interest>("subscription");
  const [comment, setComment] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const phoneError =
    phoneTouched || state === "error"
      ? phoneValidationMessage(phone)
      : null;

  function onPhoneBlur() {
    setPhoneTouched(true);
    const normalized = normalizeBelarusPhone(phone);
    if (normalized) setPhone(formatBelarusPhoneDisplay(normalized));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;

    setPhoneTouched(true);
    if (!name.trim()) {
      setState("error");
      setErrorMessage("Как к вам обращаться?");
      return;
    }
    const validation = phoneValidationMessage(phone);
    if (validation) {
      setState("error");
      setErrorMessage(validation);
      return;
    }

    setState("submitting");
    setErrorMessage(null);

    const utm = collectClientUtm();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          interest,
          comment: comment.trim(),
          ...utm,
        }),
        signal: controller.signal,
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        error?: string;
      } | null;

      if (!res.ok || !data?.ok) {
        setState("error");
        setErrorMessage(
          data?.error ??
            "Не удалось отправить заявку. Проверьте соединение или позвоните нам напрямую"
        );
        return;
      }

      setState("success");
      setSuccessMessage(
        data.message ?? "Заявка принята. Мы свяжемся с вами в ближайшее время."
      );
      setName("");
      setPhone("");
      setComment("");
      setPhoneTouched(false);
    } catch {
      setState("error");
      setErrorMessage(
        "Не удалось отправить заявку. Проверьте соединение или позвоните нам напрямую"
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const fieldClass =
    "mt-2 w-full border-0 border-b border-white/20 bg-transparent py-3 text-foam outline-none placeholder:text-foam/30 focus:border-pink";

  return (
    <section id="lead" className="bg-noir py-16 sm:py-24">
      <div className="section-pad mx-auto grid max-w-content gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="section-title text-pink">Заявка</h2>
          <p className="section-lede mt-3 text-foam">
            Оставьте заявку&nbsp;— мы&nbsp;сделаем ваши дни краше.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-foam/55">
            (или по-простому: подберём и&nbsp;привезём любимые ваши зёрна.)
          </p>
          <div className="mt-6 space-y-1 text-sm text-foam/45">
            <p>
              Тел:{" "}
              <a href="tel:+375291234567" className="text-pink">
                +375 (29) 123-45-67
              </a>
            </p>
            <p>
              Ig:{" "}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-pink"
              >
                @kvarta.coffee
              </a>
            </p>
            <p>Минск · Короля 9</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {state === "success" ? (
            <div className="border border-pink/50 p-8" role="status">
              <p className="font-display text-2xl font-bold text-pink">Готово</p>
              <p className="mt-3 text-sm text-foam/70">{successMessage}</p>
              <button
                type="button"
                className="mt-6 text-sm text-foam underline"
                onClick={() => {
                  setState("idle");
                  setSuccessMessage(null);
                }}
              >
                Ещё одна заявка
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="lead-name" className="text-sm text-foam/50">
                  Имя
                </label>
                <input
                  id="lead-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  placeholder="Как к вам обращаться"
                  required
                  maxLength={80}
                  disabled={state === "submitting"}
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="text-sm text-foam/50">
                  Телефон
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (state === "error") {
                      setState("idle");
                      setErrorMessage(null);
                    }
                  }}
                  onBlur={onPhoneBlur}
                  className={`${fieldClass} ${phoneError ? "border-pink" : ""}`}
                  placeholder="+375 (29) 123-45-67"
                  required
                  maxLength={40}
                  disabled={state === "submitting"}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? "lead-phone-hint" : undefined}
                />
                {phoneError && (
                  <p id="lead-phone-hint" className="mt-2 text-sm text-pink-soft">
                    {phoneError}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm text-foam/50" id="interest-label">
                  Что интересует
                </p>
                <div
                  className="mt-3 flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby="interest-label"
                >
                  {INTEREST_OPTIONS.map((opt) => {
                    const active = interest === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={state === "submitting"}
                        onClick={() => setInterest(opt.value)}
                        className={`h-10 px-4 text-sm ${
                          active
                            ? "bg-pink text-noir"
                            : "border border-white/15 text-foam/70"
                        }`}
                        aria-pressed={active}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="lead-comment" className="text-sm text-foam/50">
                  Комментарий
                </label>
                <textarea
                  id="lead-comment"
                  name="comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={`${fieldClass} resize-y`}
                  placeholder="Помол, адрес, любимые ноты…"
                  maxLength={1000}
                  disabled={state === "submitting"}
                />
              </div>

              {state === "error" && errorMessage && !phoneError && (
                <p className="text-sm text-pink-soft" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="btn-pink w-full gap-2 disabled:opacity-70 sm:w-auto"
              >
                {state === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Отправляем…
                  </>
                ) : (
                  "Отправить"
                )}
              </button>

              {state === "error" && (
                <button
                  type="button"
                  className="block text-sm text-foam underline"
                  onClick={() => {
                    setState("idle");
                    setErrorMessage(null);
                  }}
                >
                  Попробовать снова
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
