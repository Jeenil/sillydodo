"use client";

import { EmotionRegistry } from "./EmotionRegistry";
import { ChakraProvider, cookieStorageManagerSSR } from "@chakra-ui/react";
import theme from "../theme";
import { NavigationProvider } from "../hooks/useNavigation";

interface ProvidersProps {
  children: React.ReactNode;
  cookieHeader: string;
}

export function Providers({ children, cookieHeader }: ProvidersProps) {
  return (
    <EmotionRegistry>
      <ChakraProvider theme={theme} colorModeManager={cookieStorageManagerSSR(cookieHeader)}>
        <NavigationProvider>{children}</NavigationProvider>
      </ChakraProvider>
    </EmotionRegistry>
  );
}
