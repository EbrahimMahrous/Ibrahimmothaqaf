"use client";

import { useState } from "react";

interface LensCardProps {
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
}

export function LensClient({
  visionTitle,
  visionBody,
  missionTitle,
  missionBody,
}: LensCardProps) {
  const [focus, setFocus] = useState<"vision" | "mission">("vision");

  return (
    <div className="grid gap-4">
      {/* Vision */}
      <div
        onMouseEnter={() => setFocus("vision")}
        onFocus={() => setFocus("vision")}
        tabIndex={0}
        className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500 ${
          focus === "vision"
            ? "border-primary/30 bg-primary-tint shadow-card"
            : "border-primary-tint bg-background/30 opacity-50 blur-[1px]"
        }`}
      >
        <div
          aria-hidden
          className={`absolute inset-0 bg-diagonal-lines transition-opacity duration-500 ${
            focus === "vision" ? "opacity-25" : "opacity-10"
          }`}
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            01 — {visionTitle}
          </p>
          <p
            className={`mt-3 text-sm leading-relaxed transition-colors duration-500 ${
              focus === "vision" ? "text-text/85" : "text-text/50"
            }`}
          >
            {visionBody}
          </p>
        </div>
      </div>

      {/* Mission */}
      <div
        onMouseEnter={() => setFocus("mission")}
        onFocus={() => setFocus("mission")}
        tabIndex={0}
        className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500 ${
          focus === "mission"
            ? "border-accent/30 bg-accent-tint shadow-card"
            : "border-accent/10 bg-background/30 opacity-50 blur-[1px]"
        }`}
      >
        <div
          aria-hidden
          className={`absolute inset-0 bg-diagonal-lines transition-opacity duration-500 ${
            focus === "mission" ? "opacity-25" : "opacity-10"
          }`}
          style={{ filter: "hue-rotate(-25deg)" }}
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            02 — {missionTitle}
          </p>
          <p
            className={`mt-3 text-sm leading-relaxed transition-colors duration-500 ${
              focus === "mission" ? "text-text/85" : "text-text/50"
            }`}
          >
            {missionBody}
          </p>
        </div>
      </div>
    </div>
  );
}
