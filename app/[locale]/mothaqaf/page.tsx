import type { Metadata } from "next";
import Image from "next/image";
import { getMessages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { LensClient } from "@/components/sections/mothaqaf/LensCard";

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
    title: t.mothaqaf.meta.title,
    description: t.mothaqaf.meta.description,
    path: "/mothaqaf",
  });
}

export default async function MothaqafPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);

  return (
    <>
      {/* ─── 1. BRAND HERO — logo only ──────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Ambient glows behind the logo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-s-1/2 top-1/3 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-tint blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-e-0 bottom-0 h-64 w-64 rounded-full bg-accent-tint blur-3xl"
        />

        <div className="container-editorial py-20 md:py-32">
          <div className="mx-auto max-w-4xl">
            {/* Meta row: eyebrow + issue number */}
            <div className="flex items-center justify-between border-b border-primary-tint pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {t.mothaqaf.heading.eyebrow}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                {t.mothaqaf.heading.issueLabel} {t.mothaqaf.heading.issueNumber}
              </div>
            </div>

            {/* Logo — the hero element */}
            <div className="relative mt-16 md:mt-24">
              {/* Large ghost number behind the logo */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-s-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(10rem,32vw,24rem)] font-black leading-none tracking-tighter text-primary-ghost"
              >
                {t.mothaqaf.heading.issueNumber}
              </span>

              <div className="relative flex flex-col items-center">
                {/* Top rule */}
                <span
                  aria-hidden
                  className="mb-8 block h-0.75 w-16 bg-primary md:mb-10"
                />

                {/* Logo image */}
                <div className="relative w-full max-w-[min(100%,720px)]">
                  <Image
                    src="/mothaqaf-logo.png"
                    alt={t.mothaqaf.heading.title}
                    width={1200}
                    height={420}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>

                {/* Symmetric bottom rule + dot */}
                <div className="mt-10 flex w-full max-w-md items-center gap-3 md:mt-14">
                  <span className="h-px flex-1 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="h-px flex-1 bg-linear-to-l from-transparent via-primary/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Subtitle — two-column editorial layout */}
            <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  {t.mothaqaf.heading.aboutLabel}
                </p>
              </div>
              <p className="text-lg leading-relaxed text-text/80 md:col-span-9 md:text-xl">
                {t.mothaqaf.heading.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. BENTO — about + lens ────────────────────────── */}
      <section className="relative">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-6">
            {/* About — wide card */}
            <div className="relative overflow-hidden rounded-3xl border border-primary-tint bg-primary-tint p-8 backdrop-blur-sm md:col-span-4 md:p-12">
              <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {t.mothaqaf.about.title}
                </p>
                <p className="mt-6 text-xl font-medium leading-relaxed text-text md:text-2xl">
                  {t.mothaqaf.about.body}
                </p>
              </div>
            </div>

            {/* Lens — vision/mission card */}
            <div className="md:col-span-2">
              <LensClient
                visionTitle={t.mothaqaf.vision.title}
                visionBody={t.mothaqaf.vision.body}
                missionTitle={t.mothaqaf.mission.title}
                missionBody={t.mothaqaf.mission.body}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
