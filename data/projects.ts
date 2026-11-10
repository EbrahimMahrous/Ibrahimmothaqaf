// Project metadata — the parts that are locale-independent.
// Status values MUST match ProjectStatus in types.ts ("inDevelopment", not "in-development").

export type ProjectMetaStatus = "live" | "inDevelopment";

export interface ProjectMeta {
  id: string;
  slug: string;
  url?: string;
  image?: string;
  status: ProjectMetaStatus;
  order: number;
}

export const projectMetas: ProjectMeta[] = [
  { id: "p1", slug: "avyro", url: "#", status: "inDevelopment", order: 1 },
  { id: "p2", slug: "mothaqaf", url: "#", status: "live", order: 2 },
  { id: "p3", slug: "library", url: "#", status: "live", order: 3 },
];
