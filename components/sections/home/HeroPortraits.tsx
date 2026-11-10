"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Portrait {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  href?: string;
}

interface HeroPortraitsProps {
  portraits: Portrait[];
  prevLabel?: string;
  nextLabel?: string;
}

export function HeroPortraits({
  portraits,
  prevLabel = "Previous",
  nextLabel = "Next",
}: HeroPortraitsProps) {
  const total = portraits.length;

  // Start from the middle portrait so the 3D depth effect is visible on load.
  const [active, setActive] = useState(Math.floor(total / 2));
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hoveredActive, setHoveredActive] = useState(false);

  // Drag tracking — a pointerdown stores the start X; a pointerup computes the delta.
  const dragStartX = useRef<number | null>(null);
  const draggedRef = useRef(false);

  // ─── Navigation ────────────────────────────────────────────
  // Infinite wrap-around prev/next.
  const goPrev = useCallback(
    () => setActive((v) => (v - 1 + total) % total),
    [total],
  );
  const goNext = useCallback(() => setActive((v) => (v + 1) % total), [total]);

  // ─── Auto-play ─────────────────────────────────────────────
  // Pause while hovering, while the lightbox is open, or while dragging.
  useEffect(() => {
    if (paused || lightbox !== null) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % total);
    }, 4500);
    return () => clearInterval(id);
  }, [paused, total, lightbox]);

  // ─── Keyboard shortcuts ────────────────────────────────────
  // Arrows navigate. Escape closes the lightbox.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "Escape") setLightbox(null);
        if (e.key === "ArrowRight")
          setLightbox((v) => (v === null ? v : (v + 1) % total));
        if (e.key === "ArrowLeft")
          setLightbox((v) => (v === null ? v : (v - 1 + total) % total));
        return;
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, lightbox, total]);

  // ─── Drag handlers ─────────────────────────────────────────
  // Swipe left/right to change the active portrait.
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    draggedRef.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current == null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 6) draggedRef.current = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current == null) return;
    const delta = e.clientX - dragStartX.current;
    if (delta > 40) goPrev();
    else if (delta < -40) goNext();
    dragStartX.current = null;
  };

  // ─── Helpers ───────────────────────────────────────────────
  // Wrap an index around the ring so it renders at the shortest visual distance.
  const getOffset = (i: number) => {
    let diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const current = portraits[active];

  return (
    <div
      className="relative mt-12 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow behind the carousel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-64 max-w-3xl hero-glow"
      />

      {/* Previous arrow (hidden on mobile) */}
      <button
        type="button"
        aria-label={prevLabel}
        onClick={goPrev}
        className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-text shadow-card transition-all duration-300 hover:scale-110 hover:text-primary hover:border-primary hover:shadow-lift"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next arrow (hidden on mobile) */}
      <button
        type="button"
        aria-label={nextLabel}
        onClick={goNext}
        className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-text shadow-card transition-all duration-300 hover:scale-110 hover:text-primary hover:border-primary hover:shadow-lift"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 3D stage — every portrait is positioned relative to the active index */}
      <div
        className="hero-stage overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="relative mx-auto flex h-85 sm:h-100 md:h-115 max-w-350 items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1600px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {portraits.map((p, i) => {
            const offset = getOffset(i);
            const abs = Math.abs(offset);

            // Only render the 4 closest portraits (±3) for performance.
            if (abs > 3) return null;

            // ─── Motion math ──────────────────────────────────
            // Portraits further from the center are pushed back, rotated, and blurred.
            const translateX = offset * 130;
            const translateY = abs * 8;
            const translateZ = -abs * 180;
            const rotateY = offset * -12;
            const rotateX = abs === 0 ? 0 : 2;
            const scale =
              1 - abs * 0.08 + (abs === 0 && hoveredActive ? 0.03 : 0);

            const blur = abs === 0 ? 0 : abs === 1 ? 1.5 : 3;
            const opacity =
              abs === 0 ? 1 : abs === 1 ? 0.92 : abs === 2 ? 0.68 : 0.35;
            const zIndex = 40 - abs;

            // Active portrait is taller than its neighbors.
            const heightClass =
              abs === 0
                ? "h-[320px] sm:h-[360px] md:h-[420px]"
                : abs === 1
                  ? "h-[280px] sm:h-[320px] md:h-[370px]"
                  : "h-[240px] sm:h-[280px] md:h-[320px]";

            const cardClassName = [
              "hero-card-motion absolute overflow-hidden rounded-2xl",
              "border border-black/5 bg-hero-card",
              abs === 0
                ? "hero-card-active shadow-[0_30px_60px_-20px_rgba(20,90,66,0.35)] ring-1 ring-primary/20"
                : "shadow-[0_18px_40px_-16px_rgba(20,90,66,0.22)]",
              "w-36 sm:w-44 md:w-52",
              heightClass,
            ].join(" ");

            const cardStyle = {
              transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
              opacity,
              zIndex,
              filter: blur ? `blur(${blur}px)` : undefined,
              transitionDelay: `${abs * 30}ms`,
            };

            // Shared inner markup for both Link and button variants.
            const innerContent = (
              <>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                  priority={abs === 0}
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out"
                />

                {/* Bottom gradient for readability */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/15 to-transparent"
                />

                {/* Title overlay — only on the active portrait */}
                {p.title && abs === 0 && (
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    <p className="line-clamp-1 text-xs font-semibold">
                      {p.title}
                    </p>
                  </div>
                )}
              </>
            );

            // Hover state only applies to the active portrait.
            const hoverEvents = {
              onMouseEnter: () => {
                if (abs === 0) setHoveredActive(true);
              },
              onMouseLeave: () => {
                if (abs === 0) setHoveredActive(false);
              },
            };

            // If a portrait has an href, render it as a Link.
            if (p.href) {
              return (
                <Link
                  key={`hero-portrait-${i}`}
                  href={p.href}
                  aria-label={p.title || p.alt}
                  className={cardClassName}
                  style={cardStyle}
                  {...hoverEvents}
                >
                  {innerContent}
                </Link>
              );
            }

            // Otherwise render it as a button (click = activate or open lightbox).
            return (
              <button
                key={`hero-portrait-${i}`}
                type="button"
                onClick={() => {
                  // Ignore clicks that were actually drags.
                  if (!draggedRef.current) {
                    if (abs === 0) setLightbox(i);
                    else setActive(i);
                  }
                }}
                aria-label={p.title || p.alt || `Portrait ${i + 1}`}
                aria-current={abs === 0}
                className={cardClassName}
                style={cardStyle}
                {...hoverEvents}
              >
                {innerContent}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caption + dot navigation */}
      <div
        key={active}
        className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 text-center"
        style={{ animation: "fadeInUp 500ms ease-out both" }}
      >
        {current?.title && (
          <p className="text-base font-semibold text-text">{current.title}</p>
        )}
        {current?.description && (
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            {current.description}
          </p>
        )}

        <div className="flex items-center justify-center gap-2">
          {portraits.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={`dot-${i}`}
                type="button"
                aria-label={`Go to ${i + 1}`}
                onClick={() => setActive(i)}
                className={[
                  "hero-dot h-1.5 rounded-full",
                  isActive
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-primary/25 hover:bg-primary/50",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      {/* Lightbox — full-screen preview with keyboard + click navigation */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-text/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 inset-e-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Lightbox previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v === null ? v : (v - 1 + total) % total));
            }}
            aria-label={prevLabel}
            className="absolute left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Image container — stopPropagation so inner clicks don't close the lightbox */}
          <div
            className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-3/4 max-h-[85vh] w-full">
              <Image
                src={portraits[lightbox].src}
                alt={portraits[lightbox].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {portraits[lightbox].title && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-6 text-white">
                <p className="text-lg font-semibold">
                  {portraits[lightbox].title}
                </p>
                {portraits[lightbox].description && (
                  <p className="mt-1 text-sm text-white/80">
                    {portraits[lightbox].description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Lightbox next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v === null ? v : (v + 1) % total));
            }}
            aria-label={nextLabel}
            className="absolute right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
