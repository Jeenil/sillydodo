"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Code,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * Home page component
 * Displays a welcome section and About section with improved dark mode styling
 */
export default function Home() {
  // Dynamic colors based on color mode
  const codeBg = useColorModeValue("gray.100", "gray.700");

  return (
    // Main container with padding and centered content
    <Container maxW="container.lg" py={20}>
      {/* VStack: Vertical stack of components with spacing */}
      <VStack spacing={8} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to sillydodo.net
          </Heading>
          <Text fontSize="xl" color="gray.500">
            Personal portfolio and project showcase by Jeenil Patel
          </Text>
        </Box>

        <Divider />

        {/* About Section */}
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            About Me
          </Heading>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg">Hi! I'm Jeenil, and I like learning!</Text>
            <Text fontSize="lg">
              I work with Infrastructure as Code using{" "}
              <Code bg={codeBg}>PowerShell</Code>,{" "}
              <Code bg={codeBg}>Terraform</Code>, and{" "}
              <Code bg={codeBg}>Ansible</Code>, managing cloud infrastructure
              and Kubernetes deployments.
            </Text>
            <Text fontSize="lg">
              This site is my learning playground where I document my journey
              with modern web technologies like <Code bg={codeBg}>Next.js</Code>
              , <Code bg={codeBg}>TypeScript</Code>, and DevOps best practices.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
