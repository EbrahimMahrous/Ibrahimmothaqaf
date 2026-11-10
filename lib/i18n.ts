// Central i18n message registry.
// Each locale bundles its own set of namespaced message files.
// Using `as const` preserves literal types so key autocompletion works.

import arCommon from "@/locales/ar/common.json";
import arHome from "@/locales/ar/home.json";
import arAbout from "@/locales/ar/about.json";
import arLibrary from "@/locales/ar/library.json";
import arMothaqaf from "@/locales/ar/mothaqaf.json";
import arProjects from "@/locales/ar/projects.json";

import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enAbout from "@/locales/en/about.json";
import enLibrary from "@/locales/en/library.json";
import enMothaqaf from "@/locales/en/mothaqaf.json";
import enProjects from "@/locales/en/projects.json";

import type { Locale } from "@/config/site.config";

// Message bundle per locale.
export const messages = {
  ar: {
    common: arCommon,
    home: arHome,
    about: arAbout,
    library: arLibrary,
    mothaqaf: arMothaqaf,
    projects: arProjects,
  },
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    library: enLibrary,
    mothaqaf: enMothaqaf,
    projects: enProjects,
  },
} as const;

// Type of a full message bundle (shape of the Arabic bundle).
export type Messages = typeof messages.ar;

// Available namespaces.
export type Namespace = keyof Messages;

// Type of a single localized principle item.
export type Principle = Messages["about"]["principles"]["items"][number];

/**
 * Returns the full message bundle for a given locale.
 * Falls back to Arabic if the locale is unknown.
 */
export function getMessages(locale: string) {
  const l = (locale === "en" ? "en" : "ar") as Locale;
  return messages[l];
}

/**
 * Returns a single namespace (e.g. "about") for a given locale.
 */
export function getMessagesFor<K extends Namespace>(
  locale: string,
  ns: K,
): Messages[K] {
  return getMessages(locale)[ns];
}

/**
 * Type guard: checks whether a value is one of the supported locales.
 */
export function isLocale(value: string): value is Locale {
  return value === "ar" || value === "en";
}
