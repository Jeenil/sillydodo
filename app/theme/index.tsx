"use client";

import { extendTheme } from "@chakra-ui/react";
import { config } from "./config";

// Simple color customization
const colors = {
  brand: {
    500: "#f3db21ff", // Blue
  },
};

// This now runs safely on the client
const theme = extendTheme({
  config,
  colors,
});

export default theme;
