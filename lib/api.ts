import type { HeroImage, DownloadFile, Settings, ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// ─────────────────────────────────────────────────────────────
// GET helpers — used in Server Components (ISR caching)
// ─────────────────────────────────────────────────────────────

export async function fetchHeroImages(): Promise<HeroImage[]> {
  try {
    const res = await fetch(`${API_URL}/hero`, {
      next: { revalidate: 60, tags: ["hero"] },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse<HeroImage[]>;
    return json.data || [];
  } catch {
    return [];
  }
}

export async function fetchFiles(): Promise<DownloadFile[]> {
  try {
    const res = await fetch(`${API_URL}/files`, {
      next: { revalidate: 60, tags: ["files"] },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse<DownloadFile[]>;
    return json.data || [];
  } catch {
    return [];
  }
}

export async function fetchSettings(): Promise<Settings | null> {
  try {
    const res = await fetch(`${API_URL}/settings`, {
      next: { revalidate: 300, tags: ["settings"] },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<Settings>;
    return json.data || null;
  } catch {
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
