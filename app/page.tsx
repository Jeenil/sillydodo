"use client";

import { Box, Container, useDisclosure } from "@chakra-ui/react";
import { DesktopSidebar, MobileSidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { useNavigation } from "./hooks/useNavigation";
import { AboutSection } from "./components/sections/AboutSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { InfrastructureSection } from "./components/sections/InfrastructureSection";
import { ContactSection } from "./components/sections/ContactSection";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentSection } = useNavigation();

  // Render the appropriate section
  const renderSection = () => {
    switch (currentSection) {
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "infrastructure":
        return <InfrastructureSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <Box minH="100vh">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Drawer */}
      <MobileSidebar isOpen={isOpen} onClose={onClose} />

      {/* Main Content Area */}
      <Box ml={{ base: 0, md: "280px" }}>
        {/* Header */}
        <Header onMenuOpen={onOpen} />

        {/* Content */}
        <Box mt="60px" minH="calc(100vh - 60px)">
          <Container maxW="container.xl" py={8}>
            <Box
              animation="fadeIn 0.3s ease-in"
              sx={{
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(10px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              {renderSection()}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
