"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { NavigationProvider } from "../hooks/useNavigation";

/**
 * Providers component that wraps the app with Chakra UI and Navigation context
 * Must be a Client Component ('use client') because Chakra uses React Context
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <NavigationProvider>{children}</NavigationProvider>
    </ChakraProvider>
  );
}
