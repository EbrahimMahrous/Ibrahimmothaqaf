"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import type { GameProps } from "./types";

const H = 320;
const BIRD = 22;
const GAP = 88;
const PIPE_W = 44;
const BIRD_X = 60;

export function FlappyGame({ highScore, onScore }: GameProps) {
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [birdY, setBirdY] = useState(150);
  const [pipes, setPipes] = useState<
    { x: number; gapY: number; scored: boolean }[]
  >([]);
  const birdYRef = useRef(150);
  const vyRef = useRef(0);
  const pipesRef = useRef<{ x: number; gapY: number; scored: boolean }[]>([]);
  const rafRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const frameRef = useRef(0);

  const reset = useCallback(() => {
    birdYRef.current = 150;
    vyRef.current = 0;
    pipesRef.current = [];
    scoreRef.current = 0;
    setBirdY(150);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setRunning(false);
  }, []);

  const flap = () => {
    if (!running) return;
    vyRef.current = -5.8;
  };

  const start = () => {
    if (gameOver) reset();
    setRunning(true);
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
      vyRef.current += 0.38;
      birdYRef.current += vyRef.current;
      setBirdY(birdYRef.current);

      if (birdYRef.current > H - BIRD || birdYRef.current < 0) {
        setRunning(false);
        setGameOver(true);
        return;
      }

      let newPipes = pipesRef.current.map((p) => ({ ...p, x: p.x - 2.3 }));
      newPipes = newPipes.filter((p) => p.x + PIPE_W > 0);

      if (
        newPipes.length === 0 ||
        newPipes[newPipes.length - 1].x < 600 - 150
      ) {
        newPipes.push({
          x: 600,
          gapY: 40 + Math.random() * (H - GAP - 80),
          scored: false,
        });
      }

      newPipes.forEach((p) => {
        if (!p.scored && p.x + PIPE_W < BIRD_X) {
          p.scored = true;
          scoreRef.current += 1;
          setScore(scoreRef.current);
        }
      });

      for (const p of newPipes) {
        if (
          BIRD_X + BIRD > p.x &&
          BIRD_X < p.x + PIPE_W &&
          (birdYRef.current < p.gapY || birdYRef.current + BIRD > p.gapY + GAP)
        ) {
          setRunning(false);
          setGameOver(true);
          return;
        }
      }

      pipesRef.current = newPipes;
      setPipes(newPipes);
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

  return (
    <GameShell
      score={score}
      highScore={highScore}
      running={running}
      onStart={start}
      onReset={reset}
      instructions="Space أو لمسة للطيران"
    >
      <div
        className="relative bg-linear-to-b from-sky-400 to-sky-200 cursor-pointer overflow-hidden"
        style={{ width: "100%", height: H }}
        onClick={() => (running ? flap() : start())}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40 blur-md"
            style={{
              top: 30 + i * 50,
              left: `${(frameRef.current * 0.3 + i * 120) % 100}%`,
              width: 60,
              height: 30,
            }}
          />
        ))}
        {pipes.map((p, i) => (
          <div key={i}>
            <div
              className="absolute bg-green-600 border-2 border-green-800 rounded-sm"
              style={{ left: p.x, top: 0, width: PIPE_W, height: p.gapY }}
            />
            <div
              className="absolute bg-green-600 border-2 border-green-800 rounded-sm"
              style={{
                left: p.x,
                top: p.gapY + GAP,
                width: PIPE_W,
                height: H - p.gapY - GAP,
              }}
            />
          </div>
        ))}
        <div
          className="absolute rounded-full bg-yellow-400 border-2 border-yellow-600 shadow-lg transition-transform"
          style={{
            left: BIRD_X,
            top: birdY,
            width: BIRD,
            height: BIRD,
            transform: `rotate(${Math.min(30, vyRef.current * 4)}deg)`,
          }}
        />
        {(!running || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 text-center text-white">
            <p className="text-lg font-bold">
              {gameOver ? "انتهت اللعبة" : "🐦 الطائر"}
            </p>
            <p className="text-xs opacity-80">
              {gameOver ? `نقاطك: ${score}` : "اضغط ابدأ أو المساحة"}
            </p>
          </div>
        )}
      </div>
    </GameShell>
  );
}
