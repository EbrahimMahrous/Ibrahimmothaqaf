"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  Download,
  Play,
  FileText,
  ExternalLink,
  AlertCircle,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { getDownloadUrl, getViewUrl, toEmbedUrl } from "@/lib/api";
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

type Tab = "document" | "video";

export function FileViewer({ file, onClose, labels }: FileViewerProps) {
  const [tab, setTab] = useState<Tab>("document");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Open fullscreen by default so the PDF/video fills the screen.
  const [expanded, setExpanded] = useState(true);

  // On localhost, use the Cloudinary URL directly in the iframe.
  // In production, use the backend /view endpoint (forces correct headers).
  const viewUrl = useMemo(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      return file.url;
    }
    return getViewUrl(file._id);
  }, [file._id, file.url]);

  const downloadUrl = useMemo(() => getDownloadUrl(file._id), [file._id]);
  const embedUrl = useMemo(
    () => (file.videoUrl ? toEmbedUrl(file.videoUrl) : null),
    [file.videoUrl],
  );

  const mime = file.mimeType || "";
  const isPdf =
    mime === "application/pdf" || file.format?.toLowerCase() === "pdf";
  const isImage = mime.startsWith("image/");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 backdrop-blur-md sm:p-2"
      onClick={onClose}
    >
      <div
        className={[
          "flex w-full flex-col overflow-hidden bg-surface shadow-2xl transition-all duration-300",
          expanded
            ? "h-screen w-screen max-w-none rounded-none"
            : "h-[85vh] w-[90vw] max-w-5xl rounded-2xl",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-primary-tint bg-surface px-4 py-2.5">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-text sm:text-base">
              {file.title}
            </h3>
            <p className="truncate text-[11px] text-muted">
              {file.format?.toUpperCase()} · {file.category}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Minimize" : "Maximize"}
              className="inline-flex rounded-full p-2 text-muted hover:bg-primary-tint hover:text-primary"
            >
              {expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
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
              className="rounded-full p-2 text-muted hover:bg-primary-tint hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {embedUrl && (
          <div className="flex shrink-0 gap-1 border-b border-primary-tint bg-surface px-4">
            <button
              onClick={() => setTab("document")}
              className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition ${
                tab === "document"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              <FileText className="h-4 w-4" />
              {labels.preview}
            </button>
            <button
              onClick={() => setTab("video")}
              className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition ${
                tab === "video"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              <Play className="h-4 w-4" />
              {labels.watchVideo}
            </button>
          </div>
        )}

        {/* Body — fills remaining height */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-canvas-alt">
          {tab === "document" &&
            (isPdf || isImage ? (
              <>
                {loading && !error && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-canvas-alt">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
                {error ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                    <p className="text-sm text-muted">{labels.unsupported}</p>
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary px-4 py-1.5 text-sm text-primary hover:bg-primary hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {labels.openNewTab}
                    </a>
                  </div>
                ) : isPdf ? (
                  <iframe
                    src={viewUrl}
                    title={file.title}
                    className="absolute inset-0 h-full w-full border-0"
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setError(true);
                    }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={viewUrl}
                    alt={file.title}
                    className="absolute inset-0 h-full w-full object-contain p-2"
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setError(true);
                    }}
                  />
                )}
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <FileText className="h-10 w-10 text-primary/40" />
                <p className="text-sm text-muted">{labels.unsupported}</p>
                <a
                  href={downloadUrl}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm text-white hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  {labels.download}
                </a>
              </div>
            ))}

          {tab === "video" && embedUrl && (
            <iframe
              src={embedUrl}
              title={file.title}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
