# sillydodo.net

> Personal portfolio and passion project.

## Project Goals

- Build a modern portfolio website to showcase projects and experience

## Tech Stack

- **Framework**: Next.js (coming soon)
- **Language**: TypeScript
- **Hosting**: Vercel (free tier)
- **DNS**: Porkbun
- **Linting**: complete-lint (ESLint + Prettier + cspell)

## Setup

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/Jeenil/sillydodo.git
cd sillydodo

# 2. Initialize npm and install dependencies
npm init -y
npm install -D complete-lint

# 3. Install Next.js (coming next!)
# TODO
```

## What I've Learned So Far

### Vim Basics

- `i` - Enter Insert mode
- `Esc` - Return to Normal mode
- `:wq` - Save and quit
- `0` - Go to beginning of line
- `$` - Go to end of line
- `gg` - Go to top of file
- `G` - Go to bottom of file

### Bash Terminal Navigation (Mac)

- `Ctrl + A` - Beginning of line
- `Ctrl + E` - End of line
- `Ctrl + U` - Delete from cursor to beginning
- `Ctrl + K` - Delete from cursor to end
- `Ctrl + R` - Search command history

## Project Structure

```
sillydodo/
├── .gitignore          # Git ignore rules
├── cspell.json         # Spell checker config
├── tsconfig.json       # TypeScript config (extends complete-tsconfig)
├── package.json        # Project dependencies
└── README.md           # This file
```

## Completed

- [x] Purchase domain (sillydodo.net)
- [x] Initialize Git repository
- [x] Set up GitHub repo
- [x] Configure .gitignore
- [x] Install complete-lint (ESLint, Prettier, cspell)
- [x] Configure TypeScript with strict settings
- [x] Create project README

## Next Steps

- [ ] Install and configure Next.js
- [ ] Set up project structure (src/, components/, etc.)
- [ ] Create homepage
- [ ] Deploy to Vercel
- [ ] Configure DNS to point to Vercel
