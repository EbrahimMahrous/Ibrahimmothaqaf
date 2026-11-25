// ─────────────────────────────────────────────────────────────
// Game types — 4 games (Snake removed)
// ─────────────────────────────────────────────────────────────

export type GameId = "quiz" | "falcon" | "memory" | "decisions";

export interface GameMeta {
  id: GameId;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface GameProps {
  highScore: number;
  onScore: (s: number) => void;
  lang: "ar" | "en";
}

export type HighScores = Record<GameId, number>;

export const defaultHS: HighScores = {
  falcon: 0,
  memory: 0,
  decisions: 0,
  quiz: 0,
};

export const GAMES: GameMeta[] = [
  { id: "quiz", difficulty: 5 },
  { id: "falcon", difficulty: 3 },
  { id: "memory", difficulty: 2 },
  { id: "decisions", difficulty: 1 },
];
