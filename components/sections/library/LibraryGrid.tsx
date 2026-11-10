"use client";

import { useMemo, useState } from "react";
import { GuideCard } from "@/components/cards/GuideCard";
import { LibraryFilters } from "./LibraryFilters";
import type { Guide, GuideCategory } from "@/lib/content/types";

interface LibraryGridProps {
  guides: Guide[];
  /** Locale used for number formatting inside cards. */
  locale: "ar" | "en";
  labels: {
    filters: { all: string; searchPlaceholder: string; emptyState: string };
    categories: Record<string, string>;
    card: {
      download: string;
      video: string;
      views: string;
      downloads: string;
      isNew: string;
    };
  };
}

export function LibraryGrid({ guides, locale, labels }: LibraryGridProps) {
  const [category, setCategory] = useState<GuideCategory | "all">("all");
  const [query, setQuery] = useState("");

  // Filter guides by category + free-text query.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guides.filter((g) => {
      const matchCat = category === "all" || g.category === category;
      const matchQuery =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [guides, category, query]);

  return (
    <div className="space-y-8">
      <LibraryFilters
        categories={labels.categories}
        active={category}
        onChange={setCategory}
        allLabel={labels.filters.all}
        searchValue={query}
        onSearch={setQuery}
        searchPlaceholder={labels.filters.searchPlaceholder}
      />

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          {labels.filters.emptyState}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide, i) => (
            <div
              key={guide.id}
              className={[
                "reveal",
                i === 0 ? "reveal-1" : i === 1 ? "reveal-2" : "reveal-3",
              ].join(" ")}
            >
              <GuideCard
                guide={guide}
                locale={locale}
                labels={{
                  download: labels.card.download,
                  video: labels.card.video,
                  views: labels.card.views,
                  downloads: labels.card.downloads,
                  isNew: labels.card.isNew,
                  categories: labels.categories,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
