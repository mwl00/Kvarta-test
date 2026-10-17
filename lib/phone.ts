/**
 * Belarus phone validation and normalization.
 * Accepts: +375XXXXXXXXX, 80XXXXXXXXX, with spaces/dashes/parens.
 */

const BY_OPERATORS = new Set([
  "25", // life:)
  "29", // A1 / MTS mixed
  "33", // MTS
  "44", // A1
]);

/** Digits only, national form starting with 375… */
export function normalizeBelarusPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");

  let national = digits;
  if (national.startsWith("80") && national.length === 11) {
    national = "375" + national.slice(2);
  } else if (national.startsWith("375") && national.length === 12) {
    // ok
  } else if (national.length === 9 && BY_OPERATORS.has(national.slice(0, 2))) {
    national = "375" + national;
  } else {
    return null;
  }

  if (national.length !== 12 || !national.startsWith("375")) return null;

  const operator = national.slice(3, 5);
  if (!BY_OPERATORS.has(operator)) return null;

  return `+${national}`;
}

export function formatBelarusPhoneDisplay(e164: string): string {
  const d = e164.replace(/\D/g, "");
  // 375 XX XXX XX XX
  return `+${d.slice(0, 3)} (${d.slice(3, 5)}) ${d.slice(5, 8)}-${d.slice(8, 10)}-${d.slice(10, 12)}`;
}

export function isValidBelarusPhone(input: string): boolean {
  return normalizeBelarusPhone(input) !== null;
}

export const PHONE_HINT =
  "Формат: +375 (29) 123-45-67 — код 25, 29, 33 или 44";

export function phoneValidationMessage(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return "Укажите номер телефона";
  if (!isValidBelarusPhone(trimmed)) {
    return PHONE_HINT;
  }
  return null;
}
