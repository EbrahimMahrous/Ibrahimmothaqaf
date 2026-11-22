import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { FAQContent } from "./FAQContent";

export const instant = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    title: isAr ? "الأسئلة الشائعة | مثقف" : "FAQ | Mosaqaf",
    description: isAr
      ? "أجوبة على أكثر الأسئلة شيوعًا حول مثقف، المحتوى، والخدمات."
      : "Answers to the most common questions about Mosaqaf, content, and services.",
    path: "/faq",
  });
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);

  return <FAQContent locale={locale} t={t} />;
}
