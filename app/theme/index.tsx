"use client";

import { extendTheme, type StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { config } from "./config";
import { accents, DEFAULT_ACCENT } from "./accents";

// King Gizzard & the Lizard Wizard palette: acid yellow into Nonagon orange,
// with swampy greens and deep psychedelic purples
const colors = {
  // Default accent; visitors can switch it with the header color picker
  brand: accents.find((a) => a.id === DEFAULT_ACCENT)?.shades,
  lizard: {
    50: "#e9fbe5",
    100: "#c6f2bc",
    200: "#9ee88f",
    300: "#74dd62",
    400: "#52d23f",
    500: "#3bb52a", // swamp green
    600: "#2d8c20",
    700: "#206417",
    800: "#143d0e",
    900: "#081705",
  },
  // Dark shades pulled toward purple so dark mode feels like a Gizz poster.
  // Light shades are left neutral so light mode stays easy to read.
  gray: {
    50: "#faf6ec",
    100: "#f1ebdc",
    200: "#e2dac8",
    300: "#cbc0aa",
    400: "#a2968a",
    500: "#7d7088",
    600: "#5a4b6b",
    700: "#3a2a4f",
    800: "#24163a",
    900: "#160c26",
  },
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("gray.50", "gray.900")(props),
      color: mode("gray.800", "gray.50")(props),
    },
    "::selection": {
      bg: "brand.500",
      color: "gray.900",
    },
    a: {
      _hover: { color: mode("brand.700", "brand.300")(props) },
    },
  }),
};

const theme = extendTheme({
  config,
  colors,
  styles,
  semanticTokens: {
    colors: {
      "chakra-border-color": { _light: "gray.200", _dark: "gray.700" },
    },
  },
});

export default theme;
