"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { NavigationProvider } from "../hooks/useNavigation";

/**
 * Providers component that wraps the app with Chakra UI and Navigation context
 * Must be a Client Component ('use client') because Chakra uses React Context.
 * CacheProvider fixes the SSR/hydration mismatch by flushing Emotion styles
 * via Next.js useServerInsertedHTML before the client hydrates.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <NavigationProvider>{children}</NavigationProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
