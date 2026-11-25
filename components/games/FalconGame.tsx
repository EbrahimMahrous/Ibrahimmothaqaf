"use client";

// ─────────────────────────────────────────────────────────────
// Falcon Game — parallax + star collection + Bird icon
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Wind, Bird } from "lucide-react";
import { GameShell } from "./GameShell";
import { getGamesDict } from "@/lib/games-i18n";
import type { GameProps } from "./types";

const H = 320;
const FALCON_SIZE = 32;
const FALCON_X = 70;
const STAR_SIZE = 22;
const GRAVITY = 0.35;
const FLAP_POWER = -5.5;
const MAX_VELOCITY = 8;

interface StarItem {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export function FalconGame({ highScore, onScore, lang }: GameProps) {
  const dict = getGamesDict(lang);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [falconY, setFalconY] = useState(H / 2);
  const [stars, setStars] = useState<StarItem[]>([]);
  const [offset, setOffset] = useState(0);

  const falconYRef = useRef(H / 2);
  const velocityRef = useRef(0);
  const starsRef = useRef<StarItem[]>([]);
  const scoreRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const frameRef = useRef(0);
  const idRef = useRef(0);

  const reset = useCallback(() => {
    falconYRef.current = H / 2;
    velocityRef.current = 0;
    starsRef.current = [];
    scoreRef.current = 0;
    setFalconY(H / 2);
    setStars([]);
    setScore(0);
    setGameOver(false);
    setRunning(false);
    setOffset(0);
  }, []);

  const flap = () => {
    if (!running) return;
    velocityRef.current = FLAP_POWER;
  };

  const start = () => {
    if (gameOver) reset();
    setRunning(true);
    velocityRef.current = FLAP_POWER;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!running) start();
        else flap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const step = () => {
      frameRef.current += 1;
      velocityRef.current = Math.min(
        MAX_VELOCITY,
        velocityRef.current + GRAVITY,
      );
      falconYRef.current += velocityRef.current;

      if (falconYRef.current < 0) {
        falconYRef.current = 0;
        velocityRef.current = 0;
      }
      if (falconYRef.current > H - FALCON_SIZE) {
        falconYRef.current = H - FALCON_SIZE;
        setRunning(false);
        setGameOver(true);
        return;
      }

      setFalconY(falconYRef.current);
      setOffset((o) => (o + 2) % 600);

      if (frameRef.current % 70 === 0) {
        idRef.current += 1;
        starsRef.current.push({
          id: idRef.current,
          x: 600,
          y: 40 + Math.random() * (H - 80),
          collected: false,
        });
      }

      starsRef.current = starsRef.current
        .map((s) => ({ ...s, x: s.x - 3 }))
        .filter((s) => s.x > -50 && !s.collected);

      starsRef.current.forEach((s) => {
        const dx = s.x - FALCON_X;
        const dy = s.y - falconYRef.current;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < (FALCON_SIZE + STAR_SIZE) / 2) {
          s.collected = true;
          scoreRef.current += 5;
          setScore(scoreRef.current);
        }
      });

      setStars([...starsRef.current]);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (gameOver) onScore(scoreRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const tilt = Math.max(-30, Math.min(30, velocityRef.current * 5));

  return (
    <GameShell
      score={score}
      highScore={highScore}
      running={running}
      onStart={start}
      onReset={reset}
      instructions={dict.games.falcon.instructions}
      lang={lang}
    >
      <div
        className="relative cursor-pointer overflow-hidden select-none"
        style={{ width: "100%", height: H }}
        onClick={() => (running ? flap() : start())}
        onTouchStart={(e) => {
          e.preventDefault();
          if (running) flap();
          else start();
        }}
      >
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-sky-400 via-sky-300 to-amber-100" />

        {/* Parallax clouds */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/50 blur-sm"
            style={{
              top: 20 + i * 55,
              left: ((offset * 0.5 + i * 150) % 700) - 100,
              width: 80,
              height: 32,
            }}
          />
        ))}

        {/* Distant mountains */}
        <div
          className="absolute bottom-0 h-16 w-full bg-linear-to-t from-emerald-700/40 to-transparent"
          style={{ transform: `translateX(${-offset * 0.3}px)` }}
        />

        {/* Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute grid place-items-center rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24]"
            style={{
              left: s.x,
              top: s.y,
              width: STAR_SIZE,
              height: STAR_SIZE,
            }}
          >
            <Star className="h-3.5 w-3.5 text-amber-700 fill-amber-500" />
          </div>
        ))}

        {/* Falcon — Bird icon */}
        <div
          className="absolute text-amber-900"
          style={{
            left: FALCON_X,
            top: falconY,
            width: FALCON_SIZE,
            height: FALCON_SIZE,
            transform: `rotate(${tilt}deg)`,
            transition: "transform 80ms linear",
          }}
        >
          <Bird className="w-full h-full fill-amber-800" strokeWidth={1.5} />
        </div>

        {/* Overlay */}
        {(!running || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45 text-center text-white">
            <Wind className="h-8 w-8 opacity-80" />
            <p className="text-lg font-bold">
              {gameOver ? dict.falcon.gameOver : dict.games.falcon.label}
            </p>
            <p className="text-xs opacity-85">
              {gameOver
                ? `${dict.falcon.yourScore}: ${score}`
                : dict.falcon.tapToFly}
            </p>
          </div>
        )}
      </div>
    </GameShell>
  );
}
