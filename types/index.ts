// ─────────────────────────────────────────────────────────────
// Shared API types
// ─────────────────────────────────────────────────────────────

export interface HeroImage {
  _id: string;
  url: string;
  publicId: string;
  alt: string;
  order: number;
  createdAt: string;
}

export interface DownloadFile {
  _id: string;
  title: string;
  description: string;
  url: string;
  publicId: string;
  size: number;
  format: string;
  downloads: number;
  createdAt: string;
}

export interface Settings {
  _id: string;
  logo: { url: string; publicId: string };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
  };
  whatsapp: string;
  contactEmail: string;
}

// ─────────────────────────────────────────────────────────────
// API response envelope
// ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}
