"use client";

import { useCallback, useRef, useState } from "react";
import {
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Dices,
  Briefcase,
  TrendingUp,
  DollarSign,
  Puzzle,
  type LucideIcon,
} from "lucide-react";
import { GameShell } from "./GameShell";
import {
  QUIZ_CATEGORIES,
  QUIZ_QUESTIONS,
  type QuizCategory,
  type QuizQuestion,
} from "./quizData";
import { getGamesDict } from "@/lib/games-i18n";
import type { GameProps } from "./types";

const CATEGORY_ICONS: Record<QuizCategory, LucideIcon> = {
  management: Briefcase,
  career: TrendingUp,
  business: DollarSign,
  thinking: Puzzle,
};

export function QuizGame({ highScore, onScore, lang = "ar" }: GameProps) {
  const dict = getGamesDict(lang);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<0 | 1 | null>(null);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [category, setCategory] = useState<QuizCategory | "all">("all");
  const scoreRef = useRef(0);

  const shuffleQuestions = (cat: QuizCategory | "all") => {
    const pool =
      cat === "all"
        ? QUIZ_QUESTIONS
        : QUIZ_QUESTIONS.filter((q) => q.category === cat);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    scoreRef.current = 0;
    setFinished(false);
    setRunning(true);
  };

  const reset = useCallback(() => {
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    scoreRef.current = 0;
    setFinished(false);
    setRunning(false);
  }, []);

  const handleAnswer = (choice: 0 | 1) => {
    if (selected !== null) return;
    setSelected(choice);
    const q = questions[current];
    const isCorrect = choice === q.correct;
    if (isCorrect) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
    }
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
        setRunning(false);
        onScore(scoreRef.current);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1800);
  };

  const q = questions[current];
  const catMeta = q ? QUIZ_CATEGORIES[q.category] : null;
  const total = questions.length;
  const maxScore = total * 10;

  return (
    <GameShell
      score={score}
      highScore={highScore}
      running={running}
      onStart={() => shuffleQuestions(category)}
      onReset={reset}
      instructions={dict.games.quiz.instructions}
      lang={lang}
    >
      <div className="bg-canvas-alt p-3 min-h-80">
        {questions.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center py-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-tint text-primary">
              <Trophy className="h-7 w-7" />
            </div>
            <p className="text-sm font-medium text-text">
              {dict.quiz.pickCategory}
            </p>
            <p className="text-xs text-muted">
              {lang === "ar"
                ? "اختر مجال واحصل على 10 أسئلة"
                : "Pick a category and get 10 questions"}
            </p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
              <button
                onClick={() => {
                  setCategory("all");
                  shuffleQuestions("all");
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary bg-primary/10 px-2 py-2 text-[11px] font-medium text-primary hover:bg-primary/20"
              >
                <Dices className="h-3.5 w-3.5" />
                {dict.quiz.allCategories}
              </button>
              {(Object.keys(QUIZ_CATEGORIES) as QuizCategory[]).map((cat) => {
                const Icon = CATEGORY_ICONS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      shuffleQuestions(cat);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary-tint bg-surface px-2 py-2 text-[11px] font-medium text-text hover:border-primary hover:bg-primary-tint"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {dict.quiz.categories[cat]}
                  </button>
                );
              })}
            </div>
          </div>
        ) : finished ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center py-8">
            <Trophy className="h-12 w-12 text-primary" />
            <p className="text-lg font-bold text-text">
              {dict.quiz.score}: {score} / {maxScore}
            </p>
            <p className="text-xs text-muted">
              {score === maxScore
                ? dict.quiz.excellent
                : score >= maxScore * 0.6
                  ? dict.quiz.good
                  : dict.quiz.needsReview}
            </p>
            <button
              onClick={() => shuffleQuestions(category)}
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white hover:opacity-90"
            >
              <RotateCcw className="h-3 w-3" />
              {dict.quiz.playAgain}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted">
                {dict.quiz.questionOf
                  .replace("{n}", String(current + 1))
                  .replace("{total}", String(total))}
              </span>
              {catMeta && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    background: `${catMeta.color}20`,
                    color: catMeta.color,
                  }}
                >
                  {(() => {
                    const Icon = CATEGORY_ICONS[q.category];
                    return <Icon className="h-3 w-3" />;
                  })()}
                  {dict.quiz.categories[q.category]}
                </span>
              )}
            </div>

            <div className="h-1 w-full overflow-hidden rounded-full bg-primary-tint">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${((current + 1) / total) * 100}%`,
                }}
              />
            </div>

            <p className="text-sm font-semibold leading-relaxed text-text min-h-15">
              {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === q.correct;
                const showResult = selected !== null;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i as 0 | 1)}
                    disabled={showResult}
                    className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                      showResult
                        ? isCorrect
                          ? "border-green-500 bg-green-50 text-green-700"
                          : isSelected
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-primary-tint bg-surface text-muted"
                        : "border-primary-tint bg-surface text-text hover:border-primary hover:bg-primary-tint"
                    }`}
                  >
                    {showResult && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 shrink-0" />
                    )}
                    {!showResult && (
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-tint text-[10px] font-bold text-primary">
                        {i === 0 ? "أ" : "ب"}
                      </span>
                    )}
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="flex items-start gap-2 rounded-lg bg-primary-tint/50 p-2.5">
                <Lightbulb className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-text">
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </GameShell>
  );
}
