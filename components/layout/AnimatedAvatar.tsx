"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { siteConfig, type Locale } from "@/config/site.config";

type Variant =
  | "stacked"
  | "pill"
  | "gradient"
  | "initial"
  | "highlight"
  | "outline"
  | "glass"
  | "watermark"
  // New variants
  | "neon"
  | "split"
  | "code"
  | "mono"
  | "ribbon";

type LabelPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "start"
  | "end";

interface FloatingLabel {
  text: string;
  position?: LabelPosition;
  tone?: "primary" | "accent" | "muted";
}

interface AnimatedAvatarProps {
  locale: string;
  /** Fixed size in px (used when className is not provided). */
  size?: number;
  /** Responsive size classes (takes precedence over size). */
  className?: string;
  showStatus?: boolean;
  /** Status dot size as a fraction of the avatar (0.2 = 20%). */
  statusSize?: number;
  showName?: boolean;
  variant?: Variant;
  nameClassName?: string;
  tagline?: string;
  /** Floating labels around the avatar. */
  labels?: FloatingLabel[];
  /** Whether to show the labels on mobile. */
  showLabelsOnMobile?: boolean;
  /** Enable 3D tilt on mouse move (default: false). */
  tilt?: boolean;
  /** Enable particle orbit around the avatar (default: true). */
  orbit?: boolean;
  /** Enable gradient ring (default: true). */
  gradientRing?: boolean;
}

const positionClasses: Record<
  LabelPosition,
  { mobile: string; desktop: string }
> = {
  top: {
    mobile: "start-1/2 -top-3 -translate-x-1/2 rtl:translate-x-1/2",
    desktop: "md:-top-4",
  },
  "top-start": {
    mobile: "-start-3 -top-3",
    desktop: "md:-start-4 md:-top-4",
  },
  "top-end": {
    mobile: "-end-3 -top-3",
    desktop: "md:-end-4 md:-top-4",
  },
  bottom: {
    mobile: "start-1/2 -bottom-3 -translate-x-1/2 rtl:translate-x-1/2",
    desktop: "md:-bottom-4",
  },
  "bottom-start": {
    mobile: "-start-3 -bottom-3",
    desktop: "md:-start-4 md:-bottom-4",
  },
  "bottom-end": {
    mobile: "-end-3 -bottom-3",
    desktop: "md:-end-4 md:-bottom-4",
  },
  start: {
    mobile: "-start-3 top-1/2 -translate-y-1/2",
    desktop: "md:-start-4",
  },
  end: {
    mobile: "-end-3 top-1/2 -translate-y-1/2",
    desktop: "md:-end-4",
  },
};

const toneClasses: Record<"primary" | "accent" | "muted", string> = {
  primary: "border-primary-tint text-primary",
  accent: "border-accent/20 text-accent",
  muted: "border-border text-muted",
};

export function AnimatedAvatar({
  locale,
  size,
  className,
  showStatus = true,
  statusSize = 0.22,
  showName = false,
  variant = "watermark",
  nameClassName = "",
  tagline,
  labels,
  showLabelsOnMobile = true,
  tilt = false,
  orbit = true,
  gradientRing = true,
}: AnimatedAvatarProps) {
  const l = locale as Locale;
  const name = siteConfig.siteName[l];
  const first = l === "ar" ? "إبراهيم" : "Ibrahim";
  const last = l === "ar" ? "محروس" : "Mahrous";
  const role =
    tagline ??
    (l === "ar" ? "مُثَقَّف يصنع فكرًا ويترك أثرًا" : "Ideas That Inspire");
  const initial = name.charAt(0);

  const usingClassSize = typeof className === "string" && className.length > 0;
  const wrapperStyle = usingClassSize
    ? undefined
    : { width: size ?? 40, height: size ?? 40 };

  const hasLabels = labels && labels.length > 0;

  // ─── 3D tilt ────────────────────────────────────────────
  const tiltRef = useRef<HTMLSpanElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 12;
    setTiltStyle({
      transform: `perspective(600px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setTiltStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.4s ease-out",
    });
  };

  return (
    <span className="inline-flex items-center gap-3">
      {/* ═══════════ Avatar + floating labels container ═══════════ */}
      <span
        ref={tiltRef}
        className="relative inline-flex shrink-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        {/* Particle orbit */}
        {orbit && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="absolute rounded-full bg-primary/60"
                style={{
                  width: "3px",
                  height: "3px",
                  top: "50%",
                  left: "50%",
                  animation: `avatar-orbit-${i} ${6 + i * 1.5}s linear infinite`,
                  transformOrigin: "center",
                }}
              />
            ))}
          </span>
        )}

        {/* Avatar */}
        <span
          className={`avatar-wrap group relative inline-flex items-center justify-center ${
            usingClassSize ? className : ""
          }`}
          style={wrapperStyle}
          aria-label={name}
        >
          {/* Gradient ring (outer) */}
          <span
            aria-hidden
            className={`avatar-ring-outer absolute inset-0 rounded-full ${
              gradientRing ? "" : "border border-dashed border-primary/40"
            }`}
            style={
              gradientRing
                ? {
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, var(--color-primary) 90deg, transparent 180deg, var(--color-accent) 270deg, transparent 360deg)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
                    animation: "avatar-spin 8s linear infinite",
                  }
                : undefined
            }
          />

          {/* Inner ring */}
          <span
            aria-hidden
            className="avatar-ring-inner absolute inset-[10%] rounded-full border border-primary/30"
          />

          {/* Arc (legacy decorative) */}
          <span
            aria-hidden
            className="avatar-arc absolute inset-0 rounded-full"
          />

          {/* Pulse on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary opacity-0 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
          />

          {/* Image */}
          <span className="relative z-10 flex h-[72%] w-[72%] items-center justify-center overflow-hidden rounded-full bg-surface ring-1 ring-border">
            <Image
              src="/avatar.jpeg"
              alt={name}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 224px, 256px"
              priority
              className="object-cover"
            />
          </span>

          {/* Status dot */}
          {showStatus && (
            <span
              aria-hidden
              className="absolute z-20 rounded-full bg-primary ring-2 ring-background"
              style={{
                width: `${statusSize * 100}%`,
                height: `${statusSize * 100}%`,
                insetInlineEnd: "2%",
                bottom: "2%",
              }}
            >
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
            </span>
          )}
        </span>

        {/* ═══════════ Floating labels ═══════════ */}
        {hasLabels && (
          <>
            {labels.map((label, i) => {
              const pos = label.position ?? "end";
              const tone = label.tone ?? "primary";
              const posCls = positionClasses[pos];
              return (
                <span
                  key={`${label.text}-${i}`}
                  className={[
                    "absolute z-30 whitespace-nowrap rounded-full border bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm",
                    "transition-all duration-300",
                    toneClasses[tone],
                    showLabelsOnMobile
                      ? posCls.mobile
                      : "hidden md:inline-flex",
                    posCls.desktop,
                  ].join(" ")}
                >
                  {label.text}
                </span>
              );
            })}
          </>
        )}
      </span>

      {/* ═══════════ Text logo — variants ═══════════ */}

      {/* ─── Existing variants ─────────────────────────────── */}

      {showName && variant === "watermark" && (
        <span className="relative flex flex-col leading-none">
          {/* <span
            aria-hidden
            className="mb-2 h-0.5 w-8 rounded-full bg-primary"
          /> */}
          <span className="relative inline-flex items-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-s-3 -top-5 select-none text-[3.75em] font-black leading-none text-primary/8"
            >
              {initial}
            </span>
            <span
              className={`relative font-bold tracking-tight text-text ${
                nameClassName || "text-[15px]"
              }`}
            >
              {name}
            </span>
          </span>
          <span className="mt-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            {role}
          </span>
        </span>
      )}

      {showName && variant === "stacked" && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-extrabold tracking-tight text-text ${
              nameClassName || "text-[15px]"
            }`}
          >
            {first}
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
            {last}
          </span>
        </span>
      )}

      {showName && variant === "pill" && (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-tint bg-primary-tint px-3 py-1.5 backdrop-blur-sm">
          <span
            className={`font-bold tracking-tight text-text ${
              nameClassName || "text-[14px]"
            }`}
          >
            {name}
          </span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary/80">
            {l === "ar" ? "مثقّف" : "Thinker"}
          </span>
        </span>
      )}

      {showName && variant === "gradient" && (
        <span className="relative inline-flex items-center overflow-hidden rounded-lg border border-primary/10">
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-primary/15 via-primary/5 to-transparent"
          />
          <span
            className={`relative px-3 py-1.5 font-bold tracking-tight text-text ${
              nameClassName || "text-[14px]"
            }`}
          >
            {name}
          </span>
        </span>
      )}

      {showName && variant === "initial" && (
        <span className="inline-flex items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary text-xs font-bold text-white">
            {initial}
          </span>
          <span
            className={`font-semibold tracking-tight text-text ${
              nameClassName || "text-[14px]"
            }`}
          >
            {name.slice(1)}
          </span>
        </span>
      )}

      {showName && variant === "highlight" && (
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-1 top-1 z-0 rounded-sm bg-primary/12"
          />
          <span
            className={`relative px-1 font-bold tracking-tight text-text ${
              nameClassName || "text-[14px]"
            }`}
          >
            {name}
          </span>
        </span>
      )}

      {showName && variant === "outline" && (
        <span
          className={`font-extrabold tracking-tight ${
            nameClassName || "text-[16px]"
          }`}
          style={{
            WebkitTextStroke: "1.2px var(--color-primary)",
            color: "transparent",
          }}
        >
          {name}
        </span>
      )}

      {showName && variant === "glass" && (
        <span className="inline-flex items-center rounded-xl border border-primary/20 bg-background/60 px-3 py-1.5 shadow-sm backdrop-blur-xl">
          <span
            className={`font-bold tracking-tight text-text ${
              nameClassName || "text-[14px]"
            }`}
          >
            {name}
          </span>
        </span>
      )}

      {/* ─── New variants ──────────────────────────────────── */}

      {/* NEON — glowing name with text-shadow */}
      {showName && variant === "neon" && (
        <span className="relative inline-flex items-center">
          <span
            className={`relative font-bold tracking-tight ${
              nameClassName || "text-[15px]"
            }`}
            style={{
              color: "var(--color-primary)",
              textShadow:
                "0 0 6px var(--color-primary), 0 0 16px var(--color-primary), 0 0 30px var(--color-primary)",
            }}
          >
            {name}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-xl"
            style={{
              background: "var(--color-primary)",
              opacity: 0.18,
            }}
          />
        </span>
      )}

      {/* SPLIT — first name big, last name small */}
      {showName && variant === "split" && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-bold tracking-tight text-text ${
              nameClassName || "text-[15px]"
            }`}
          >
            {name.split(" ")[0] || name}
          </span>
          {name.split(" ").length > 1 && (
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {name.split(" ").slice(1).join(" ")}
            </span>
          )}
        </span>
      )}

      {/* CODE — <name/> in monospace */}
      {showName && variant === "code" && (
        <span className="inline-flex items-center gap-0.5 rounded-md border border-primary/20 bg-canvas-alt px-2.5 py-1 font-mono">
          <span className="text-xs text-primary/60">&lt;</span>
          <span
            className={`font-semibold text-text ${
              nameClassName || "text-[13px]"
            }`}
          >
            {name}
          </span>
          <span className="text-xs text-primary/60">/&gt;</span>
        </span>
      )}

      {/* MONO — uppercase monospace */}
      {showName && variant === "mono" && (
        <span
          className={`font-mono font-semibold uppercase tracking-[0.2em] text-text ${
            nameClassName || "text-[13px]"
          }`}
        >
          {name}
        </span>
      )}

      {/* RIBBON — name with colored ribbon behind */}
      {showName && variant === "ribbon" && (
        <span className="relative inline-flex items-center">
          <span
            aria-hidden
            className="absolute -inset-x-2 inset-y-0 -z-10 rounded-full bg-primary"
          />
          <span
            className={`relative font-bold tracking-tight text-white ${
              nameClassName || "text-[14px]"
            }`}
          >
            {name}
          </span>
        </span>
      )}

      {/* ═══════════ Animations ═══════════ */}
      <style jsx>{`
        @keyframes avatar-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes avatar-orbit-0 {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(28px)
              rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(28px)
              rotate(-360deg);
          }
        }
        @keyframes avatar-orbit-1 {
          from {
            transform: translate(-50%, -50%) rotate(90deg) translateX(34px)
              rotate(-90deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(450deg) translateX(34px)
              rotate(-450deg);
          }
        }
        @keyframes avatar-orbit-2 {
          from {
            transform: translate(-50%, -50%) rotate(180deg) translateX(24px)
              rotate(-180deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(540deg) translateX(24px)
              rotate(-540deg);
          }
        }
        @keyframes avatar-orbit-3 {
          from {
            transform: translate(-50%, -50%) rotate(270deg) translateX(38px)
              rotate(-270deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(630deg) translateX(38px)
              rotate(-630deg);
          }
        }
      `}</style>
    </span>
  );
}
