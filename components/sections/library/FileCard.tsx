"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Eye,
  FileText,
  Play,
  Sparkles,
  Star,
  BookOpen,
} from "lucide-react";
import { getDownloadUrl, getViewUrl } from "@/lib/api";
import { FileViewer } from "./FileViewer";
import type { FileCardProps } from "@/types";

function formatNumber(n: number, locale: "ar" | "en"): string {
  const tag = locale === "ar" ? "ar-EG" : "en-US";
  return new Intl.NumberFormat(tag, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

function formatBytes(bytes: number): string {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export function FileCard({ file, locale, labels }: FileCardProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const categoryLabel = labels.categories[file.category] || file.category;

  const handlePreview = () => {
    window.open(getViewUrl(file._id), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-tint bg-surface/70 backdrop-blur-sm transition hover:border-primary hover:shadow-(--shadow-soft)">
        {/* Large cover */}
        <div className="relative aspect-4/5 bg-primary-tint overflow-hidden">
          {file.coverImage ? (
            <Image
              src={file.coverImage}
              alt={file.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-16 w-16 text-primary/40" />
            </div>
          )}

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          {/* Badges */}
          {file.isNew && (
            <span className="absolute inset-s-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-white z-10">
              <Sparkles className="h-3 w-3" /> {labels.isNew}
            </span>
          )}
          {file.isFeatured && (
            <span className="absolute inset-e-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white z-10">
              <Star className="h-3 w-3" /> {labels.featured}
            </span>
          )}

          {/* Bottom content on cover */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="text-[10px] uppercase tracking-wider text-white/70">
              {categoryLabel}
            </p>
            <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-tight">
              {file.title}
            </h3>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-white/70">
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {file.format?.toUpperCase() || "FILE"}
              </span>
              <span>·</span>
              <span>{formatBytes(file.size)}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatNumber(file.views, locale)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center gap-2 p-3">
          <button
            onClick={handlePreview}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            <BookOpen className="h-3.5 w-3.5" />
            {labels.preview}
          </button>
          <a
            href={getDownloadUrl(file._id)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            {labels.download}
          </a>
          {file.videoUrl && (
            <button
              onClick={() => setVideoOpen(true)}
              aria-label={labels.watchVideo}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition hover:opacity-90"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
        </div>
      </article>

      {videoOpen && (
        <FileViewer
          file={file}
          onClose={() => setVideoOpen(false)}
          labels={{
            preview: labels.preview,
            download: labels.download,
            watchVideo: labels.watchVideo,
            openNewTab: locale === "ar" ? "فتح في تاب جديد" : "Open in new tab",
            unsupported:
              locale === "ar"
                ? "المعاينة غير متاحة."
                : "Preview not supported.",
          }}
        />
      )}
    </>
  );
}
