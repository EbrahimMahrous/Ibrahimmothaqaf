// ─────────────────────────────────────────────────────────────
// lib/api.ts — Website API client
// Used by Server Components (fetch*) and Client Components (URLs)
// ─────────────────────────────────────────────────────────────

import type { HeroImage, DownloadFile, Settings, ApiResponse } from "@/types";

// ─────────────────────────────────────────────────────────────
// API URL — picks the right base URL per environment
// Priority: NEXT_PUBLIC_API_URL (Vercel) > auto-detect > fallback
// ─────────────────────────────────────────────────────────────

const getApiUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:3000/api";
    }
  }
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

export async function fetchFiles(params?: {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<DownloadFile[]> {
  try {
    const search = new URLSearchParams();
    if (params?.q) search.set("q", params.q);
    if (params?.category && params.category !== "all")
      search.set("category", params.category);
    if (params?.sort) search.set("sort", params.sort);
    if (params?.page) search.set("page", String(params.page));
    if (params?.limit) search.set("limit", String(params.limit));

    const qs = search.toString();
    const res = await fetch(`${API_URL}/files${qs ? `?${qs}` : ""}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse<DownloadFile[]>;
    return json.data || [];
  } catch (err) {
    console.error("[fetchFiles] failed:", err);
    return [];
  }
}

export async function fetchFileById(id: string): Promise<DownloadFile | null> {
  try {
    const res = await fetch(`${API_URL}/files/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<DownloadFile>;
    return json.data || null;
  } catch (err) {
    console.error("[fetchFileById] failed:", err);
    return null;
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

// ─────────────────────────────────────────────────────────────
// File URLs
// ─────────────────────────────────────────────────────────────

/**
 * Inline view URL — opens PDF/images in the browser (iframe / new tab).
 * Backend returns Content-Disposition: inline for PDFs & images,
 * attachment for everything else.
 */
export function getViewUrl(fileId: string): string {
  return `${API_URL}/files/${fileId}/view`;
}

/**
 * Download URL — forces Content-Disposition: attachment with a
 * clean filename (RFC 5987, supports Arabic). Also increments the
 * server-side download counter.
 */
export function getDownloadUrl(fileId: string): string {
  return `${API_URL}/files/${fileId}/download`;
}

// ─────────────────────────────────────────────────────────────
// Video embed helper
// ─────────────────────────────────────────────────────────────

/**
 * Convert a YouTube/Vimeo URL into an embeddable URL.
 * Returns null if the URL is not a supported provider.
 *
 * Supported:
 *   - https://www.youtube.com/watch?v=ID
 *   - https://youtu.be/ID
 *   - https://www.youtube.com/shorts/ID
 *   - https://www.youtube.com/embed/ID
 *   - https://vimeo.com/ID
 */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);

    // YouTube
    if (u.hostname.includes("youtube.com") || u.hostname === "youtu.be") {
      let id = "";
      if (u.hostname === "youtu.be") {
        id = u.pathname.slice(1);
      } else if (u.pathname.startsWith("/watch")) {
        id = u.searchParams.get("v") || "";
      } else if (u.pathname.startsWith("/embed/")) {
        id = u.pathname.split("/")[2] || "";
      } else if (u.pathname.startsWith("/shorts/")) {
        id = u.pathname.split("/")[2] || "";
      }
      return id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
    }

    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export { API_URL };
