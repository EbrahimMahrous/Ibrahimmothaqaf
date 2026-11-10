interface LibraryStatsProps {
  totalVideos: number;
  totalDownloads: number;
  totalViews: number;
  labels: { videos: string; downloads: string; views: string };
  /** Locale used for number formatting. */
  locale?: "ar" | "en";
}

function formatNumber(n: number, locale: "ar" | "en"): string {
  const tag = locale === "ar" ? "ar-EG" : "en-US";
  return new Intl.NumberFormat(tag, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function LibraryStats({
  totalVideos,
  totalDownloads,
  totalViews,
  labels,
  locale = "ar",
}: LibraryStatsProps) {
  const items = [
    { label: labels.videos, value: formatNumber(totalVideos, locale) },
    { label: labels.downloads, value: formatNumber(totalDownloads, locale) },
    { label: labels.views, value: formatNumber(totalViews, locale) },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 rounded-2xl border border-primary-tint bg-surface/70 p-6 backdrop-blur-sm">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <p className="text-2xl font-bold text-text">{it.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted">
            {it.label}
          </p>
        </div>
      ))}
    </div>
  );
}
