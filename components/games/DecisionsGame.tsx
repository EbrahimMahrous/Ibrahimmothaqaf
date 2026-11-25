"use client";

// ─────────────────────────────────────────────────────────────
// Decisions Game — pick the right management decision fast
// Trains quick decision-making under time pressure
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import { Timer, CheckCircle2, XCircle, Zap } from "lucide-react";
import { GameShell } from "./GameShell";
import { getGamesDict } from "@/lib/games-i18n";
import type { GameProps } from "./types";

interface DecisionCard {
  left: string;
  right: string;
  correct: "left" | "right";
  reason: string;
}

// 20+ real-world management decisions
const DECISIONS: DecisionCard[] = [
  {
    left: "تفويض المهمة لفريقك",
    right: "تنفيذ المهمة بنفسك",
    correct: "left",
    reason: "المدير الفعّال يبني فريقًا، ليس اختناقًا (bottleneck).",
  },
  {
    left: "فهم سبب المشكلة أولًا",
    right: "محاسبة الفريق فورًا",
    correct: "left",
    reason: "المحاسبة قبل التحليل تخلق خوفًا، ليس تعلّمًا.",
  },
  {
    left: "اجتماع يومي 15 دقيقة",
    right: "اجتماع أسبوعي 3 ساعات",
    correct: "left",
    reason: "Standup يومي يقلل المفاجآت ويُظهر المشاكل مبكرًا.",
  },
  {
    left: "توثيق القرارات",
    right: "الاعتماد على الذاكرة",
    correct: "left",
    reason: "التوثيق يمنع تكرار النقاش ويحافظ على السياق.",
  },
  {
    left: "إعطاء ملاحظات فورية",
    right: "انتظار تقييم سنوي",
    correct: "left",
    reason: "الملاحظات الفورية تسمح بالتحسين السريع.",
  },
  {
    left: "قياس النتائج",
    right: "قياس الجهد",
    correct: "left",
    reason: "النتائج تهم، الجهد بدون نتيجة لا يُقاس.",
  },
  {
    left: "بناء نظام يتكرر",
    right: "حل المشكلة يدويًا كل مرة",
    correct: "left",
    reason: "الأنظمة تمنع تكرار نفس المشكلة.",
  },
  {
    left: "تعيين شخص أذكى منك",
    right: "تعيين شخص أقل خبرة",
    correct: "left",
    reason: "الفريق القوي يرفع مستوى الجميع.",
  },
  {
    left: "توضيح التوقعات كتابيًا",
    right: "شرح شفهي سريع",
    correct: "left",
    reason: "الكتابة تحمي الجميع من سوء الفهم.",
  },
  {
    left: "الاستثمار في التدريب",
    right: "الاستثمار في التوظيف السريع",
    correct: "left",
    reason: "فريق مدرَّب أفضل من فريق كبير غير مدرب.",
  },
  {
    left: "الاعتراف بالخطأ بسرعة",
    right: "الدفاع عن القرار",
    correct: "left",
    reason: "الاعتراف بالخطأ يبني الثقة ويسمح بالتصحيح.",
  },
  {
    left: "سؤال الفريق عن رأيهم",
    right: "اتخاذ القرار بدون استشارة",
    correct: "left",
    reason: "الاستشارة لا تعني التصويت، لكنها تحسّن القرار.",
  },
  {
    left: "وضع مؤشرات أداء (KPIs)",
    right: "العمل بدون مؤشرات",
    correct: "left",
    reason: "ما لا يمكن قياسه، لا يمكن تحسينه.",
  },
  {
    left: "تخصيص وقت للتفكير",
    right: "التفاعل المستمر مع المهام",
    correct: "left",
    reason: "التفكير الاستراتيجي يحتاج وقتًا محميًا.",
  },
  {
    left: "التركيز على العميل",
    right: "التركيز على المنافس",
    correct: "left",
    reason: "العميل يحدد نجاحك، لا المنافس.",
  },
  {
    left: "الاحتفاظ بالكاش",
    right: "إنفاق كل الإيرادات",
    correct: "left",
    reason: "الكاش هو أكسجين الشركة — احتفظ به.",
  },
  {
    left: "مراجعة أسبوعية للنتائج",
    right: "مراجعة سنوية",
    correct: "left",
    reason: "الانحراف الأسبوعي يمكن تصحيحه، السنوي لا.",
  },
  {
    left: "اختيار الشخص المناسب",
    right: "اختيار الشخص المتاح",
    correct: "left",
    reason: "التعيين المتاح يكلفك أكثر على المدى الطويل.",
  },
  {
    left: "قياس رضا الفريق",
    right: "قياس الإنتاجية فقط",
    correct: "left",
    reason: "الفريق الراضي منتج على المدى الطويل.",
  },
  {
    left: "بناء عمليات موثقة",
    right: "الاعتماد على الأشخاص",
    correct: "left",
    reason: "العمليات تبقى بعد رحيل الأشخاص.",
  },
];

const TIME_PER_CARD = 6000; // 6 seconds per decision

export function DecisionsGame({ highScore, onScore, lang }: GameProps) {
  const dict = getGamesDict(lang);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [deck, setDeck] = useState<DecisionCard[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_CARD);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    reason: string;
  } | null>(null);

  const reset = useCallback(() => {
    setRunning(false);
    setGameOver(false);
    setCurrentIdx(0);
    setDeck([]);
    setScore(0);
    setStreak(0);
    setTimeLeft(TIME_PER_CARD);
    setFeedback(null);
  }, []);

  const start = () => {
    if (gameOver) reset();
    setDeck([...DECISIONS].sort(() => Math.random() - 0.5).slice(0, 10));
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(TIME_PER_CARD);
    setFeedback(null);
    setGameOver(false);
    setRunning(true);
  };

  const pick = (side: "left" | "right") => {
    if (!running || feedback) return;
    const card = deck[currentIdx];
    const correct = side === card.correct;
    setFeedback({ correct, reason: card.reason });

    if (correct) {
      const bonus = Math.floor(streak / 3);
      const points = 10 + bonus;
      setScore((s) => s + points);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIdx + 1 >= deck.length) {
        setRunning(false);
        setGameOver(true);
      } else {
        setCurrentIdx((i) => i + 1);
        setFeedback(null);
        setTimeLeft(TIME_PER_CARD);
      }
    }, 1400);
  };

  // Timer
  useEffect(() => {
    if (!running || feedback) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 100) {
          // Time out — treat as wrong answer
          setFeedback({
            correct: false,
            reason: dict.decisions.pickFast,
          });
          setStreak(0);
          setTimeout(() => {
            if (currentIdx + 1 >= deck.length) {
              setRunning(false);
              setGameOver(true);
            } else {
              setCurrentIdx((i) => i + 1);
              setFeedback(null);
              setTimeLeft(TIME_PER_CARD);
            }
          }, 1400);
          return 0;
        }
        return t - 100;
      });
    }, 100);
    return () => clearInterval(id);
  }, [running, feedback, currentIdx, deck.length, dict.decisions.pickFast]);

  useEffect(() => {
    if (gameOver) onScore(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const card = deck[currentIdx];
  const timerPct = (timeLeft / TIME_PER_CARD) * 100;

  return (
    <GameShell
      score={score}
      highScore={highScore}
      running={running}
      onStart={start}
      onReset={reset}
      instructions={dict.games.decisions.instructions}
      lang={lang}
    >
      <div className="bg-canvas-alt p-3 min-h-80">
        {!running && !gameOver ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center py-8">
            <Zap className="h-10 w-10 text-primary" />
            <p className="text-sm font-medium text-text">
              {dict.games.decisions.label}
            </p>
            <p className="text-xs text-muted">{dict.games.decisions.benefit}</p>
          </div>
        ) : gameOver ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center py-8">
            <span className="text-4xl">🎉</span>
            <p className="text-lg font-bold text-text">
              {dict.quiz.score}: {score}
            </p>
            <p className="text-xs text-muted">
              {dict.decisions.streak}: {streak}
            </p>
            <button
              onClick={start}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white hover:opacity-90"
            >
              {dict.quiz.playAgain}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Timer bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="inline-flex items-center gap-1 text-muted">
                  <Timer className="h-3 w-3" />
                  {currentIdx + 1} / {deck.length}
                </span>
                {streak >= 2 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    🔥 {dict.decisions.streak} ×{streak}
                  </span>
                )}
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-primary-tint">
                <div
                  className={`h-full transition-all ${
                    timerPct > 50
                      ? "bg-primary"
                      : timerPct > 25
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${timerPct}%` }}
                />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-2">
              {(["left", "right"] as const).map((side) => {
                const text = side === "left" ? card.left : card.right;
                const isCorrectSide = feedback && side === card.correct;
                const isWrongPick =
                  feedback && !feedback.correct && side !== card.correct;
                return (
                  <button
                    key={side}
                    onClick={() => pick(side)}
                    disabled={!!feedback}
                    className={`relative rounded-xl border p-3 text-start text-xs font-medium transition-all ${
                      isCorrectSide
                        ? "border-green-500 bg-green-50 text-green-800"
                        : isWrongPick
                          ? "border-red-300 bg-red-50/50 text-red-700 opacity-60"
                          : "border-primary-tint bg-surface text-text hover:border-primary hover:bg-primary-tint"
                    }`}
                  >
                    {isCorrectSide && (
                      <CheckCircle2 className="absolute top-2 inset-e-2 h-4 w-4 text-green-600" />
                    )}
                    {isWrongPick && (
                      <XCircle className="absolute top-2 inset-e-2 h-4 w-4 text-red-500" />
                    )}
                    {text}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`rounded-lg p-2.5 text-[11px] leading-relaxed ${
                  feedback.correct
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <p className="font-bold mb-0.5">
                  {feedback.correct
                    ? `✅ ${dict.quiz.correctAnswer}`
                    : `❌ ${dict.quiz.wrongAnswer}`}
                </p>
                <p>{feedback.reason}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </GameShell>
  );
}
