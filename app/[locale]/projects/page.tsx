import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/lib/i18n";
import { contentRepository } from "@/lib/content/repository";
import { buildMetadata } from "@/lib/seo";

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
    title: t.projects.meta.title,
    description: t.projects.meta.description,
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);

  // Load all projects for the current locale.
  const projects = contentRepository.getProjects(locale);

  return (
    <>
      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-editorial py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {t.projects.heading.eyebrow}
            </p>
            <h1 className="heading-display mt-6 text-text">
              {t.projects.heading.title}
            </h1>
            <p className="body-lead mx-auto mt-6 max-w-2xl">
              {t.projects.heading.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. EDITORIAL ROWS ──────────────────────────────── */}
      <section className="relative px-4 sm:px-6 md:px-8">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-5xl divide-y divide-primary-tint border-y border-primary-tint">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={project.url || `/${locale}/projects`}
                className="group grid gap-4 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-12"
              >
                {/* Big index number */}
                <div className="md:col-span-2">
                  <span className="text-5xl font-black tabular-nums text-primary-ghost transition-colors group-hover:text-primary/40 md:text-7xl">
                    0{i + 1}
                  </span>
                </div>

                {/* Title + description */}
                <div className="md:col-span-7">
                  <h2 className="text-2xl font-semibold text-text group-hover:text-primary md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>

                {/* Status badge + arrow */}
                <div className="flex items-center justify-between md:col-span-3 md:justify-end">
                  <span
                    className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${
                      project.status === "live"
                        ? "bg-primary-tint text-primary"
                        : "bg-accent-tint text-accent"
                    }`}
                  >
                    {project.status === "live"
                      ? t.common.status.live
                      : t.common.status.inDevelopment}
                  </span>
                  <span className="text-2xl text-primary transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
