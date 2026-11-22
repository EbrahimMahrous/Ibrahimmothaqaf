// website/src/lib/content/repository.ts
import { localProvider } from "./localProvider";
import type { Project } from "./types";

// Content repository — single entry point used by pages.
// Guides/files are now served from the backend API (see lib/api.ts).

type Locale = "ar" | "en";

function toLocale(locale: string): Locale {
  return locale === "en" ? "en" : "ar";
}

export const contentRepository = {
  getProjects(locale: string): Project[] {
    return localProvider.getProjects(toLocale(locale));
  },
};
