import Link from "next/link";
import { HeroPortraits } from "./HeroPortraits";

interface HeroSectionProps {
  locale: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  features: { title: string; description: string }[];
  portraits: { src: string; alt: string }[];
  carouselLabels?: { prev: string; next: string };
}

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  features,
  portraits,
  carouselLabels,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-24">
      {/* Top content */}
      <div className="container-editorial relative z-10 text-center">
        {eyebrow && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-tint bg-primary-tint px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
        )}

        <h1 className="mx-auto max-w-3xl heading-display text-text">{title}</h1>

        {subtitle && (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
            {subtitle}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryCta.href}
            className="btn-base btn-primary group inline-flex items-center gap-2"
          >
            {primaryCta.label}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            >
              →
            </span>
          </Link>
          <Link href={secondaryCta.href} className="btn-base btn-secondary">
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Depth carousel */}
      <div>
        <HeroPortraits
          portraits={portraits}
          prevLabel={carouselLabels?.prev}
          nextLabel={carouselLabels?.next}
        />
      </div>

      {/* Features strip */}
      <div className="container-editorial mt-20">
        <div className="grid gap-10 border-t border-primary-tint pt-10 md:grid-cols-3 md:gap-6 md:divide-x md:divide-primary/10 rtl:md:divide-x-reverse">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={[
                "group relative reveal md:px-8",
                i === 0 ? "md:ps-0" : "",
                i === features.length - 1 ? "md:pe-0" : "",
                i === 0 ? "reveal-1" : i === 1 ? "reveal-2" : "reveal-3",
              ].join(" ")}
            >
              <span
                aria-hidden
                className="absolute -top-2 text-5xl font-bold tabular-nums text-primary-ghost transition-colors group-hover:text-primary/20 md:-top-3 md:text-6xl"
              >
                0{i + 1}
              </span>

              <div className="relative mb-4 mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-tint bg-background/60 text-primary backdrop-blur-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  {i === 0 && (
                    <path
                      d="M4 20l3.5-1L20 6.5a2.12 2.12 0 0 0-3-3L4.5 16 3.5 20Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  )}
                  {i === 1 && (
                    <path
                      d="M12 3l9 5-9 5-9-5 9-5Zm-9 10l9 5 9-5M3 18l9 5 9-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {i === 2 && (
                    <path
                      d="M4 5v15c0-1 1-2 2-2h14V5c-1 0-3 1-8 1S4 5 4 5Zm8 1v11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>

              <h3 className="relative text-base font-semibold text-text transition-colors group-hover:text-primary">
                {f.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
