import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
} from "@chakra-ui/react";

/**
 * Home page component
 * Displays a welcome section and About section
 */
export default function Home() {
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
          <Text fontSize="xl" color="gray.600">
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
            <Text fontSize="lg">
              Hi! I'm Jeenil, a DevOps engineer and Senior Support Specialist at
              LogixHealth Inc.
            </Text>
            <Text fontSize="lg">
              I work with Infrastructure as Code using PowerShell, Terraform,
              and Ansible, managing cloud infrastructure and Kubernetes
              deployments.
            </Text>
            <Text fontSize="lg">
              This site is my learning playground where I document my journey
              with modern web technologies like Next.js, TypeScript, and DevOps
              best practices.
            </Text>
          </VStack>
        </Box>

        {/* Optional: Add buttons or links */}
        <HStack spacing={4} justify="center" pt={6}>
          <Button colorScheme="blue" size="lg">
            View Projects
          </Button>
          <Button variant="outline" size="lg">
            Contact Me
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
