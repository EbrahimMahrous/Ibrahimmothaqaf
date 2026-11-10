import type { Guide, Project } from "./types";

// Stub provider — ready to swap in a real API / SQL Server backend later.
export const apiProvider = {
  async getGuides(_locale: string): Promise<Guide[]> {
    throw new Error("apiProvider not wired yet. Switch when backend is ready.");
  },
  async getProjects(_locale: string): Promise<Project[]> {
    throw new Error("apiProvider not wired yet. Switch when backend is ready.");
  },
};
