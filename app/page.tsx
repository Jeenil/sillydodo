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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { ColorModeToggle } from "./components/ColorModeToggle";

export default function Home() {
  const codeBg = useColorModeValue("gray.100", "gray.700");

  return (
    // 2. ADD 'position="relative"' BACK
    <Container maxW="container.lg" py={20} position="relative">
      <ColorModeToggle /> {/* <-- 3. ADD COMPONENT BACK */}
      <Tabs isFitted variant="enclosed" size="lg">
        <TabList mb="1.5em">
          <Tab>About Me</Tab>
          <Tab>Projects</Tab>
        </TabList>

        <TabPanels>
          {/* Panel 1: About Me */}
          <TabPanel p={0}>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center" py={10}>
                <Heading as="h1" size="2xl" mb={4}>
                  Welcome to sillydodo.net
                </Heading>
                <Text fontSize="xl" color="gray.500">
                  Personal portfolio and project showcase by Jeenil Patel
                </Text>
              </Box>
              <Divider />
              <Box>
                <Heading as="h2" size="xl" mb={4}>
                  About Me
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Text fontSize="lg">
                    Hi! I'm Jeenil, and I like learning!
                  </Text>
                  <Text fontSize="lg">
                    I work with Infrastructure as Code using{" "}
                    <Code bg={codeBg}>PowerShell</Code>,{" "}
                    <Code bg={codeBg}>Terraform</Code>, and{" "}
                    <Code bg={codeBg}>Ansible</Code>, managing cloud
                    infrastructure and Kubernetes deployments.
                  </Text>
                  <Text fontSize="lg">
                    This site is my learning playground where I document my
                    journey with modern web technologies like{" "}
                    <Code bg={codeBg}>Next.js</Code>,{" "}
                    <Code bg={codeBg}>TypeScript</Code>, and DevOps best
                    practices.
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </TabPanel>

          {/* Panel 2: Projects */}
          <TabPanel>
            <VStack spacing={8} align="stretch">
              <Heading as="h2" size="xl" mb={4}>
                My Projects
              </Heading>
              <Text fontSize="lg">
                This is where I'll showcase my work with Kubernetes, PowerShell,
                and more.
              </Text>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
