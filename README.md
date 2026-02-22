# sillydodo.net

> Personal portfolio and passion project built with modern web technologies.

## Current Version: v2.0 (Split-View Single-Page App)

**Live Site:** sillydodo.net
**Repository:** https://github.com/Jeenil/sillydodo

---

## Project Evolution

### v1.0 (Initial Setup)

- Basic Next.js site with Chakra UI
- Single page with About section
- Dark mode support
- Deployed to Vercel

### v2.0 (Current - November 2025)

- Single-page application (no page refreshes)
- Split-view layout (sidebar + main content)
- Responsive design (desktop sidebar, mobile drawer)
- 4 sections: About, Projects, Infrastructure, Contact
- Smooth section transitions with animations
- Navigation state management with React Context

---

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Chakra UI v2** - Component library
- **Vercel** - Hosting platform

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

### Responsive Design

```tsx
<Box width={{ base: '100%', md: '280px' }}>
```

- `base`: Mobile (0px+)
- `md`: Tablet (768px+)
- `lg`: Desktop (1024px+)

### Component Composition

- Build from small, reusable pieces
- SidebarContent used in desktop AND mobile
- ContactLink reused for each social link

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
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
│       └── ContactSection.tsx
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
- 4 sections with content
- Dark mode toggle
- React Context navigation

### In Progress

- GitHub API integration for local-configs
- Markdown rendering
- Syntax highlighting

### Next Up

- GitHub Actions for doc generation
- K8s/ArgoCD/Airflow setup
- Infrastructure documentation
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

**Version**: 2.0
