import { projectMetas } from "@/data/projects";
import { getMessages } from "@/lib/i18n";
import type { Project } from "./types";

type Locale = "ar" | "en";

interface LocalizedContentMap {
  [id: string]: { title: string; description: string };
}

export const localProvider = {
  /**
   * Returns all projects for a locale.
   * Merges static metadata (data/projects.ts) with localized content
   */
  getProjects(locale: Locale): Project[] {
    const proj = getMessages(locale).projects;
    const map = proj.items as LocalizedContentMap;

    return projectMetas
      .slice()
      .sort((a, b) => a.order - b.order)
      .map<Project>((meta) => {
        const content = map[meta.id] ?? {
          title: meta.slug,
          description: "",
        };
        return {
          id: meta.id,
          slug: meta.slug,
          title: content.title,
          description: content.description,
          image: meta.image,
          url: meta.url,
          status: meta.status,
        };
      });
  },
};
