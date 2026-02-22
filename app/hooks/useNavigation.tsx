"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SectionId = "about" | "projects" | "infrastructure" | "contact" | "quiz";

interface NavigationContextType {
  currentSection: SectionId;
  setCurrentSection: (section: SectionId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<SectionId>("quiz");
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

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
