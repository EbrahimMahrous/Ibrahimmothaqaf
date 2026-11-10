"use client";

import { useEffect, useMemo, useState } from "react";

interface KaraokeBioProps {
  paragraphs: string[];
  title?: string;
  speed?: number;
}

export function KaraokeBio({
  paragraphs,
  title,
  speed = 180,
}: KaraokeBioProps) {
  // Flatten all words across paragraphs while keeping their source index.
  const allWords = useMemo(
    () =>
      paragraphs.flatMap((p, pi) =>
        p.split(" ").map((word, wi) => ({ word, pi, wi })),
      ),
    [paragraphs],
  );

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [started, setStarted] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  // Start the reading animation once the section enters the viewport.
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref, started]);

  // Advance one word at a time while playing.
  useEffect(() => {
    if (!started) return;
    if (!playing || hovered) return;
    if (active >= allWords.length - 1) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setActive((a) => a + 1), speed);
    return () => clearTimeout(id);
  }, [active, playing, speed, allWords.length, hovered, started]);

  const activeParagraph =
    active < allWords.length ? allWords[active].pi : paragraphs.length - 1;

  const progress =
    allWords.length > 1 ? (active / (allWords.length - 1)) * 100 : 0;

  return (
    <div ref={setRef} className="relative">
      <div className="mx-auto max-w-3xl">
        {title && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {title}
          </p>
        )}

        <div className="mt-12 space-y-12 md:space-y-16">
          {paragraphs.map((p, pi) => {
            const isActivePara = pi === activeParagraph;
            const isDonePara = pi < activeParagraph;
            const words = p.split(" ");

            return (
              <div key={pi} className="relative">
                {/* Large ghost number behind the paragraph */}
                <span
                  aria-hidden
                  className={[
                    "pointer-events-none absolute -inset-s-4 -top-8 select-none text-[100px] font-black leading-none tabular-nums transition-all duration-700 md:-inset-s-10 md:-top-14 md:text-[160px]",
                    isActivePara
                      ? "text-primary-ghost"
                      : isDonePara
                        ? "text-primary/6"
                        : "text-primary/3",
                  ].join(" ")}
                >
                  0{pi + 1}
                </span>

                <div className="relative grid gap-4 md:grid-cols-12 md:gap-8">
                  {/* Number badge + side indicator */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-3">
                      <span
                        className={[
                          "inline-flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold tabular-nums transition-all duration-500",
                          isActivePara
                            ? "bg-primary text-white shadow-soft"
                            : isDonePara
                              ? "bg-primary-tint-strong text-primary"
                              : "bg-primary/5 text-primary/40",
                        ].join(" ")}
                      >
                        0{pi + 1}
                      </span>

                      <span
                        aria-hidden
                        className={[
                          "mt-1 h-10 w-0.5 rounded-full transition-all duration-500",
                          isActivePara
                            ? "bg-primary"
                            : isDonePara
                              ? "bg-primary/40"
                              : "bg-primary/10",
                        ].join(" ")}
                      />
                    </div>
                  </div>

                  {/* Paragraph text — flex + gap for word spacing */}
                  <p className="flex flex-wrap items-baseline gap-x-[0.3em] gap-y-1 text-lg leading-[1.9] text-text/80 md:col-span-10 md:text-xl md:leading-[1.85]">
                    {words.map((word, wi) => {
                      const globalIdx = allWords.findIndex(
                        (w) => w.pi === pi && w.wi === wi,
                      );
                      const isPast =
                        pi < activeParagraph ||
                        (pi === activeParagraph && globalIdx < active);
                      const isCurrent =
                        pi === activeParagraph &&
                        globalIdx === active &&
                        playing;

                      return (
                        <span
                          key={wi}
                          className={[
                            "inline-block transition-colors duration-300 ease-out",
                            isCurrent
                              ? "font-semibold text-primary"
                              : isPast
                                ? "text-text"
                                : "text-text/40",
                          ].join(" ")}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar + controls */}
        <div className="mt-16 flex items-center gap-4">
          <div className="relative h-0.75 flex-1 overflow-hidden rounded-full bg-primary-tint">
            <div
              className="absolute inset-y-0 inset-s-0 rounded-full bg-primary transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="shrink-0 text-[10px] font-semibold tabular-nums tracking-[0.15em] text-muted">
            {Math.round(progress)}%
          </span>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "إيقاف" : "تشغيل"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary-tint text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {playing ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7L8 5Z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setActive(0);
                setPlaying(true);
              }}
              aria-label="إعادة"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary-tint text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 12a8 8 0 1 1 2.34 5.66M4 12V6m0 6h6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
