export type Locale = "ar" | "en";

export interface LocalizedText {
  ar: string;
  en: string;
}

export const siteConfig = {
  locales: ["ar", "en"] as const,
  defaultLocale: "ar" as const,

  name: {
    ar: "إبراهيم ",
    en: "Ibrahim ",
  },
  siteName: {
    ar: "إبراهيم ",
    en: "Ibrahim ",
  },
  description: {
    ar: "أدير الفرق والعمليات، وأشارك تجاربي وأفكاري من واقع العمل، بهدف نشر المعرفة وصناعة أثر يتجاوز حدود التجربة.",
    en: "Leading teams and operations, sharing real-world experiences and ideas to spread knowledge and create lasting impact.",
  },
  url: "https://ibrahimmothaqaf.vercel.app",

  social: {
    linkedin: "",
    twitter: "",
    github: "",
    email: "",
  },

  contact: {
    email: "",
    phone: "",
  },

  brand: {
    tagline: {
      ar: "مدير تشغيل · منشئ محتوى · صانع أثر",
      en: "Operations Manager · Content Creator · Impact Maker",
    },
  },
} as const;
