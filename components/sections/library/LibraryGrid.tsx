"use client";

import { useMemo, useState } from "react";
import { FileCard } from "./FileCard";
import { LibraryFilters } from "./LibraryFilters";
import type { LibraryGridProps, CategoryFilter } from "@/types";

export function LibraryGrid({ files, locale, labels }: LibraryGridProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return files.filter((f) => {
      const matchCat = category === "all" || f.category === category;
      const matchQuery =
        !q ||
        f.title.toLowerCase().includes(q) ||
        (f.description || "").toLowerCase().includes(q) ||
        (f.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [files, category, query]);

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
          {filtered.map((file, i) => (
            <div
              key={file._id}
              className={[
                "reveal",
                i === 0 ? "reveal-1" : i === 1 ? "reveal-2" : "reveal-3",
              ].join(" ")}
            >
              <FileCard
                file={file}
                locale={locale}
                labels={{
                  download: labels.card.download,
                  watchVideo: labels.card.watchVideo,
                  preview: labels.card.preview,
                  views: labels.card.views,
                  downloads: labels.card.downloads,
                  isNew: labels.card.isNew,
                  featured: labels.card.featured,
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
