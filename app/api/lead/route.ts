import { NextResponse } from "next/server";
import { z } from "zod";
import { normalizeBelarusPhone } from "@/lib/phone";
import { saveLead, type LeadInterest } from "@/lib/leads-store";

const interestSchema = z.enum(["subscription", "order", "question"]);

const leadSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя").max(80),
  phone: z.string().trim().min(1, "Укажите телефон").max(40),
  interest: interestSchema,
  comment: z.string().trim().max(1000).optional().default(""),
  utm_source: z.string().trim().max(200).nullable().optional(),
  utm_medium: z.string().trim().max(200).nullable().optional(),
  utm_campaign: z.string().trim().max(200).nullable().optional(),
  referrer: z.string().trim().max(500).nullable().optional(),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Проверьте поля формы";
    return NextResponse.json({ ok: false, error: first }, { status: 400 });
  }

  const data = parsed.data;
  const phone = normalizeBelarusPhone(data.phone);

  if (!phone) {
    return NextResponse.json(
      {
        ok: false,
        error: "Формат: +375 (29) 123-45-67 — код 25, 29, 33 или 44",
        field: "phone",
      },
      { status: 400 }
    );
  }

  try {
    const result = await saveLead({
      name: data.name,
      phone,
      interest: data.interest as LeadInterest,
      comment: data.comment ?? "",
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_campaign: data.utm_campaign ?? null,
      referrer: data.referrer ?? null,
    });

    return NextResponse.json({
      ok: true,
      duplicate: result.status === "duplicate",
      message:
        "Заявка принята. Мы свяжемся с вами в ближайшее время — обычно в тот же день.",
    });
  } catch (err) {
    console.error("[api/lead]", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Не удалось отправить заявку. Проверьте соединение или позвоните нам напрямую",
      },
      { status: 500 }
    );
  }
}
