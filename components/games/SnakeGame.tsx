"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import type { GameProps } from "./types";

const CELL = 14;
const COLS = 22;
const ROWS = 20;

type Point = { x: number; y: number };

export function SnakeGame({ highScore, onScore }: GameProps) {
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [, setTick] = useState(0);

  const snakeRef = useRef<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const queueRef = useRef<string[]>([]);
  const foodRef = useRef<Point>({ x: 15, y: 10 });
  const scoreRef = useRef(0);

  const randomFood = (): Point => {
    while (true) {
      const p = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      };
      if (!snakeRef.current.some((s) => s.x === p.x && s.y === p.y)) return p;
    }
  };

  const reset = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    dirRef.current = { x: 1, y: 0 };
    queueRef.current = [];
    foodRef.current = randomFood();
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setRunning(false);
    setTick(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!running) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        queueRef.current.push(e.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const speed = Math.max(80, 180 - scoreRef.current * 6);
    const id = setInterval(() => {
      const k = queueRef.current.shift();
      if (k) {
        const d = dirRef.current;
        if (k === "ArrowUp" && d.y === 0) dirRef.current = { x: 0, y: -1 };
        else if (k === "ArrowDown" && d.y === 0)
          dirRef.current = { x: 0, y: 1 };
        else if (k === "ArrowLeft" && d.x === 0)
          dirRef.current = { x: -1, y: 0 };
        else if (k === "ArrowRight" && d.x === 0)
          dirRef.current = { x: 1, y: 0 };
      }

      const snake = [...snakeRef.current];
      const dir = dirRef.current;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      if (
        head.x < 0 ||
        head.x >= COLS ||
        head.y < 0 ||
        head.y >= ROWS ||
        snake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        setRunning(false);
        setGameOver(true);
        return;
      }

      snake.unshift(head);
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        foodRef.current = randomFood();
      } else {
        snake.pop();
      }
      snakeRef.current = snake;
      setTick((t) => t + 1);
    }, speed);
    return () => clearInterval(id);
  }, [running, score]);

  useEffect(() => {
    if (gameOver) onScore(scoreRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const start = () => {
    if (gameOver) reset();
    setRunning(true);
  };

  return (
    <GameShell
      score={score}
      highScore={highScore}
      running={running}
      onStart={start}
      onReset={reset}
      instructions="أسهم الكيبورد — السرعة تزيد مع النقاط"
    >
      <div className="relative bg-[#0a0f0d] flex justify-center py-2">
        <div
          className="relative"
          style={{ width: COLS * CELL, height: ROWS * CELL }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: `${CELL}px ${CELL}px`,
            }}
          />
          <div
            className="absolute rounded-full bg-red-500 animate-pulse"
            style={{
              left: foodRef.current.x * CELL,
              top: foodRef.current.y * CELL,
              width: CELL,
              height: CELL,
            }}
          />
          {snakeRef.current.map((seg, i) => (
            <div
              key={i}
              className="absolute rounded-sm"
              style={{
                left: seg.x * CELL,
                top: seg.y * CELL,
                width: CELL - 1,
                height: CELL - 1,
                background: i === 0 ? "var(--color-primary)" : "#10b981",
                opacity: 1 - i * 0.025,
              }}
            />
          ))}
          {(!running || gameOver) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70 text-center text-white">
              <p className="text-lg font-bold">
                {gameOver ? "انتهت اللعبة" : "🐍 الثعبان"}
              </p>
              <p className="text-xs opacity-80">
                {gameOver ? `نقاطك: ${score}` : "اضغط ابدأ"}
              </p>
            </div>
          )}
        </div>
      </div>
    </GameShell>
  );
}
