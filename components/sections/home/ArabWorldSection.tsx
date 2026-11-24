"use client";

import { useEffect, useState } from "react";
import { Globe, MapPin, Sparkles } from "lucide-react";
import type { ArabCountry, ArabWorldSectionProps } from "@/types";

const ARAB_COUNTRIES: ArabCountry[] = [
  { code: "eg", flag: "🇪🇬", nameAr: "مصر", nameEn: "Egypt" },
  { code: "sa", flag: "🇸🇦", nameAr: "السعودية", nameEn: "Saudi Arabia" },
  { code: "ae", flag: "🇦🇪", nameAr: "الإمارات", nameEn: "UAE" },
  { code: "kw", flag: "🇰🇼", nameAr: "الكويت", nameEn: "Kuwait" },
  { code: "qa", flag: "🇶🇦", nameAr: "قطر", nameEn: "Qatar" },
  { code: "bh", flag: "🇧🇭", nameAr: "البحرين", nameEn: "Bahrain" },
  { code: "om", flag: "🇴🇲", nameAr: "عمان", nameEn: "Oman" },
  { code: "ye", flag: "🇾🇪", nameAr: "اليمن", nameEn: "Yemen" },
  { code: "jo", flag: "🇯🇴", nameAr: "الأردن", nameEn: "Jordan" },
  { code: "lb", flag: "🇱🇧", nameAr: "لبنان", nameEn: "Lebanon" },
  { code: "sy", flag: "🇸🇾", nameAr: "سوريا", nameEn: "Syria" },
  { code: "ps", flag: "🇵🇸", nameAr: "فلسطين", nameEn: "Palestine" },
  { code: "iq", flag: "🇮🇶", nameAr: "العراق", nameEn: "Iraq" },
  { code: "ma", flag: "🇲🇦", nameAr: "المغرب", nameEn: "Morocco" },
  { code: "dz", flag: "🇩🇿", nameAr: "الجزائر", nameEn: "Algeria" },
  { code: "tn", flag: "🇹🇳", nameAr: "تونس", nameEn: "Tunisia" },
  { code: "ly", flag: "🇱🇾", nameAr: "ليبيا", nameEn: "Libya" },
  { code: "sd", flag: "🇸🇩", nameAr: "السودان", nameEn: "Sudan" },
  { code: "mr", flag: "🇲🇷", nameAr: "موريتانيا", nameEn: "Mauritania" },
  { code: "so", flag: "🇸🇴", nameAr: "الصومال", nameEn: "Somalia" },
  { code: "dj", flag: "🇩🇯", nameAr: "جيبوتي", nameEn: "Djibouti" },
  { code: "km", flag: "🇰🇲", nameAr: "جزر القمر", nameEn: "Comoros" },
];

// Split into 3 rows of 7, 7, 8 countries
const ROWS = [
  ARAB_COUNTRIES.slice(0, 7),
  ARAB_COUNTRIES.slice(7, 14),
  ARAB_COUNTRIES.slice(14),
];

export function ArabWorldSection({
  locale,
  eyebrow,
  title,
  subtitle,
  cta,
  welcomeMessages,
}: ArabWorldSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [visibleMessage, setVisibleMessage] = useState<string>("");

  useEffect(() => {
    if (selected) {
      const country = ARAB_COUNTRIES.find((c) => c.code === selected);
      const name = locale === "ar" ? country?.nameAr : country?.nameEn;
      const template =
        welcomeMessages[selected] ||
        welcomeMessages.default ||
        `أهلاً بك من ${name}`;
      setVisibleMessage(template.replace("{country}", name || ""));
    } else {
      setVisibleMessage("");
    }
  }, [selected, welcomeMessages, locale]);

  return (
    <section className="section relative overflow-hidden">
      <div className="container-editorial relative">
        <div className="mx-auto max-w-3xl text-center reveal">
          <p className="eyebrow-pill mb-4 inline-flex">
            <Globe className="w-3.5 h-3.5" />
            {eyebrow}
          </p>
          <h2 className="heading-section text-text">{title}</h2>
          <p className="body-lead mx-auto mt-4 max-w-xl">{subtitle}</p>
        </div>

        <div className="mt-12 space-y-3 reveal-2">
          {ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="relative overflow-hidden mask-fade-radial"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div
                className={[
                  "flex gap-3 w-max",
                  // RTL: alternate between moving right (forward) and left (reverse)
                  locale === "ar"
                    ? rowIndex % 2 === 0
                      ? "animate-marquee-rtl-forward"
                      : "animate-marquee-rtl-reverse"
                    : rowIndex % 2 === 0
                      ? "animate-marquee-ltr-forward"
                      : "animate-marquee-ltr-reverse",
                ].join(" ")}
                style={{ animationDuration: `${30 + rowIndex * 5}s` }}
              >
                {/* Duplicate the row so the loop is seamless */}
                {[...row, ...row, ...row].map((country, i) => (
                  <CountryCard
                    key={`${country.code}-${i}`}
                    country={country}
                    locale={locale}
                    selected={selected === country.code}
                    onClick={() =>
                      setSelected((prev) =>
                        prev === country.code ? null : country.code,
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center reveal-3">
          <div
            className={`mx-auto max-w-xl rounded-(--radius-lg) border border-primary-tint bg-canvas-alt p-6 transition-all duration-300 ${
              visibleMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            {visibleMessage ? (
              <>
                <Sparkles className="mx-auto mb-3 h-6 w-6 text-primary" />
                <p className="text-lg font-semibold text-text">
                  {visibleMessage}
                </p>
              </>
            ) : (
              <>
                <MapPin className="mx-auto mb-3 h-6 w-6 text-muted" />
                <p className="text-sm text-muted">
                  {locale === "ar"
                    ? "اختر علم بلدك لنرحب بك"
                    : "Select your country's flag to get a welcome message"}
                </p>
              </>
            )}
          </div>

          <a href={cta.href} className="btn-base btn-primary mt-6">
            {cta.label} →
          </a>
        </div>
      </div>

      {/* Marquee animations — defined once per direction */}
      <style jsx>{`
        @keyframes marquee-ltr-forward {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-ltr-reverse {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes marquee-rtl-forward {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(33.333%);
          }
        }
        @keyframes marquee-rtl-reverse {
          from {
            transform: translateX(33.333%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee-ltr-forward {
          animation: marquee-ltr-forward linear infinite;
        }
        .animate-marquee-ltr-reverse {
          animation: marquee-ltr-reverse linear infinite;
        }
        .animate-marquee-rtl-forward {
          animation: marquee-rtl-forward linear infinite;
        }
        .animate-marquee-rtl-reverse {
          animation: marquee-rtl-reverse linear infinite;
        }
      `}</style>
    </section>
  );
}

function CountryCard({
  country,
  locale,
  selected,
  onClick,
}: {
  country: ArabCountry;
  locale: string;
  selected: boolean;
  onClick: () => void;
}) {
  const name = locale === "ar" ? country.nameAr : country.nameEn;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex shrink-0 flex-col items-center gap-1.5 rounded-md border bg-surface px-4 py-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        selected
          ? "border-primary ring-2 ring-primary/30 bg-primary-tint"
          : "border-border hover:border-primary"
      }`}
      aria-label={name}
      aria-pressed={selected}
    >
      <span className="text-3xl leading-none">{country.flag}</span>
      <span
        className={`text-xs font-medium ${
          selected ? "text-primary" : "text-muted group-hover:text-text"
        }`}
      >
        {name}
      </span>
    </button>
  );
}
