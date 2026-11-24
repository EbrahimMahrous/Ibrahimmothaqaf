export type GameId = "snake" | "flappy" | "memory" | "bouncy" | "quiz";

export interface GameMeta {
  id: GameId;
  label: string;
  emoji: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  goal: string;
  benefit: string;
  brainSkill: string;
}

export interface GameProps {
  highScore: number;
  onScore: (s: number) => void;
}

export type HighScores = Record<GameId, number>;

export const defaultHS: HighScores = {
  snake: 0,
  flappy: 0,
  memory: 0,
  bouncy: 0,
  quiz: 0,
};

export const GAMES: GameMeta[] = [
  {
    id: "quiz",
    label: "الاختبار",
    emoji: "🎯",
    difficulty: 5,
    goal: "جاوب 10 أسئلة في 4 مجالات",
    benefit: "بيختبر معرفتك في الإدارة والقيادة والتفكير",
    brainSkill: "معرفة + تحليل",
  },
  {
    id: "snake",
    label: "الثعبان",
    emoji: "🐍",
    difficulty: 4,
    goal: "وصّل أطول ثعبان ممكن",
    benefit: "بيحسّن التخطيط المستقبلي والانتباه المستمر",
    brainSkill: "تخطيط + تركيز",
  },
  {
    id: "flappy",
    label: "الطائر",
    emoji: "🐦",
    difficulty: 3,
    goal: "اطير أطول مسافة",
    benefit: "بيطوّر التوقيت وردّ الفعل السريع",
    brainSkill: "توقيت + ردّ فعل",
  },
  {
    id: "memory",
    label: "البطاقات",
    emoji: "🧠",
    difficulty: 2,
    goal: "لاقي كل الأزواج بأقل حركات",
    benefit: "بيقوّي الذاكرة قصيرة المدى والتركيز البصري",
    brainSkill: "ذاكرة + تركيز",
  },
  {
    id: "bouncy",
    label: "المكعب",
    emoji: "🟦",
    difficulty: 1,
    goal: "اجمع أكتر مكعبات في وقت قصير",
    benefit: "بيحسّن التنسيق بين العين واليد",
    brainSkill: "تنسيق + سرعة",
  },
];
