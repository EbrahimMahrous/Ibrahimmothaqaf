// ─────────────────────────────────────────────────────────────
// Games i18n dictionary — Snake removed
// ─────────────────────────────────────────────────────────────

export type GamesLang = "ar" | "en";

export interface GamesDict {
  panelTitle: string;
  panelSubtitle: string;
  tabsLabel: string;
  close: string;
  open: string;

  score: string;
  highScore: string;
  start: string;
  reset: string;
  running: string;
  paused: string;

  games: Record<
    "quiz" | "falcon" | "memory" | "decisions",
    {
      label: string;
      goal: string;
      benefit: string;
      brainSkill: string;
      instructions: string;
    }
  >;

  quiz: {
    pickCategory: string;
    allCategories: string;
    questionOf: string;
    correctAnswer: string;
    wrongAnswer: string;
    score: string;
    playAgain: string;
    excellent: string;
    good: string;
    needsReview: string;
    next: string;
    categories: Record<string, string>;
  };

  memory: {
    moves: string;
    seconds: string;
    pickTheme: string;
    themes: {
      animals: string;
      flags: string;
      symbols: string;
      tools: string;
    };
  };

  falcon: {
    tapToFly: string;
    gameOver: string;
    yourScore: string;
  };

  decisions: {
    pickFast: string;
    streak: string;
  };
}

export const GAMES_DICT: Record<GamesLang, GamesDict> = {
  ar: {
    panelTitle: "ألعاب مثقف",
    panelSubtitle: "درّب عقلك في 5 دقايق",
    tabsLabel: "اختر لعبة",
    close: "إغلاق",
    open: "افتح ألعاب مثقف",

    score: "النقاط",
    highScore: "أعلى",
    start: "ابدأ",
    reset: "إعادة",
    running: "شغال",
    paused: "متوقف",

    games: {
      quiz: {
        label: "اختبار مثقف",
        goal: "جاوب 10 أسئلة في 4 مجالات",
        benefit: "يختبر معرفتك الحقيقية في الإدارة والقيادة والتفكير",
        brainSkill: "معرفة + تحليل",
        instructions: "10 أسئلة — كل إجابة صح = 10 نقاط",
      },
      falcon: {
        label: "صقر مثقف",
        goal: "حلّق أعلى واجمع نجوم",
        benefit: "يطوّر التوقيت وردّ الفعل السريع",
        brainSkill: "توقيت + ردّ فعل",
        instructions: "اضغط أو المساحة للطيران — اجمع النجوم",
      },
      memory: {
        label: "بطاقات الذاكرة",
        goal: "لاقي كل الأزواج بأقل حركات",
        benefit: "يقوّي الذاكرة قصيرة المدى والتركيز البصري",
        brainSkill: "ذاكرة + تركيز",
        instructions: "اقل حركات + وقت = نقاط أعلى",
      },
      decisions: {
        label: "قرارات",
        goal: "اختار القرار الصح بسرعة",
        benefit: "يدرّب اتخاذ القرار تحت ضغط الوقت",
        brainSkill: "سرعة + تفكير",
        instructions: "اضغط على القرار الصح قبل ما الوقت يخلص",
      },
    },

    quiz: {
      pickCategory: "اختبر معرفتك",
      allCategories: "كل المجالات",
      questionOf: "سؤال {n} / {total}",
      correctAnswer: "إجابة صحيحة!",
      wrongAnswer: "إجابة غلط",
      score: "نتيجة",
      playAgain: "العب تاني",
      excellent: "ممتاز! معرفتك قوية",
      good: "كويس جدًا، كمّل كده",
      needsReview: "محتاج تراجع شوية — ابدأ من المكتبة",
      next: "التالي",
      categories: {
        management: "الإدارة والقيادة",
        career: "التطور الوظيفي",
        business: "البزنس والأرقام",
        thinking: "التفكير واتخاذ القرار",
      },
    },

    memory: {
      moves: "الحركات",
      seconds: "ثانية",
      pickTheme: "اختر ثيم",
      themes: {
        animals: "حيوانات",
        flags: "أعلام عربية",
        symbols: "رموز",
        tools: "أدوات",
      },
    },

    falcon: {
      tapToFly: "اضغط للطيران",
      gameOver: "انتهت الرحلة",
      yourScore: "نقاطك",
    },

    decisions: {
      pickFast: "اختار بسرعة!",
      streak: "متتالية",
    },
  },

  en: {
    panelTitle: "Mosaqaf Games",
    panelSubtitle: "Train your brain in 5 minutes",
    tabsLabel: "Pick a game",
    close: "Close",
    open: "Open Mosaqaf Games",

    score: "Score",
    highScore: "High",
    start: "Start",
    reset: "Reset",
    running: "Running",
    paused: "Paused",

    games: {
      quiz: {
        label: "Mosaqaf Quiz",
        goal: "Answer 10 questions across 4 categories",
        benefit:
          "Tests your real knowledge in management, leadership, and thinking",
        brainSkill: "Knowledge + Analysis",
        instructions: "10 questions — each correct = 10 points",
      },
      falcon: {
        label: "Mosaqaf Falcon",
        goal: "Soar high and collect stars",
        benefit: "Sharpens timing and quick reflexes",
        brainSkill: "Timing + Reflex",
        instructions: "Tap or Space to fly — collect stars",
      },
      memory: {
        label: "Memory Cards",
        goal: "Find all pairs in fewest moves",
        benefit: "Strengthens short-term memory and visual focus",
        brainSkill: "Memory + Focus",
        instructions: "Fewer moves + less time = higher score",
      },
      decisions: {
        label: "Decisions",
        goal: "Pick the right decision fast",
        benefit: "Trains decision-making under time pressure",
        brainSkill: "Speed + Thinking",
        instructions: "Click the right answer before time runs out",
      },
    },

    quiz: {
      pickCategory: "Test your knowledge",
      allCategories: "All categories",
      questionOf: "Question {n} / {total}",
      correctAnswer: "Correct!",
      wrongAnswer: "Wrong answer",
      score: "Score",
      playAgain: "Play again",
      excellent: "Excellent! Strong knowledge",
      good: "Great job, keep going",
      needsReview: "Needs review — start from the library",
      next: "Next",
      categories: {
        management: "Management & Leadership",
        career: "Career Growth",
        business: "Business & Numbers",
        thinking: "Thinking & Decisions",
      },
    },

    memory: {
      moves: "Moves",
      seconds: "sec",
      pickTheme: "Pick a theme",
      themes: {
        animals: "Animals",
        flags: "Arab Flags",
        symbols: "Symbols",
        tools: "Tools",
      },
    },

    falcon: {
      tapToFly: "Tap to fly",
      gameOver: "Flight ended",
      yourScore: "Your score",
    },

    decisions: {
      pickFast: "Pick fast!",
      streak: "Streak",
    },
  },
};

export function getGamesDict(lang: string): GamesDict {
  return GAMES_DICT[lang === "en" ? "en" : "ar"];
}
