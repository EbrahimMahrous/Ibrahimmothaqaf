"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Project } from "@/lib/content/types";

interface ProjectsPreviewProps {
  locale: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  statusLabels: { live: string; inDevelopment: string };
  viewLabel: string;
  projects: Project[];
}

export function ProjectsPreview({
  locale,
  eyebrow,
  title,
  subtitle,
  cta,
  statusLabels,
  viewLabel,
  projects,
}: ProjectsPreviewProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative">
      <div className="container-editorial py-20 md:py-28">
        <div className="reveal">
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:items-center">
          {/* Stack */}
          <div className="relative mx-auto h-85 w-full max-w-md">
            {projects.map((project, i) => {
              const offset = i - active;
              const isActive = offset === 0;
              return (
                <div
                  key={project.id}
                  className={`absolute inset-0 cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "z-30 opacity-100"
                      : offset > 0
                        ? "z-20 opacity-60"
                        : "z-10 opacity-30"
                  }`}
                  style={{
                    transform: `translateY(${offset * 12}px) scale(${1 - Math.abs(offset) * 0.04})`,
                  }}
                  onClick={() => setActive(i)}
                >
                  <div className="h-full rounded-3xl border border-primary-tint bg-background/70 p-6 backdrop-blur-md shadow-lift">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          0{i + 1}
                        </span>
                        <h3 className="mt-3 text-2xl font-bold text-text">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${
                            project.status === "live"
                              ? "bg-primary-tint text-primary"
                              : "bg-accent-tint text-accent"
                          }`}
                        >
                          {project.status === "live"
                            ? statusLabels.live
                            : statusLabels.inDevelopment}
                        </span>
                        <a
                          href={project.url || `/${locale}/projects`}
                          className="text-xs font-semibold text-primary"
                        >
                          {viewLabel} →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* List */}
          <div className="space-y-3">
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setActive(i)}
                className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-start transition-all ${
                  active === i
                    ? "border-primary bg-primary-tint"
                    : "border-primary-tint hover:border-primary/30"
                }`}
              >
                <span className="text-sm font-semibold text-text">
                  {project.title}
                </span>
                <span className="text-xs text-primary">0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Link
            href={`/${locale}/projects`}
            className="btn-base btn-secondary group inline-flex items-center gap-2"
          >
            {cta}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
