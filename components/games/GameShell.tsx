"use client";

import { Play, Pause, RotateCcw, Trophy } from "lucide-react";
import { getGamesDict } from "@/lib/games-i18n";

export function GameShell({
  score,
  highScore,
  onStart,
  onReset,
  running,
  children,
  instructions,
  lang,
}: {
  score: number;
  highScore: number;
  onStart: () => void;
  onReset: () => void;
  running: boolean;
  children: React.ReactNode;
  instructions?: string;
  lang: "ar" | "en";
}) {
  const dict = getGamesDict(lang);

  return (
    <>
      <div className="flex items-center justify-between border-b border-primary-tint bg-canvas-alt/50 px-3 py-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-text">
            {dict.score}: {score}
          </span>
          <span className="inline-flex items-center gap-1 text-muted">
            <Trophy className="h-3 w-3" />
            {dict.highScore}: {highScore}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {!running ? (
            <button
              onClick={onStart}
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-white hover:opacity-90"
            >
              <Play className="h-3 w-3" />
              {dict.start}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-tint px-3 py-1 text-[11px] font-medium text-primary">
              <Pause className="h-3 w-3" />
              {dict.running}
            </span>
          )}
          <button
            onClick={onReset}
            className="rounded-full p-1.5 text-muted hover:bg-primary-tint hover:text-primary"
            aria-label={dict.reset}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {children}

      {instructions && (
        <div className="border-t border-primary-tint bg-canvas-alt/50 px-3 py-1.5 text-center text-[10px] text-muted">
          {instructions}
        </div>
      )}
    </>
  );
}
