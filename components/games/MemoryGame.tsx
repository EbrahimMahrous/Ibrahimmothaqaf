"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { GameShell } from "./GameShell";
import type { GameProps } from "./types";

const EMOJIS = ["🦁", "🐯", "🐸", "🐧", "🦊", "🐼", "🐨", "🦄"];

export function MemoryGame({ highScore, onScore }: GameProps) {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const wonRef = useRef(false);

  const shuffle = () => {
    const deck = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setSeconds(0);
    setRunning(true);
    wonRef.current = false;
  };

  const reset = useCallback(() => {
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setSeconds(0);
    setRunning(false);
    wonRef.current = false;
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (
      running &&
      cards.length > 0 &&
      matched.length === cards.length &&
      !wonRef.current
    ) {
      wonRef.current = true;
      const finalScore = Math.max(0, 100 - moves * 3 - seconds * 2);
      setScore(finalScore);
      setRunning(false);
      onScore(finalScore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched, cards, running]);

  const handleCardClick = (idx: number) => {
    if (!running) return;
    if (flipped.includes(idx) || matched.includes(idx) || flipped.length === 2)
      return;
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      if (cards[next[0]] === cards[next[1]]) {
        setMatched((prev) => [...prev, ...next]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  return (
    <GameShell
      score={score}
      highScore={highScore}
      running={running}
      onStart={shuffle}
      onReset={reset}
      instructions="اقل حركات + وقت = نقاط أعلى"
    >
      <div className="bg-canvas-alt p-3">
        {cards.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
            <span className="text-4xl">🧠</span>
            <p className="text-sm font-medium text-text">لعبة الذاكرة</p>
            <p className="text-xs text-muted">اضغط ابدأ لخلط البطاقات</p>
          </div>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between text-[11px] text-muted">
              <span>الحركات: {moves}</span>
              <span className="inline-flex items-center gap-1">
                <Timer className="h-3 w-3" />
                {seconds}s
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {cards.map((emoji, i) => {
                const isOpen = flipped.includes(i) || matched.includes(i);
                const isMatched = matched.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleCardClick(i)}
                    className={`aspect-square rounded-md text-2xl transition-all duration-300 flex items-center justify-center ${
                      isMatched
                        ? "bg-primary/20 border-2 border-primary scale-95"
                        : isOpen
                          ? "bg-white border-2 border-primary"
                          : "bg-primary/80 text-transparent border-2 border-primary/30 hover:bg-primary"
                    }`}
                  >
                    {isOpen ? emoji : "?"}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </GameShell>
  );
}
