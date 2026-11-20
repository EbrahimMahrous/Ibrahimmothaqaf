import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LibraryStats } from "@/components/sections/library/LibraryStats";
import { LibraryGrid } from "@/components/sections/library/LibraryGrid";
import { fetchFiles } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";

// Disable instant navigation validation for this segment.
export const instant = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(locale);
  return buildMetadata({
    locale,
    title: t.library.meta.title,
    description: t.library.meta.description,
    path: "/library",
  });
}

// Cache file list — refreshed via revalidateTag('files')
async function getCachedFiles() {
  "use cache";
  cacheLife("minutes");
  cacheTag("files");
  return await fetchFiles();
}

export default async function LibraryPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);
  const l = (locale === "en" ? "en" : "ar") as "ar" | "en";

  const files = await getCachedFiles();

  // Map backend files into the shape expected by LibraryGrid.
  const guides = files.map((f) => ({
    id: f._id,
    slug: f._id,
    title: f.title,
    description: f.description,
    cover: "/images/placeholder.jpg",
    category: "files",
    stats: {
      views: 0,
      downloads: f.downloads,
    },
    video: false,
    downloadUrl: f.url,
    createdAt: f.createdAt,
    language: l,
  }));

  const totalDownloads = files.reduce((s, f) => s + f.downloads, 0);

  return (
    <>
      <section className="section relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 inset-s-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-tint blur-3xl"
        />
        <div className="container-editorial relative reveal">
          <SectionHeading
            eyebrow={t.library.heading.eyebrow}
            title={t.library.heading.title}
            subtitle={t.library.heading.subtitle}
            align="center"
          />

          <div className="mx-auto mt-10 max-w-3xl">
            <LibraryStats
              totalVideos={files.length}
              totalDownloads={totalDownloads}
              totalViews={0}
              labels={t.library.stats}
              locale={l}
            />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-editorial">
          <LibraryGrid
            guides={guides as any}
            locale={l}
            labels={{
              filters: t.library.filters,
              categories: t.library.categories,
              card: {
                download: t.library.card.download,
                video: t.library.card.video,
                views: t.library.stats.views,
                downloads: t.library.stats.downloads,
                isNew: t.library.card.new,
              },
            }}
          />
        </div>
      </section>
    </>
  );
}
