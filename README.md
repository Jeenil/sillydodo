# sillydodo.net

> Personal portfolio and passion project built with modern web technologies.

## Current Version: v3.0 (Gizz Quiz)

**Live Site:** sillydodo.net
**Repository:** https://github.com/Jeenil/sillydodo

---

## Project Evolution

### v1.0 — Initial Setup

- Basic Next.js site with Chakra UI
- Single page with About section
- Dark mode support
- Deployed to Vercel

### v2.0 — Split-View SPA (November 2025)

- Single-page application (no page refreshes)
- Split-view layout (sidebar + main content)
- Responsive design (desktop sidebar, mobile drawer)
- 4 sections: About, Projects, Infrastructure, Contact
- Smooth section transitions with animations
- Navigation state management with React Context

### v3.0 — Gizz Quiz (February 2026)

- Added **Gizz Quiz** section — a King Gizzard & the Lizard Wizard knowledge quiz
- Live data from [kglw.net API](https://kglw.net/api/docs.php) (no auth required)
- Two quiz modes:
  - **Music Trivia** — album, release year, and original/cover questions from the studio discography
  - **Name That Tune** — 30-second clips from real KGLW live recordings (Archive.org), auto-plays on each question
- Show poster art pulled from kglw.net uploads API, displayed alongside each quiz
- Sound effects on correct/wrong answers via Web Audio API (no audio files needed)
- All API data cached at module level — replaying is instant

---

## Tech Stack

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type safety
- **Chakra UI v2** — Component library
- **Vercel** — Hosting platform
- **Bun** — Package manager and dev runner

---

## Key Learnings

### Server vs Client Components

- Server components = default, can't use hooks
- Client components = need `'use client'`, can use state/effects
- Use client when you need: useState, onClick, useContext, browser APIs

### React Context Pattern

- Solves props drilling problem
- Provides global state (navigation)
- Zero external dependencies

### External API Integration (no auth)

- kglw.net API: setlists, albums, uploads, links endpoints
- Archive.org metadata API: per-show recording file lists
- Module-level caching prevents redundant fetches across quiz sessions

### Responsive Design

```tsx
<Box width={{ base: '100%', md: '280px' }}>
```

- `base`: Mobile (0px+)
- `md`: Tablet (768px+)
- `lg`: Desktop (1024px+)

---

## Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun dev --no-turbopack
```

Open http://localhost:3000

---

## Project Structure

```
app/
├── components/
│   ├── Sidebar.tsx              # Navigation
│   ├── Header.tsx               # Top bar
│   ├── Providers.tsx            # Context providers
│   └── sections/                # Page sections
│       ├── AboutSection.tsx
│       ├── ProjectsSection.tsx
│       ├── InfrastructureSection.tsx
│       ├── ContactSection.tsx
│       └── QuizSection.tsx      # Gizz Quiz (kglw.net + Archive.org)
├── hooks/
│   └── useNavigation.tsx        # Navigation state
├── theme/
│   ├── config.tsx               # Theme config
│   └── index.tsx                # Theme implementation
├── layout.tsx
└── page.tsx
```

---

## Roadmap

### Done

- Split-view layout with sidebar
- Mobile responsive drawer
- Dark mode toggle
- React Context navigation
- Gizz Quiz (trivia + name that tune modes)
- Live data from kglw.net and Archive.org

### In Progress

- GitHub API integration for local-configs docs
- Infrastructure section content

### Next Up

- Expand quiz to other artists
- Filter quiz by year / country / tour
- K8s/ArgoCD/Airflow infrastructure docs
- Blog section

---

## Deploy

Vercel auto-deploys on push to `main`.

---

## Contact

- **GitHub**: [@Jeenil](https://github.com/Jeenil)
- **LinkedIn**: [Jeenil Patel](https://www.linkedin.com/in/jeenil-patel)
- **Email**: jeenilrpatel@gmail.com

---

**Version**: 3.0
