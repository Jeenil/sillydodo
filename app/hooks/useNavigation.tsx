"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export type SectionId = "about" | "work" | "opensource" | "contact" | "quiz";

interface NavigationContextType {
  currentSection: SectionId;
  setCurrentSection: (section: SectionId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [currentSection, setCurrentSection] = useState<SectionId>("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NavigationContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
