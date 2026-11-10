// Shared content types for guides and projects.
// These mirror the shape returned by the content providers.

// The four fixed guide categories.
export type GuideCategory = "management" | "career" | "business" | "decision";

// Project status — live vs still in development.
export type ProjectStatus = "live" | "inDevelopment";

// Stats shown on a guide card.
export interface GuideStats {
  views: number;
  downloads: number;
}

// A fully-hydrated guide (content + metadata).
export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  videoNumber: number;
  pdfUrl: string;
  coverImage?: string;
  videoUrl?: string;
  downloadUrl?: string;
  stats: GuideStats;
  isNew?: boolean;
}

// A fully-hydrated project.
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  url?: string;
  image?: string;
}
