"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import type { FAQCategory, FAQItem, FAQContentProps } from "@/types";

const CATEGORY_VALUES = [
  "general",
  "content",
  "collaboration",
  "technical",
] as const;

function isCategory(value: string): value is FAQCategory {
  return (CATEGORY_VALUES as readonly string[]).includes(value);
}

export function FAQContent({ locale, t }: FAQContentProps) {
  const data: FAQItem[] = useMemo(
    () =>
      t.faq.items
        .filter((i): i is typeof i & { category: FAQCategory } =>
          isCategory(i.category),
        )
        .map((i) => ({
          id: i.id,
          category: i.category,
          question: i.question,
          answer: i.answer,
        })),
    [t.faq.items],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | FAQCategory>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories: { key: "all" | FAQCategory; label: string }[] = [
    { key: "all", label: t.faq.categories.all },
    { key: "general", label: t.faq.categories.general },
    { key: "content", label: t.faq.categories.content },
    { key: "collaboration", label: t.faq.categories.collaboration },
    { key: "technical", label: t.faq.categories.technical },
  ];

  const filtered = useMemo(() => {
    let items = data;
    if (category !== "all")
      items = items.filter((i) => i.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (i) =>
          i.question.toLowerCase().includes(q) ||
          i.answer.toLowerCase().includes(q),
      );
    }
    return items;
  }, [data, category, query]);

  return (
    <>
      <section className="section relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 inset-s-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-tint blur-3xl"
        />
        <div className="container-editorial relative text-center">
          <p className="eyebrow-pill mb-4 inline-flex">
            <MessageCircle className="h-3.5 w-3.5" />
            {t.faq.hero.eyebrow}
          </p>
          <h1 className="heading-section text-text">{t.faq.hero.title}</h1>
          <p className="body-lead mx-auto mt-4 max-w-2xl">
            {t.faq.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-editorial">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute inset-y-0 inset-s-4 my-auto h-4 w-4 text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.faq.search.placeholder}
                className="w-full rounded-xl border border-primary-tint bg-canvas-alt ps-12 pe-10 py-3 text-sm text-text placeholder:text-muted/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 inset-e-3 my-auto text-muted hover:text-text"
                  aria-label={t.faq.search.clear}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  category === c.key
                    ? "bg-primary text-white"
                    : "border border-primary-tint bg-canvas-alt text-text hover:border-primary hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            {t.faq.search.resultsCount.replace(
              "{count}",
              String(filtered.length),
            )}
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-editorial">
          <div className="mx-auto max-w-3xl space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary-tint flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-primary" />
                </div>
                <p className="text-text font-medium">
                  {t.faq.search.noResultsTitle}
                </p>
                <p className="text-sm text-muted mt-1">
                  {t.faq.search.noResultsSubtitle}
                </p>
              </div>
            ) : (
              filtered.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-primary-tint bg-canvas-alt overflow-hidden transition-all"
                    style={{
                      animation: `fadeIn 300ms ease ${index * 30}ms both`,
                    }}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-start justify-between gap-3 p-5 text-start transition-colors hover:bg-primary-tint/30"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-text">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-muted transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
