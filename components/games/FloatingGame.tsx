"use client";

import { useCallback, useEffect, useState } from "react";
import { X, Brain, Target } from "lucide-react";
import { GAMES, defaultHS, type GameId, type HighScores } from "./types";
import { SnakeGame } from "./SnakeGame";
import { FlappyGame } from "./FlappyGame";
import { MemoryGame } from "./MemoryGame";
import { BouncyGame } from "./BouncyGame";
import { QuizGame } from "./QuizGame";

const HS_KEY = "mosaqaf_games_highscore";

export function FloatingGame() {
  const [open, setOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<GameId>("quiz");
  const [highScores, setHighScores] = useState<HighScores>(defaultHS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HS_KEY);
      if (saved) setHighScores({ ...defaultHS, ...JSON.parse(saved) });
    } catch {}
  }, []);

  const updateHighScore = useCallback((game: GameId, score: number) => {
    setHighScores((prev) => {
      if (score <= (prev[game] || 0)) return prev;
      const next = { ...prev, [game]: score };
      try {
        localStorage.setItem(HS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const totalHS = Object.values(highScores).reduce((a, b) => a + b, 0);
  const activeMeta = GAMES.find((g) => g.id === activeGame)!;

  const gameProps = {
    highScore: highScores[activeGame],
    onScore: (s: number) => updateHighScore(activeGame, s),
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 inset-e-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl animate-bounce-slow"
          aria-label="Open brain games"
        >
          <Brain className="h-6 w-6" />
          {totalHS > 0 && (
            <span className="absolute -top-1 -inset-e-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
              {totalHS}
            </span>
          )}
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 inset-e-6 z-50 w-[calc(100vw-2rem)] max-w-md sm:w-105">
          <div className="overflow-hidden rounded-2xl border border-primary-tint bg-surface shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary-tint bg-canvas-alt px-3 py-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-text">ألعاب مثقف</p>
                  <p className="text-[10px] text-muted">طوّر عقلك في 5 دقائق</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-muted hover:bg-primary-tint hover:text-primary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-primary-tint bg-surface overflow-x-auto scrollbar-none">
              {GAMES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGame(g.id)}
                  className={`flex-1 min-w-fit px-2 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                    activeGame === g.id
                      ? "border-b-2 border-primary text-primary bg-primary-tint/40"
                      : "text-muted hover:text-text"
                  }`}
                >
                  <span className="me-1">{g.emoji}</span>
                  {g.label}
                </button>
              ))}
            </div>

            {/* Goal banner */}
            <div className="border-b border-primary-tint bg-primary-tint/30 px-3 py-2">
              <div className="flex items-start gap-2">
                <Target className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-text">
                    {activeMeta.goal}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted">
                    {activeMeta.benefit} —{" "}
                    <span className="text-primary font-medium">
                      {activeMeta.brainSkill}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Active game — conditional rendering */}
            <div className="relative">
              {activeGame === "quiz" && <QuizGame {...gameProps} />}
              {activeGame === "snake" && <SnakeGame {...gameProps} />}
              {activeGame === "flappy" && <FlappyGame {...gameProps} />}
              {activeGame === "memory" && <MemoryGame {...gameProps} />}
              {activeGame === "bouncy" && <BouncyGame {...gameProps} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
