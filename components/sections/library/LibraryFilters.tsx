"use client";

import type { CategoryFilter, LibraryFiltersProps } from "@/types";

// Fixed render order for category buttons.
const ordered: CategoryFilter[] = [
  "all",
  "management",
  "career",
  "business",
  "decision",
  "other",
];

export function LibraryFilters({
  categories,
  active,
  onChange,
  allLabel,
  searchValue,
  onSearch,
  searchPlaceholder,
}: LibraryFiltersProps) {
  const labels = { all: allLabel, ...categories };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {ordered.map((key) => {
          if (key !== "all" && !categories[key]) return null;
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={[
                "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white shadow-(--shadow-soft)"
                  : "bg-background/80 text-muted border border-primary-tint hover:border-primary hover:text-primary backdrop-blur-sm",
              ].join(" ")}
            >
              {labels[key as keyof typeof labels]}
            </button>
          );
        })}
      </div>

      <div className="relative w-full md:w-64">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-full border border-primary-tint bg-background/80 px-4 py-2 text-sm text-text outline-none placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
