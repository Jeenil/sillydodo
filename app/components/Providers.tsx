"use client";

import { ChakraProvider, cookieStorageManagerSSR } from "@chakra-ui/react";
import { NavigationProvider } from "../hooks/useNavigation";
import { theme } from "../theme";
import { EmotionRegistry } from "./EmotionRegistry";

interface ProvidersProps {
  children: React.ReactNode;
  cookieHeader: string;
}

export function Providers({
  children,
  cookieHeader,
}: ProvidersProps): React.JSX.Element {
  return (
    <EmotionRegistry>
      <ChakraProvider
        theme={theme}
        colorModeManager={cookieStorageManagerSSR(cookieHeader)}
      >
        <NavigationProvider>{children}</NavigationProvider>
      </ChakraProvider>
    </EmotionRegistry>
  );
}
