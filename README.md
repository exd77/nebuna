# Nebuna Store

Nebuna Store is a modern digital products storefront built with Next.js. It is designed for selling premium subscriptions, AI tools, developer tools, entertainment accounts, VPN access, social premium products, and other digital services in a clean marketplace-style experience.

The vibe is simple: fast checkout, clear product cards, trusted delivery, and a premium dark UI that does not feel like another generic SaaS landing page.

## What is inside

Nebuna Store currently focuses on digital products like:

- Netflix
- YouTube Premium
- ChatGPT Plus
- DigitalOcean VCC $200 Balance
- Canva
- Discord Nitro
- Gemini AI
- VPN
- X / Twitter Account
- Grok Super
- Twitter Verified / Blue Check
- Telegram Premium
- GitHub Student
- Spotify
- Windsurf Pro
- GitHub Copilot Pro

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
- Radix UI primitives
- Lucide icons
- Framer Motion
- Zustand

## Main features

- Dark premium marketplace homepage
- Product-focused landing page sections
- Digital subscription catalog
- Category discovery
- Promo and flash-sale style sections
- Trust, payment, and support blocks
- Login page UI
- Responsive layout for desktop and mobile

## Getting started

Clone the repo and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

If you want to expose it on a server or VM:

```bash
npm run dev -- -H 0.0.0.0 -p 3000
```

## Available scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production server after building.

```bash
npm run lint
```

Runs ESLint.

## Project structure

The exact structure may evolve, but the app is organized around a reusable frontend setup:

```text
src/
  app/          App routes and pages
  components/   Reusable UI and page sections
  lib/          Shared utilities and data helpers
  types/        Shared TypeScript types, if needed
public/         Static assets
```

## Design direction

Nebuna Store uses a dark digital-commerce style:

- near-black, dark navy, and charcoal surfaces
- electric blue and cyan as primary accents
- emerald for success and trust states
- amber/red for promos and urgency
- product-specific colors where it makes sense

The goal is to feel like a real digital marketplace, not a purple SaaS template.

## Roadmap

A few things planned next:

- Real product detail pages
- Checkout flow
- Order tracking
- Authentication integration
- Payment provider integration
- Admin product management
- Better product images and brand assets
- Deployment setup

## Contributing

This is still early, so keep changes focused and practical. If you are improving the UI, try to keep the marketplace feel: product-first, clear pricing, fast delivery, and trustworthy support.

## License

No license has been selected yet.
