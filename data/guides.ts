import type { GuideCategory, GuideStats } from "@/lib/content/types";

export interface GuideMeta {
  id: string;
  slug: string;
  pdfUrl: string;
  coverImage?: string;
  category: GuideCategory;
  videoNumber: number;
  stats: GuideStats;
  isNew?: boolean;
}

export const guideMetas: GuideMeta[] = [
  // ─── Management & Leadership ────────────────────────────
  {
    id: "g01",
    slug: "first-meeting-with-new-manager",
    pdfUrl: "/guides/g01.pdf",
    category: "management",
    videoNumber: 1,
    stats: { views: 12400, downloads: 3180 },
  },
  {
    id: "g02",
    slug: "manager-doesnt-transfer-stress",
    pdfUrl: "/guides/g02.pdf",
    category: "management",
    videoNumber: 2,
    stats: { views: 9800, downloads: 2540 },
  },
  {
    id: "g03",
    slug: "monitoring-vs-controlling",
    pdfUrl: "/guides/g03.pdf",
    category: "management",
    videoNumber: 3,
    stats: { views: 8600, downloads: 2210 },
  },
  {
    id: "g04",
    slug: "understand-your-team-work",
    pdfUrl: "/guides/g04.pdf",
    category: "management",
    videoNumber: 4,
    stats: { views: 7300, downloads: 1980 },
  },
  {
    id: "g05",
    slug: "from-employee-to-leader",
    pdfUrl: "/guides/g05.pdf",
    category: "management",
    videoNumber: 5,
    stats: { views: 11200, downloads: 3050 },
  },
  {
    id: "g06",
    slug: "good-employee-not-best",
    pdfUrl: "/guides/g06.pdf",
    category: "management",
    videoNumber: 6,
    stats: { views: 6900, downloads: 1760 },
  },

  // ─── Career Growth ──────────────────────────────────────
  {
    id: "g07",
    slug: "why-you-work-hard-not-promoted",
    pdfUrl: "/guides/g07.pdf",
    category: "career",
    videoNumber: 7,
    stats: { views: 15600, downloads: 4300 },
    isNew: true,
  },
  {
    id: "g08",
    slug: "before-asking-for-raise",
    pdfUrl: "/guides/g08.pdf",
    category: "career",
    videoNumber: 8,
    stats: { views: 13200, downloads: 3810 },
  },
  {
    id: "g09",
    slug: "seven-work-rules",
    pdfUrl: "/guides/g09.pdf",
    category: "career",
    videoNumber: 9,
    stats: { views: 10100, downloads: 2900 },
  },
  {
    id: "g10",
    slug: "replying-after-work",
    pdfUrl: "/guides/g10.pdf",
    category: "career",
    videoNumber: 10,
    stats: { views: 7800, downloads: 2100 },
  },
  {
    id: "g11",
    slug: "dealing-with-difficult-manager",
    pdfUrl: "/guides/g11.pdf",
    category: "career",
    videoNumber: 11,
    stats: { views: 9200, downloads: 2450 },
    isNew: true,
  },

  // ─── Business & Numbers ─────────────────────────────────
  {
    id: "g12",
    slug: "sales-up-profit-down",
    pdfUrl: "/guides/g12.pdf",
    category: "business",
    videoNumber: 12,
    stats: { views: 8700, downloads: 2320 },
  },
  {
    id: "g13",
    slug: "why-customer-doesnt-return",
    pdfUrl: "/guides/g13.pdf",
    category: "business",
    videoNumber: 13,
    stats: { views: 6400, downloads: 1700 },
  },
  {
    id: "g14",
    slug: "same-product-different-success",
    pdfUrl: "/guides/g14.pdf",
    category: "business",
    videoNumber: 14,
    stats: { views: 7100, downloads: 1890 },
  },
  {
    id: "g15",
    slug: "repeated-mistakes-review-system",
    pdfUrl: "/guides/g15.pdf",
    category: "business",
    videoNumber: 15,
    stats: { views: 5900, downloads: 1550 },
  },

  // ─── Thinking & Decision-making ─────────────────────────
  {
    id: "g16",
    slug: "no-need-to-be-100-percent",
    pdfUrl: "/guides/g16.pdf",
    category: "decision",
    videoNumber: 16,
    stats: { views: 10800, downloads: 2950 },
    isNew: true,
  },
  {
    id: "g17",
    slug: "continue-or-change-decision",
    pdfUrl: "/guides/g17.pdf",
    category: "decision",
    videoNumber: 17,
    stats: { views: 8100, downloads: 2200 },
  },
  {
    id: "g18",
    slug: "why-we-lose-opportunities",
    pdfUrl: "/guides/g18.pdf",
    category: "decision",
    videoNumber: 18,
    stats: { views: 6900, downloads: 1820 },
  },
  {
    id: "g19",
    slug: "not-all-ai-tools-save-time",
    pdfUrl: "/guides/g19.pdf",
    category: "decision",
    videoNumber: 19,
    stats: { views: 9500, downloads: 2600 },
  },
  {
    id: "g20",
    slug: "busy-not-productive",
    pdfUrl: "/guides/g20.pdf",
    category: "decision",
    videoNumber: 20,
    stats: { views: 11800, downloads: 3300 },
    isNew: true,
  },
];

export const guideCategories = [
  "management",
  "career",
  "business",
  "decision",
] as const;
