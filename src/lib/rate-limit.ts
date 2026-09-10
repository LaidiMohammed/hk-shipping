// Simple in-memory rate limit (swap with Upstash Redis for millions in prod)
const store = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, reset: now + windowMs };
  }
  if (entry.count >= limit) return { ok: false, remaining: 0, reset: entry.reset };
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, reset: entry.reset };
}

// cleanup every 5 min
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store.entries()) if (now > v.reset) store.delete(k);
  }, 300_000);
}
