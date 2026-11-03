// Accent palettes visitors can pick from. Each one replaces the `brand` scale,
// so everything using brand.* (sidebar highlight, buttons, tabs, links) follows.
// The 500 shade sits behind dark text on buttons, so keep it bright.

export type Shades = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;

export interface Accent {
  id: string;
  label: string;
  shades: Shades;
}

export const accents: Accent[] = [
  {
    id: "gold",
    label: "Acid gold",
    shades: {
      50: "#fffbe0", 100: "#fff3b0", 200: "#ffe97a", 300: "#ffde45", 400: "#f9d423",
      500: "#f3b61f", 600: "#e8891c", 700: "#c45a16", 800: "#8f3a12", 900: "#5c220c",
    },
  },
  {
    id: "green",
    label: "Swamp green",
    shades: {
      50: "#e9fbe5", 100: "#c6f2bc", 200: "#9ee88f", 300: "#74dd62", 400: "#5fd84b",
      500: "#52d23f", 600: "#3bb52a", 700: "#2d8c20", 800: "#206417", 900: "#143d0e",
    },
  },
  {
    id: "purple",
    label: "Psychedelic purple",
    shades: {
      50: "#f5efff", 100: "#e4d6ff", 200: "#d2bcff", 300: "#c2a5fb", 400: "#b893f8",
      500: "#b085f5", 600: "#8f5ee6", 700: "#7043c7", 800: "#502e94", 900: "#321a61",
    },
  },
  {
    id: "teal",
    label: "Microtonal teal",
    shades: {
      50: "#e0fbf9", 100: "#b3f3ee", 200: "#80eae3", 300: "#4ddfd6", 400: "#33d4cb",
      500: "#2cc9c0", 600: "#1fa39c", 700: "#157d78", 800: "#0d5753", 900: "#06322f",
    },
  },
  {
    id: "red",
    label: "Rats' nest red",
    shades: {
      50: "#ffeceb", 100: "#ffcdca", 200: "#ffaba6", 300: "#fb8a83", 400: "#f6766e",
      500: "#f2665c", 600: "#d9443a", 700: "#b0302a", 800: "#7d201c", 900: "#4c120f",
    },
  },
];

export const DEFAULT_ACCENT = "gold";
const STORAGE_KEY = "sillydodo-accent";

export function applyAccent(id: string) {
  const accent = accents.find((a) => a.id === id) ?? accents[0];
  if (!accent) return;
  const root = document.documentElement.style;
  for (const [shade, value] of Object.entries(accent.shades)) {
    root.setProperty(`--chakra-colors-brand-${shade}`, value);
  }
}

export function loadAccent(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

export function saveAccent(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Private mode or blocked storage: the pick just won't be remembered
  }
}
