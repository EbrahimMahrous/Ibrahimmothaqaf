export type QuizCategory = "management" | "career" | "business" | "thinking";

export interface QuizQuestion {
  category: QuizCategory;
  question: string;
  options: [string, string];
  correct: 0 | 1;
  explanation: string;
}

export const QUIZ_CATEGORIES: Record<
  QuizCategory,
  { label: string; emoji: string; color: string }
> = {
  management: {
    label: "الإدارة والقيادة",
    emoji: "👔",
    color: "var(--color-primary)",
  },
  career: {
    label: "التطور الوظيفي",
    emoji: "📈",
    color: "#10b981",
  },
  business: {
    label: "البزنس والأرقام",
    emoji: "💰",
    color: "#f59e0b",
  },
  thinking: {
    label: "التفكير واتخاذ القرار",
    emoji: "🧩",
    color: "#8b5cf6",
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ─── Management ───────────────────────────────────────
  {
    category: "management",
    question: "المدير الفعّال هو اللي بيدير كل حاجة بنفسه عشان يتأكد إنها صح.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "المدير الفعّال بيفوّض وبيبني أنظمة تشتغل من غيره. الإدارة الذاتية للتفاصيل بتخلق اختناق (bottleneck).",
  },
  {
    category: "management",
    question: "لما فريقك يغلط، أول خطوة هي محاسبته فورًا.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "أول خطوة هي فهم السبب (نظام؟ تدريب؟ موارد؟). المحاسبة قبل التحليل بتخلق خوف مش تعلّم.",
  },
  {
    category: "management",
    question:
      "الاجتماعات اليومية القصيرة (standup) بتقلل الحاجة لاجتماعات طويلة.",
    options: ["صح", "غلط"],
    correct: 0,
    explanation:
      "Standup 15 دقيقة بيقلل التواصل غير الرسمي والاجتماعات الطويلة، وبيخلي المشاكل تظهر بدري.",
  },
  {
    category: "management",
    question: "لازم كل قرار ياخده المدير يكون بإجماع الفريق.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "الإجماع مش دايمًا ممكن. القائد بيسمع الفريق، لكنه مسؤول عن القرار النهائي.",
  },
  // ─── Career ───────────────────────────────────────────
  {
    category: "career",
    question: "لو عايز ترقّي، أهم حاجة هي إنك تشتغل أكتر ساعات.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "الترقية بتيجي من الأثر (impact) مش من الساعات. تحل مشكلة أكبر = ترقية أسرع.",
  },
  {
    category: "career",
    question: "لازم تسأل مديرك عن خطة تطويرك كل 6 شهور على الأقل.",
    options: ["صح", "غلط"],
    correct: 0,
    explanation:
      "مبادرة تطويرك مسؤوليتك. السؤال الدوري بيخلي التوقعات واضحة وبيقلل المفاجآت.",
  },
  {
    category: "career",
    question: "الشهادة أهم من الشبكة المهنية.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "الاتنين مهمين، لكن الشبكة بتفتح أبواب مش موجودة في الشهادات. الشهادة بتثبت، الشبكة بتوصل.",
  },
  // ─── Business ─────────────────────────────────────────
  {
    category: "business",
    question: "زيادة الإيرادات دايمًا معناها زيادة الربح.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "الربح = الإيرادات − التكاليف. لو التكاليف زادت أسرع من الإيرادات، الربح بيقل.",
  },
  {
    category: "business",
    question: "Cash flow أهم من الربح على المدى القصير.",
    options: ["صح", "غلط"],
    correct: 0,
    explanation:
      "شركات كتير بتربح في الدفاتر وبتفلس بسبب نقص السيولة. الكاش هو الأكسجين.",
  },
  {
    category: "business",
    question: "لو التكلفة بتزيد، أفضل حل دايمًا هو تقليل الفريق.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "تقليل الفريق ممكن يقلل القدرة على النمو. الأفضل تحليل: هل التكلفة في المكان الصح؟",
  },
  {
    category: "business",
    question: "مؤشرات الأداء (KPIs) لازم تكون قابلة للقياس.",
    options: ["صح", "غلط"],
    correct: 0,
    explanation:
      "الـ KPI غير القابل للقياس = رأي مش مؤشر. لازم رقم + إطار زمني + مسؤول.",
  },
  // ─── Thinking ─────────────────────────────────────────
  {
    category: "thinking",
    question: "أول حل يخطر على بالك غالبًا هو الأفضل.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "أول حل غالبًا بيكون الأسرع مش الأفضل. خد وقتك لتوليد بدائل قبل الاختيار.",
  },
  {
    category: "thinking",
    question: "لما تكون مش متأكد، الأفضل تأجل القرار لأطول فترة.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "التأجيل قرار برضه، وأحيانًا أغلى من القرار الغلط. حدد وقت للقرار وخده.",
  },
  {
    category: "thinking",
    question: "الاعتماد على البيانات دايمًا أحسن من الحدس.",
    options: ["صح", "غلط"],
    correct: 1,
    explanation:
      "البيانات بتحكي 'إيه' بس مش 'ليه'. الحدس المبني على خبرة بيكمل الصورة.",
  },
  {
    category: "thinking",
    question: "لما تلاقي معلومة بتأكد رأيك، لازم تدور على معلومة بتعارضه.",
    options: ["صح", "غلط"],
    correct: 0,
    explanation:
      "ده اسمه 'التفكير النقدي'. البحث عن الرأي المعارض بيقلل التحيز وبيحسّن القرار.",
  },
];
