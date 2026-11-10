import { localProvider } from "./localProvider";
import type { Guide, Project } from "./types";

// Content repository — single entry point used by pages.
// Today it delegates to the local provider (JSON + TS data).
// Swap to a DB/API provider later without touching the pages.

type Locale = "ar" | "en";

function toLocale(locale: string): Locale {
  return locale === "en" ? "en" : "ar";
}

export const contentRepository = {
  getGuides(locale: string): Guide[] {
    return localProvider.getGuides(toLocale(locale));
  },

  getProjects(locale: string): Project[] {
    return localProvider.getProjects(toLocale(locale));
  },
};
