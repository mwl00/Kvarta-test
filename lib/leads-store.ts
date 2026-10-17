import { promises as fs } from "fs";
import path from "path";

/**
 * Simple JSON-file store for local/test use.
 * Reliable on Windows without native SQLite bindings.
 * Path: data/leads.json (gitignored).
 */

export type LeadInterest = "subscription" | "order" | "question";

export type LeadRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  interest: LeadInterest;
  comment: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  duplicateOf?: string;
};

export type SaveLeadResult =
  | { status: "created"; lead: LeadRecord }
  | { status: "duplicate"; lead: LeadRecord };

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

async function ensureStore(): Promise<LeadRecord[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    const parsed = JSON.parse(raw) as LeadRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf8");
    return [];
  }
}

async function writeStore(leads: LeadRecord[]): Promise<void> {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}

export async function saveLead(
  input: Omit<LeadRecord, "id" | "createdAt" | "duplicateOf">
): Promise<SaveLeadResult> {
  const leads = await ensureStore();
  const now = Date.now();

  const recent = leads.find((lead) => {
    if (lead.phone !== input.phone) return false;
    const age = now - new Date(lead.createdAt).getTime();
    return age >= 0 && age < DUPLICATE_WINDOW_MS && !lead.duplicateOf;
  });

  if (recent) {
    return { status: "duplicate", lead: recent };
  }

  const lead: LeadRecord = {
    ...input,
    id: `lead_${now}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date(now).toISOString(),
  };

  leads.push(lead);
  await writeStore(leads);
  return { status: "created", lead };
}
