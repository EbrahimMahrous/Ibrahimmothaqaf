import type { Guide } from "@/lib/content/types";

interface GuideCardProps {
  guide: Guide;
  labels: {
    download: string;
    video: string;
    views: string;
    downloads: string;
    isNew: string;
    categories: Record<string, string>;
  };
  /** Locale used for number formatting. */
  locale?: "ar" | "en";
}

function formatNumber(n: number, locale: "ar" | "en"): string {
  const tag = locale === "ar" ? "ar-EG" : "en-US";
  if (n >= 1000) {
    return new Intl.NumberFormat(tag, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return new Intl.NumberFormat(tag).format(n);
}

export function GuideCard({ guide, labels, locale = "ar" }: GuideCardProps) {
  return (
    <article className="card-soft group relative flex h-full flex-col overflow-hidden p-6">
      {/* Top hairline highlight */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top row: video number + isNew + category badge */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-tint px-2.5 py-1 text-[11px] font-semibold text-primary">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path d="M8 5l11 7-11 7V5Z" fill="currentColor" />
            </svg>
            {labels.video} {guide.videoNumber}
          </span>
          {guide.isNew && (
            <span className="badge bg-accent-tint text-accent">
              {labels.isNew}
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium text-muted">
          {labels.categories[guide.category]}
        </span>
      </div>

      <h3 className="heading-card text-text">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {guide.description}
      </p>

      {/* Stats */}
      <div className="mt-5 flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          {formatNumber(guide.stats.views, locale)}
        </span>
        <span className="inline-flex items-center gap-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {formatNumber(guide.stats.downloads, locale)}
        </span>
      </div>

      <a
        href={guide.pdfUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
      >
        {labels.download}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
        >
          ↓
        </span>
      </a>
    </article>
  );
}
