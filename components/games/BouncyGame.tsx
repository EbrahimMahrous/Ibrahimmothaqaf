"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameShell } from "./GameShell";
import type { GameProps } from "./types";

const COLORS = [
  "var(--color-primary)",
  "var(--color-accent)",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];
const GRAVITY = 0.4;
const BOUNCE = 0.75;
const FRICTION = 0.99;

interface Cube {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export function BouncyGame({ highScore, onScore }: GameProps) {
  const [score, setScore] = useState(0);
  const [cubes, setCubes] = useState<Cube[]>([]);
  const [running, setRunning] = useState(false);
  const [combo, setCombo] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cubesRef = useRef<Cube[]>([]);
  const rafRef = useRef<number | null>(null);
  const idRef = useRef(0);
  const scoreRef = useRef(0);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    cubesRef.current = [];
    setCubes([]);
    setScore(0);
    setCombo(0);
    scoreRef.current = 0;
    setRunning(false);
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
  }, []);

  const start = () => setRunning(true);

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!running || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    idRef.current += 1;
    const size = 26 + Math.random() * 16;
    const newCube: Cube = {
      id: idRef.current,
      x: x - size / 2,
      y: y - size / 2,
      vx: (Math.random() - 0.5) * 7,
      vy: -Math.random() * 5 - 1,
      size,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 6,
    };
    cubesRef.current = [...cubesRef.current, newCube];
    setCubes(cubesRef.current);
  };

  const handleCubeClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    cubesRef.current = cubesRef.current.filter((c) => c.id !== id);
    setCubes(cubesRef.current);
    const newCombo = combo + 1;
    setCombo(newCombo);
    const points = 1 + Math.floor(newCombo / 3);
    scoreRef.current += points;
    setScore(scoreRef.current);
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setCombo(0), 1500);
  };

  useEffect(() => {
    if (!running) return;
    const step = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      cubesRef.current = cubesRef.current.map((c) => {
        let { x, y, vx, vy, rotation, rotationSpeed } = c;
        vy += GRAVITY;
        vx *= FRICTION;
        x += vx;
        y += vy;
        rotation += rotationSpeed;
        if (y + c.size > height) {
          y = height - c.size;
          vy = -vy * BOUNCE;
          vx *= 0.9;
          rotationSpeed *= 0.8;
          if (Math.abs(vy) < 0.5) vy = 0;
        }
        if (x < 0) {
          x = 0;
          vx = -vx * BOUNCE;
        }
        if (x + c.size > width) {
          x = width - c.size;
          vx = -vx * BOUNCE;
        }
        if (y < 0) {
          y = 0;
          vy = -vy * BOUNCE;
        }
        return { ...c, x, y, vx, vy, rotation, rotationSpeed };
      });
      setCubes([...cubesRef.current]);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (!running && scoreRef.current > 0) onScore(scoreRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <GameShell
      score={score}
      highScore={highScore}
      running={running}
      onStart={start}
      onReset={reset}
      instructions="اضغط في أي مكان — Combo يزيد النقاط"
    >
      <div
        ref={containerRef}
        onClick={handleBgClick}
        className="relative h-72 w-full overflow-hidden bg-linear-to-br from-canvas-alt via-surface to-primary-tint/30 cursor-crosshair select-none"
      >
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <span className="text-4xl">🟦</span>
            <p className="text-sm font-medium text-text">المكعب المطاطي</p>
            <p className="text-xs text-muted">اضغط ابدأ</p>
          </div>
        )}
        {running && cubes.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-xs text-muted">اضغط في أي مكان</p>
          </div>
        )}
        {combo >= 3 && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-lg">
            Combo ×{combo}
          </div>
        )}
        {cubes.map((cube) => (
          <button
            key={cube.id}
            onClick={(e) => handleCubeClick(cube.id, e)}
            className="absolute rounded-lg shadow-md transition-transform active:scale-90"
            style={{
              left: cube.x,
              top: cube.y,
              width: cube.size,
              height: cube.size,
              background: cube.color,
              transform: `rotate(${cube.rotation}deg)`,
              boxShadow: `0 4px 12px ${cube.color}40`,
            }}
            aria-label="Cube"
          />
        ))}
      </div>
    </GameShell>
  );
}
