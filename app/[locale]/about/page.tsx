import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { AnimatedAvatar } from "@/components/layout/AnimatedAvatar";
import { KaraokeBio } from "@/components/sections/about/BioKaraoke";
import { VisionMissionLens } from "@/components/sections/about/VisionMissionLens";

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
    title: t.about.meta.title,
    description: t.about.meta.description,
    path: "/about",
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);

  // Avatar role labels — pulled from common.roles.
  const roleLabels = [
    {
      text: t.common.roles.operations,
      position: "end" as const,
      tone: "primary" as const,
    },
    {
      text: t.common.roles.content,
      position: "top" as const,
      tone: "primary" as const,
    },
    {
      text: t.common.roles.impact,
      position: "start" as const,
      tone: "accent" as const,
    },
  ];

  return (
    <>
      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative">
        <div className="container-editorial py-16 sm:py-20 md:py-28 text-center">
          <div className="relative mx-auto inline-flex">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -m-6 rounded-full bg-primary-tint blur-2xl sm:-m-10 md:-m-14 lg:-m-20"
            />

            <AnimatedAvatar
              locale={locale}
              className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-52 md:w-52 lg:h-64 lg:w-64 xl:h-72 xl:w-72 2xl:h-80 2xl:w-80"
              showStatus
              statusSize={0.2}
              labels={roleLabels}
              showLabelsOnMobile
            />
          </div>

          <h1 className="heading-display mt-10 text-text sm:mt-12">
            {t.about.heading.title}
          </h1>
          <p className="body-lead mt-5 mx-auto max-w-2xl sm:mt-6">
            {t.about.heading.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
            <Link
              href={`/${locale}/projects`}
              className="btn-base btn-primary group"
            >
              {t.about.heading.viewProjectsCta}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              >
                →
              </span>
            </Link>
            <a
              href="mailto:hello@ibrahimmahrous.com"
              className="btn-base btn-secondary"
            >
              {t.about.heading.contactCta}
            </a>
          </div>
        </div>
      </section>

      {/* ─── 2. MANIFESTO ────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-2xl">
            <div className="relative -rotate-1 rounded-2xl border border-primary-tint bg-background/60 p-8 backdrop-blur-sm md:-rotate-2 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {t.about.manifesto.eyebrow}
              </p>
              <p className="mt-6 text-2xl font-medium leading-relaxed text-text md:text-3xl">
                {t.about.manifesto.quote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. BIO (karaoke style) ───────────────────────────── */}
      <section className="relative">
        <div className="container-editorial py-20 md:py-28">
          <KaraokeBio
            paragraphs={t.about.bio.paragraphs}
            title={t.about.bio.title}
            speed={180}
          />
        </div>
      </section>

      {/* ─── 4. VISION & MISSION (lens) ──────────────────────── */}
      <div className="relative border-t border-primary-tint">
        <VisionMissionLens
          visionTitle={t.about.vision.title}
          visionBody={t.about.vision.body}
          missionTitle={t.about.mission.title}
          missionBody={t.about.mission.body}
        />
      </div>

      {/* ─── 5. PRINCIPLES (horizontal scroll) ───────────────── */}
      <section className="relative">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="heading-section mb-12 text-text">
              {t.about.principles.title}
            </h2>
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none">
              {t.about.principles.items.map((p, i) => (
                <div
                  key={p.title}
                  className="w-[80%] sm:w-[48%] md:w-[40%] shrink-0 snap-start rounded-2xl border border-primary-tint bg-background/40 p-6 backdrop-blur-sm md:p-8"
                >
                  <span className="text-3xl font-black text-primary-ghost">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-text">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
