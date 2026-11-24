// ─────────────────────────────────────────────────────────────
// Shared API types
// ─────────────────────────────────────────────────────────────

export interface HeroImage {
  _id: string;
  url: string;
  publicId: string;
  alt: string;

  // Optional display metadata
  title?: string;
  description?: string;
  badge?: "" | "new" | "featured" | "video";

  // Optional link to a DownloadFile (populated object or raw id)
  fileId?:
    | string
    | {
        _id: string;
        title: string;
        format: string;
        size: number;
        downloads: number;
        views: number;
        videoUrl?: string;
      }
    | null;

  // Optional external video (YouTube/Vimeo) + CTA
  videoUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;

  // Stats
  views?: number;
  clicks?: number;

  order: number;
  createdAt: string;
  updatedAt?: string;
}
export interface DownloadFile {
  _id: string;
  title: string;
  description: string;
  url: string;
  publicId: string;
  size: number;
  format: string;
  mimeType?: string;
  downloads: number;
  views: number;
  category: "management" | "career" | "business" | "decision" | "other";
  tags: string[];
  coverImage?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isPublished?: boolean;
  order?: number;
  createdAt: string;
  updatedAt?: string;
  videoUrl?: string;
}

export interface Settings {
  _id: string;
  logo: { url: string; publicId: string };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
  };
  whatsapp: string;
  contactEmail: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  message?: string;
}

// ─────────────────────────────────────────────────────────────
// Library
// ─────────────────────────────────────────────────────────────

export type CategoryFilter = DownloadFile["category"] | "all";

export interface LibraryFiltersProps {
  categories: Record<string, string>;
  active: CategoryFilter;
  onChange: (c: CategoryFilter) => void;
  allLabel: string;
  searchValue: string;
  onSearch: (v: string) => void;
  searchPlaceholder: string;
}

export interface LibraryGridProps {
  files: DownloadFile[];
  locale: "ar" | "en";
  labels: {
    filters: { all: string; searchPlaceholder: string; emptyState: string };
    categories: Record<string, string>;
    card: {
      download: string;
      watchVideo: string;
      preview: string;
      views: string;
      downloads: string;
      isNew: string;
      featured: string;
    };
  };
}

export interface FileCardProps {
  file: DownloadFile;
  locale: "ar" | "en";
  labels: {
    download: string;
    watchVideo: string;
    preview: string;
    views: string;
    downloads: string;
    isNew: string;
    featured: string;
    categories: Record<string, string>;
  };
}

// ─────────────────────────────────────────────────────────────
// Featured Guides
// ─────────────────────────────────────────────────────────────

export interface FeaturedGuidesProps {
  locale: "ar" | "en";
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  files: DownloadFile[];
  cardLabels: {
    download: string;
    watchVideo: string;
    preview: string;
    views: string;
    downloads: string;
    isNew: string;
    featured: string;
    categories: Record<string, string>;
  };
}

// ─────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────

export interface ContactSectionLabels {
  letsTalk: string;
  gotIdea: string;
  buildTogether: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactResponseTime?: string;
  contactAlt?: string;
  contactFormName?: string;
  contactFormNamePlaceholder?: string;
  contactFormEmail?: string;
  contactFormEmailPlaceholder?: string;
  contactFormMessage?: string;
  contactFormMessagePlaceholder?: string;
  contactFormSubmit?: string;
  contactFormSuccess?: string;
  contactFormSending?: string;
  contactFormError?: string;
  faqTitle?: string;
  faqViewAll?: string;
}

export interface ContactSectionProps {
  locale: string;
  settings?: Settings | null;
  labels: ContactSectionLabels;
}

export interface QuickContactFormProps {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  successLabel: string;
  sendingLabel: string;
  errorLabel: string;
}

// ─────────────────────────────────────────────────────────────
// Newsletter
// ─────────────────────────────────────────────────────────────

export interface NewsletterSectionLabels {
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  newsletterHint?: string;
  newsletterPlaceholder: string;
  newsletterSubmit: string;
  newsletterSuccess: string;
  newsletterError?: string;
  newsletterPerks?: {
    weekly?: string;
    exclusive?: string;
    noSpam?: string;
    unsubscribe?: string;
    readers?: string;
  };
}

export interface NewsletterSectionProps {
  labels: NewsletterSectionLabels;
}

export interface NewsletterFormProps {
  placeholder: string;
  submitLabel: string;
  successMessage?: string;
  errorMessage?: string;
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────

export interface FooterNav {
  home: string;
  about: string;
  library: string;
  mothaqaf: string;
  projects: string;
}

export interface FooterInfo {
  rights: string;
  tagline: string;
  madeBy: string;
}

export interface FooterLabels {
  contact: string;
  navigation: string;
  follow: string;
  backToTop: string;
  crafted: string;
  brandHomeAria: string;
  signature: string;
}

export interface FooterProps {
  locale: string;
  footer: FooterInfo;
  nav: FooterNav;
  labels: FooterLabels;
  settings?: Settings | null;
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────

export type FAQCategory = "general" | "content" | "collaboration" | "technical";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export interface FAQContentProps {
  locale: string;
  t: ReturnType<typeof import("@/lib/i18n").getMessages>;
}

// ─────────────────────────────────────────────────────────────
// Arab World
// ─────────────────────────────────────────────────────────────

export interface ArabCountry {
  code: string;
  flag: string;
  nameAr: string;
  nameEn: string;
}

export interface ArabWorldSectionProps {
  locale: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  welcomeMessages: {
    default: string;
    [countryCode: string]: string;
  };
}

// ─────────────────────────────────────────────────────────────
// Page props (Next.js App Router)
// ─────────────────────────────────────────────────────────────

export interface PageProps {
  params: Promise<{ locale: string }>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}
