"use client";

import { useEffect, useMemo } from "react";
import { X, Download, ExternalLink, AlertCircle } from "lucide-react";
import { getDownloadUrl, toEmbedUrl } from "@/lib/api";
import type { DownloadFile } from "@/types";

interface FileViewerProps {
  file: DownloadFile;
  onClose: () => void;
  labels: {
    preview: string;
    download: string;
    watchVideo: string;
    openNewTab: string;
    unsupported: string;
  };
}

export function FileViewer({ file, onClose, labels }: FileViewerProps) {
  const downloadUrl = useMemo(() => getDownloadUrl(file._id), [file._id]);
  const embedUrl = useMemo(
    () => (file.videoUrl ? toEmbedUrl(file.videoUrl) : null),
    [file.videoUrl],
  );

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    // Full screen — no padding, no rounding, no card
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Slim top bar */}
      <div className="flex shrink-0 items-center justify-between gap-3 bg-black/90 px-3 py-2 sm:px-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white sm:text-base">
            {file.title}
          </h3>
          <p className="truncate text-[11px] text-white/60">
            {file.format?.toUpperCase()} · {file.category}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{labels.download}</span>
          </a>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Video fills the rest of the screen */}
      <div className="relative min-h-0 flex-1">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={file.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <p className="text-sm text-white/70">{labels.unsupported}</p>
            {file.videoUrl && (
              <a
                href={file.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
                {labels.openNewTab}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
