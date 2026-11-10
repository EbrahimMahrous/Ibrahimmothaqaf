# Ibrahim Mahrous — Personal Website

A bilingual (Arabic / English) personal website for **Ibrahim Mahrous** —
Operations Manager, Content Creator, and Impact Maker.

The site shares practical lessons on management, leadership, and
decision-making, built on real-world experience running teams and systems.

## ✨ Features

- **Bilingual** — full RTL/LTR support (Arabic + English) via a typed
  i18n layer (`lib/i18n.ts` + `locales/*/*.json`).
- **App Router** — Next.js 14+ with the App Router, server components,
  and localized route segments (`/ar`, `/en`).
- **Content repository** — a single entry point (`lib/content/repository.ts`)
  that can be swapped from local JSON data to a real API/SQL backend
  without touching any page.
- **Guide library** — searchable + filterable grid of guides, each tied to
  a PDF download and a video.
- **Editorial design system** — brand colors, tints, and typography defined
  once in `app/globals.css` via Tailwind `@theme` tokens.
- **Animated avatar** — a multi-variant 3D avatar with rotating rings,
  status dot, and floating role labels.
- **Newsletter form** — a client-side form ready to be wired to an API route.

## 🛠 Tech Stack

| Layer        | Choice                                   |
| ------------ | ---------------------------------------- |
| Framework    | Next.js (App Router)                     |
| Language     | TypeScript                               |
| Styling      | Tailwind CSS v4 (`@theme` tokens)        |
| Fonts        | Cairo (Arabic) + Inter (English)         |
| Icons        | Inline SVG                               |
| i18n         | Custom typed layer over JSON files       |
| Content      | Local JSON + TS data (swap-ready)        |

## 📂 Project Structure
