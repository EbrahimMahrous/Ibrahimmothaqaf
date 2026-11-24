"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Play, ExternalLink, Sparkles, Star } from "lucide-react";
import {
  getViewUrl,
  incrementHeroClick,
  incrementHeroView,
  toEmbedUrl,
} from "@/lib/api";
import { FileViewer } from "@/components/sections/library/FileViewer";
import type { HeroImage } from "@/types";

interface HeroPortraitsProps {
  portraits: HeroImage[];
  prevLabel?: string;
  nextLabel?: string;
  labels: {
    viewFile: string;
    watchVideo: string;
    openNewTab: string;
    unsupported: string;
    preview: string;
    download: string;
  };
}

export function HeroPortraits({
  portraits,
  prevLabel = "Previous",
  nextLabel = "Next",
  labels,
}: HeroPortraitsProps) {
  const total = portraits.length;
  const [active, setActive] = useState(Math.floor(total / 2));
  const [paused, setPaused] = useState(false);
  const [videoOpen, setVideoOpen] = useState<HeroImage | null>(null);
  const [hoveredActive, setHoveredActive] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const draggedRef = useRef(false);

  const goPrev = useCallback(
    () => setActive((v) => (v - 1 + total) % total),
    [total],
  );
  const goNext = useCallback(() => setActive((v) => (v + 1) % total), [total]);

  useEffect(() => {
    if (paused || videoOpen) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, total, videoOpen]);

  useEffect(() => {
    const current = portraits[active];
    if (current?._id) incrementHeroView(current._id);
  }, [active, portraits]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

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

  const getOffset = (i: number) => {
    let diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const getFileId = (img: HeroImage): string | null => {
    if (!img.fileId) return null;
    if (typeof img.fileId === "string") return img.fileId;
    return img.fileId._id;
  };

  const current = portraits[active];

  const handleViewFile = (img: HeroImage) => {
    const id = getFileId(img);
    if (!id) return;
    incrementHeroClick(img._id);
    window.open(getViewUrl(id), "_blank", "noopener,noreferrer");
  };

  const handleWatchVideo = (img: HeroImage) => {
    if (!img.videoUrl) return;
    incrementHeroClick(img._id);
    setVideoOpen(img);
  };

  const badgeIcon = (badge: string) => {
    if (badge === "new") return <Sparkles className="h-3 w-3" />;
    if (badge === "featured") return <Star className="h-3 w-3" />;
    if (badge === "video") return <Play className="h-3 w-3" />;
    return null;
  };

  if (total === 0) return null;

  return (
    <div
      className="relative mt-12 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-64 max-w-3xl hero-glow"
      />

      {/* Arrows */}
      <button
        type="button"
        aria-label={prevLabel}
        onClick={goPrev}
        className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-text shadow-card transition-all duration-300 hover:scale-110 hover:text-primary hover:border-primary hover:shadow-lift"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={goNext}
        className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-text shadow-card transition-all duration-300 hover:scale-110 hover:text-primary hover:border-primary hover:shadow-lift"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 3D stage */}
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
            if (abs > 3) return null;

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

            const heightClass =
              abs === 0
                ? "h-[320px] sm:h-[360px] md:h-[420px]"
                : abs === 1
                  ? "h-[280px] sm:h-[320px] md:h-[370px]"
                  : "h-[240px] sm:h-[280px] md:h-[320px]";

            const cardClassName = [
              "hero-card-motion absolute overflow-hidden rounded-2xl cursor-pointer",
              "border border-black/5 bg-hero-card",
              abs === 0
                ? "hero-card-active shadow-[0_30px_60px_-20px_rgba(20,90,66,0.35)] ring-1 ring-primary/20"
                : "shadow-[0_18px_40px_-16px_rgba(20,90,66,0.22)]",
              "w-36 sm:w-44 md:w-52",
              heightClass,
            ].join(" ");

            const cardStyle: React.CSSProperties = {
              transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
              opacity,
              zIndex,
              filter: blur ? `blur(${blur}px)` : undefined,
              transitionDelay: `${abs * 30}ms`,
            };

            const fileId = getFileId(p);
            const hasVideo = !!p.videoUrl;

            const handleCardClick = () => {
              if (draggedRef.current) return;
              if (abs === 0) {
                if (fileId) handleViewFile(p);
                else if (hasVideo) handleWatchVideo(p);
                else if (p.ctaHref) window.location.href = p.ctaHref;
              } else {
                setActive(i);
              }
            };

            return (
              <div
                key={`hero-portrait-${i}`}
                role="button"
                tabIndex={0}
                onClick={handleCardClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick();
                  }
                }}
                aria-label={p.title || p.alt || `Portrait ${i + 1}`}
                aria-current={abs === 0}
                className={cardClassName}
                style={cardStyle}
                onMouseEnter={() => {
                  if (abs === 0) setHoveredActive(true);
                }}
                onMouseLeave={() => {
                  if (abs === 0) setHoveredActive(false);
                }}
              >
                <Image
                  src={p.url}
                  alt={p.alt || p.title || ""}
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                  priority={abs === 0}
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/40 to-transparent"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 to-transparent"
                />

                {p.badge && (
                  <span className="absolute inset-s-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                    {badgeIcon(p.badge)}
                    {p.badge === "new" && "جديد"}
                    {p.badge === "featured" && "مميز"}
                    {p.badge === "video" && "فيديو"}
                  </span>
                )}

                {abs === 0 && (
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    {p.title && (
                      <p className="line-clamp-1 text-xs font-semibold">
                        {p.title}
                      </p>
                    )}
                    {p.description && (
                      <p className="mt-0.5 line-clamp-2 text-[10px] text-white/80">
                        {p.description}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap gap-1">
                      {fileId && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewFile(p);
                          }}
                          className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm hover:bg-white/30"
                        >
                          <BookOpen className="h-3 w-3" />
                          {labels.viewFile}
                        </button>
                      )}
                      {hasVideo && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWatchVideo(p);
                          }}
                          className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm hover:bg-white/30"
                        >
                          <Play className="h-3 w-3" />
                          {labels.watchVideo}
                        </button>
                      )}
                      {p.ctaLabel && p.ctaHref && (
                        <Link
                          href={p.ctaHref}
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementHeroClick(p._id);
                          }}
                          className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm hover:bg-white/30"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {p.ctaLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption + dots */}
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

      {/* Video modal */}
      {videoOpen && videoOpen.videoUrl && (
        <FileViewer
          file={{
            _id: videoOpen._id,
            title: videoOpen.title || videoOpen.alt || "Video",
            description: videoOpen.description || "",
            url: videoOpen.url,
            publicId: videoOpen.publicId,
            size: 0,
            format: "video",
            downloads: 0,
            views: 0,
            category: "other",
            tags: [],
            videoUrl: videoOpen.videoUrl,
            createdAt: videoOpen.createdAt,
          }}
          onClose={() => setVideoOpen(null)}
          labels={{
            preview: labels.preview,
            download: labels.download,
            watchVideo: labels.watchVideo,
            openNewTab: labels.openNewTab,
            unsupported: labels.unsupported,
          }}
        />
      )}
    </div>
  );
}
