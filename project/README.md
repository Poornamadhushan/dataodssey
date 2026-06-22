# Data Odyssey 2026

Data Odyssey 2026 is a Next.js landing site for the AI & Data Science Club, General Sir John Kotelawala Defence University. It presents the inter-university data science competition and exhibition with sections for the event overview, prizes, timeline, schedule, eligibility, past events, industry impact, and partners.

## Tech Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion, GSAP, Three.js, and Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Quality Checks

```bash
npm run lint
npm run typecheck
```

## Project Structure

- `app/` contains the application shell, layout, and page entry point.
- `components/` contains the landing page sections and shared UI pieces.
- `public/images/` contains logos and past event assets.
- `lib/` and `hooks/` contain shared helpers and client-side hooks.

## Deployment

The project includes `netlify.toml`, so it is ready to be deployed on Netlify after building with the standard Next.js workflow.
