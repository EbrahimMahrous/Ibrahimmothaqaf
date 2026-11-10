import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";

interface AboutPreviewProps {
  locale: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  quote: string;
}

export function AboutPreview({
  locale,
  eyebrow,
  title,
  subtitle,
  cta,
  quote,
}: AboutPreviewProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-editorial relative py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          {/* Left: heading + CTA */}
          <div className="md:col-span-7 reveal">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              subtitle={subtitle}
            />

            <div
              aria-hidden
              className="mt-6 h-px w-24 about-underline bg-linear-to-r from-primary/70 to-transparent rtl:bg-linear-to-l"
            />

            <div className="mt-8">
              <Link
                href={`/${locale}/about`}
                className="btn-base btn-secondary group inline-flex items-center gap-2"
              >
                {cta}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: paper card with pen + quote */}
          <div className="md:col-span-5 reveal reveal-2">
            <div className="relative">
              {/* Pen floating over the card */}
              <div
                aria-hidden
                className="absolute -top-7 inset-e-4 z-20 pointer-events-none"
              >
                <span className="pen-icon inline-block rounded-full bg-background p-2 shadow-[0_6px_20px_rgba(20,90,66,0.18)] ring-1 ring-primary/15">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 20l3.5-1L20 6.5a2.12 2.12 0 0 0-3-3L4.5 16 3.5 20Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      className="text-primary"
                    />
                    <path
                      d="M14 6l4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="text-primary"
                    />
                  </svg>
                </span>
              </div>

              {/* Paper card */}
              <div className="card-soft relative overflow-hidden p-8 pt-12">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/60 via-primary/30 to-transparent"
                />

                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="absolute -top-2 inset-e-6 h-24 w-24 text-primary-ghost"
                  fill="currentColor"
                >
                  <path d="M7 7h4v6H7a4 4 0 0 1 0-8Zm10 0h-3v6h3a4 4 0 0 1 0-8Z" />
                </svg>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(22,22,22,0.06) 0 1px, transparent 1px 24px)",
                    maskImage: "linear-gradient(to bottom, transparent, black)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent, black)",
                  }}
                />

                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary/70"
                  aria-hidden
                >
                  <path
                    d="M7 7h4v6H7a4 4 0 0 1 0-8Zm10 0h-3v6h3a4 4 0 0 1 0-8Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>

                <p className="relative mt-4 text-base leading-relaxed text-text/85">
                  {quote}
                </p>

                <div className="relative mt-8 flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/40" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                    Ibrahim
                  </span>
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 rounded-full bg-black/5 blur-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
