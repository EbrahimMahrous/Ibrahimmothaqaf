"use client";

import type { GuideCategory } from "@/lib/content/types";

interface LibraryFiltersProps {
  categories: Record<string, string>;
  active: GuideCategory | "all";
  onChange: (c: GuideCategory | "all") => void;
  allLabel: string;
  searchValue: string;
  onSearch: (v: string) => void;
  searchPlaceholder: string;
}

// Fixed render order for category buttons.
const ordered: (GuideCategory | "all")[] = [
  "all",
  "management",
  "career",
  "business",
  "decision",
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
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {ordered.map((key) => {
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

      {/* Search input */}
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
