"use client"; // <--- Add this back

import { extendTheme } from "@chakra-ui/react";
import { config } from "./theme-config";

// Simple color customization
const colors = {
  brand: {
    500: "#2196F3", // Blue
  },
};

// This now runs safely on the client
const theme = extendTheme({
  config,
  colors,
});

export default theme;
