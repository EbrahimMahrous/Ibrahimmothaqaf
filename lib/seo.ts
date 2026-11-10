import type { Metadata } from 'next'
import { siteConfig, type Locale } from '@/config/site.config'

interface BuildMetadataArgs {
  locale: string
  title: string
  description: string
  path?: string
}

export function buildMetadata({ locale, title, description, path = '' }: BuildMetadataArgs): Metadata {
  const l = (locale === 'en' ? 'en' : 'ar') as Locale
  const fullTitle = `${title} — ${siteConfig.siteName[l]}`
  const url = `${siteConfig.url}/${l}${path}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        ar: `${siteConfig.url}/ar${path}`,
        en: `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.siteName[l],
      locale: l === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}