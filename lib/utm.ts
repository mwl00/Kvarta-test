export type UtmPayload = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function readUtmFromSearchParams(
  searchParams: URLSearchParams
): Pick<UtmPayload, "utm_source" | "utm_medium" | "utm_campaign"> {
  const result = {
    utm_source: null as string | null,
    utm_medium: null as string | null,
    utm_campaign: null as string | null,
  };

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) result[key] = value.slice(0, 200);
  }

  return result;
}

export function collectClientUtm(): UtmPayload {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      referrer: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl = readUtmFromSearchParams(params);

  // Persist first-touch UTM for the session
  try {
    const stored = sessionStorage.getItem("kvarta_utm");
    if (!stored && (fromUrl.utm_source || fromUrl.utm_medium || fromUrl.utm_campaign)) {
      sessionStorage.setItem("kvarta_utm", JSON.stringify(fromUrl));
    }
    const cached = stored ? (JSON.parse(stored) as typeof fromUrl) : fromUrl;
    return {
      utm_source: fromUrl.utm_source ?? cached.utm_source ?? null,
      utm_medium: fromUrl.utm_medium ?? cached.utm_medium ?? null,
      utm_campaign: fromUrl.utm_campaign ?? cached.utm_campaign ?? null,
      referrer: document.referrer ? document.referrer.slice(0, 500) : null,
    };
  } catch {
    return {
      ...fromUrl,
      referrer: document.referrer ? document.referrer.slice(0, 500) : null,
    };
  }
}
