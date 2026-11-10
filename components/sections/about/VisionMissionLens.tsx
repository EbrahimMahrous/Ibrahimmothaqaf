"use client";

import { useState } from "react";

interface VisionMissionLensProps {
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
}

export function VisionMissionLens({
  visionTitle,
  visionBody,
  missionTitle,
  missionBody,
}: VisionMissionLensProps) {
  const [focus, setFocus] = useState<"vision" | "mission">("vision");

  return (
    <section className="relative">
      <div className="container-editorial py-20 md:py-28">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {/* Vision */}
          <div
            onMouseEnter={() => setFocus("vision")}
            className={`relative rounded-2xl border p-8 transition-all duration-500 md:p-10 ${
              focus === "vision"
                ? "border-primary/25 bg-primary-tint shadow-card"
                : "border-primary-tint bg-background/20 opacity-40 blur-[1px]"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {visionTitle}
            </p>
            <p
              className={`mt-4 text-lg leading-relaxed md:text-xl ${
                focus === "vision" ? "text-text/85" : "text-text/40"
              }`}
            >
              {visionBody}
            </p>
          </div>

          {/* Mission */}
          <div
            onMouseEnter={() => setFocus("mission")}
            className={`relative rounded-2xl border p-8 transition-all duration-500 md:p-10 ${
              focus === "mission"
                ? "border-accent/25 bg-accent-tint shadow-card"
                : "border-accent/10 bg-background/20 opacity-40 blur-[1px]"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {missionTitle}
            </p>
            <p
              className={`mt-4 text-lg leading-relaxed md:text-xl ${
                focus === "mission" ? "text-text/85" : "text-text/40"
              }`}
            >
              {missionBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
