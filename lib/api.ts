import type { HeroImage, DownloadFile, Settings, ApiResponse } from "@/types";

// ─────────────────────────────────────────────────────────────
// API URL — picks the right base URL per environment
// Priority: NEXT_PUBLIC_API_URL (Vercel) > auto-detect > fallback
// ─────────────────────────────────────────────────────────────

const getApiUrl = (): string => {
  // 1. Env var wins (set in Vercel / .env.local)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 2. Localhost auto-detect
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:3000/api";
    }
  }

  // 3. Production fallback
  return "https://mothaqaf-backend.vercel.app/api";
};

const API_URL = getApiUrl();

// ─────────────────────────────────────────────────────────────
// GET helpers — used in Server Components
// NOTE: Next.js 16 with cacheComponents disables `next.revalidate`.
// Caching is handled by the caller via "use cache" + cacheLife/cacheTag.
// ─────────────────────────────────────────────────────────────

export async function fetchHeroImages(): Promise<HeroImage[]> {
  try {
    const res = await fetch(`${API_URL}/hero`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse<HeroImage[]>;
    return json.data || [];
  } catch (err) {
    console.error("[fetchHeroImages] failed:", err);
    return [];
  }
}

export async function fetchFiles(): Promise<DownloadFile[]> {
  try {
    const res = await fetch(`${API_URL}/files`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse<DownloadFile[]>;
    return json.data || [];
  } catch (err) {
    console.error("[fetchFiles] failed:", err);
    return [];
  }
}

export async function fetchSettings(): Promise<Settings | null> {
  try {
    const res = await fetch(`${API_URL}/settings`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<Settings>;
    return json.data || null;
  } catch (err) {
    console.error("[fetchSettings] failed:", err);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// POST helpers — used in Client Components
// ─────────────────────────────────────────────────────────────

export async function subscribeToNewsletter(email: string) {
  const res = await fetch(`${API_URL}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "حدث خطأ");
  return json;
}

export { API_URL };
