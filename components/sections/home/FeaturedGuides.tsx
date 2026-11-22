"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FileCard } from "@/components/sections/library/FileCard";
import type { FeaturedGuidesProps } from "@/types";

export function FeaturedGuides({
  locale,
  eyebrow,
  title,
  subtitle,
  cta,
  files,
  cardLabels,
}: FeaturedGuidesProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const isRtl = locale === "ar";

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    const eps = 4;
    const atStart = isRtl ? scrollLeft >= -eps : scrollLeft <= eps;
    const atEnd = isRtl ? scrollLeft <= -max + eps : scrollLeft >= max - eps;
    setCanPrev(!atStart);
    setCanNext(!atEnd);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [files.length, isRtl]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const delta = dir * (el.clientWidth * 0.85);
    el.scrollBy({ left: isRtl ? -delta : delta, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollLeft, clientWidth } = el;
      const abs = Math.abs(scrollLeft);
      const idx = Math.round(abs / Math.max(clientWidth * 0.85, 1));
      setActiveIndex(Math.min(idx, files.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [files.length]);

  if (files.length === 0) return null;

  return (
    <section className="relative">
      <div className="container-editorial py-20 md:py-28">
        <div className="flex items-end justify-between gap-6 reveal">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              subtitle={subtitle}
            />
          </div>

          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label={isRtl ? "السابق" : "Previous"}
              className={[
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all",
                canPrev
                  ? "border-primary/30 bg-background text-primary hover:border-primary hover:bg-primary hover:text-white"
                  : "cursor-not-allowed border-border bg-background/60 text-muted/40",
              ].join(" ")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d={isRtl ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label={isRtl ? "التالي" : "Next"}
              className={[
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all",
                canNext
                  ? "border-primary/30 bg-background text-primary hover:border-primary hover:bg-primary hover:text-white"
                  : "cursor-not-allowed border-border bg-background/60 text-muted/40",
              ].join(" ")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d={isRtl ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative mt-12">
          <div
            ref={trackRef}
            className="
              flex gap-6 overflow-x-auto scroll-smooth pb-4
              snap-x snap-mandatory scroll-pl-6 rtl:scroll-pr-6
              [-ms-overflow-style:none] scrollbar-none
              [&::-webkit-scrollbar]:hidden
            "
          >
            {files.map((file, i) => (
              <div
                key={file._id}
                className="snap-start shrink-0 w-[85%] sm:w-[48%] lg:w-[31.5%]"
                onClick={() => goTo(i)}
              >
                <div className="reveal h-full">
                  <FileCard
                    file={file}
                    locale={locale}
                    labels={{
                      download: cardLabels.download,
                      watchVideo: cardLabels.watchVideo,
                      preview: cardLabels.preview, // ← add
                      views: cardLabels.views,
                      downloads: cardLabels.downloads,
                      isNew: cardLabels.isNew,
                      featured: cardLabels.featured,
                      categories: cardLabels.categories,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 inset-s-0 w-8 bg-linear-to-r from-canvas to-transparent rtl:bg-linear-to-l"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 inset-e-0 w-8 bg-linear-to-l from-canvas to-transparent rtl:bg-linear-to-r"
          />
        </div>

        <div className="mt-8 flex items-center justify-between gap-6 reveal reveal-2">
          <div className="flex items-center gap-1.5">
            {files.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${isRtl ? "انتقل إلى" : "Go to"} ${i + 1}`}
                className={[
                  "h-1.5 rounded-full transition-all",
                  i === activeIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-primary/20 hover:bg-primary/40",
                ].join(" ")}
              />
            ))}
          </div>

          <Link
            href={`/${locale}/library`}
            className="btn-base btn-secondary group inline-flex items-center gap-2"
          >
            {cta}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
