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
import { getDownloadUrl } from "@/lib/api";
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
  const [viewerOpen, setViewerOpen] = useState(false);
  const cover = file.coverImage;
  const categoryLabel = labels.categories[file.category] || file.category;

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-tint bg-surface/70 backdrop-blur-sm transition hover:border-primary hover:shadow-(--shadow-soft)">
        {/* Cover */}
        <div className="relative aspect-video bg-primary-tint">
          {cover ? (
            <Image
              src={cover}
              alt={file.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-12 w-12 text-primary/40" />
            </div>
          )}

          {file.isNew && (
            <span className="absolute inset-s-2 top-2 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
              <Sparkles className="h-3 w-3" /> {labels.isNew}
            </span>
          )}
          {file.isFeatured && (
            <span className="absolute inset-e-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
              <Star className="h-3 w-3" /> {labels.featured}
            </span>
          )}

          <span className="absolute bottom-2 inset-s-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
            <FileText className="h-3 w-3" />
            {file.format?.toUpperCase() || "FILE"} · {formatBytes(file.size)}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              {categoryLabel}
            </p>
            <h3 className="mt-1 line-clamp-2 text-base font-semibold text-text">
              {file.title}
            </h3>
            {file.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {file.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Download className="h-3 w-3" />{" "}
              {formatNumber(file.downloads, locale)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" /> {formatNumber(file.views, locale)}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2">
            {file.videoUrl && (
              <button
                onClick={() => setViewerOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
              >
                <Play className="h-4 w-4" />
                {labels.watchVideo}
              </button>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setViewerOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
              >
                <BookOpen className="h-4 w-4" />
                {labels.preview}
              </button>
              <a
                href={getDownloadUrl(file._id)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                {labels.download}
              </a>
            </div>
          </div>
        </div>
      </article>

      {viewerOpen && (
        <FileViewer
          file={file}
          onClose={() => setViewerOpen(false)}
          labels={{
            preview: labels.preview,
            download: labels.download,
            watchVideo: labels.watchVideo,
            openNewTab: locale === "ar" ? "فتح في تاب جديد" : "Open in new tab",
            unsupported:
              locale === "ar"
                ? "المعاينة غير متاحة لهذا النوع، استخدم التنزيل."
                : "Preview not supported for this type. Please download.",
          }}
        />
      )}
    </>
  );
}
