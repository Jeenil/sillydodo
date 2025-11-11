"use client";

import { ChakraProvider } from "@chakra-ui/react";

/**
 * Providers component that wraps the app with Chakra UI
 * Must be a Client Component ('use client') because Chakra uses React Context
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ChakraProvider: Makes all Chakra UI components available
    <ChakraProvider>{children}</ChakraProvider>
  );
}
