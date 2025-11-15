"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Code,
  useColorModeValue,
} from "@chakra-ui/react";

export function AboutSection() {
  const codeBg = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack align="stretch" spacing={8} maxW="800px">
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Hi! I'm Jeenil 👋
        </Heading>
        <Text fontSize="xl" color="gray.500">
          Current working as an Associate Systems Engineer
        </Text>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          About Me
        </Heading>
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg">
            I work with Infrastructure as Code using managing On-Prem Systems
            and also Hybrid cloud infrastructure.
          </Text>
          <Text fontSize="lg">
            This site is my learning playground where I document my journey with
            modern web technologies sprinkled through out my different projects
            I enjoy learning and applying DevOps best practices in personal life
            as well!
          </Text>
        </VStack>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Currently Learning
        </Heading>
        <VStack spacing={3} align="stretch">
          <Text>
            <strong>Having a proper plan is important. </strong> - More Reading!
            workflows
          </Text>
          <Text>
            <strong>Kubernetes & ArgoCD</strong> - GitOps workflows
          </Text>
          <Text>
            <strong>Apache Airflow</strong> - Workflow automation
          </Text>
          <Text>
            <strong>Setting up this custom playground</strong> - Market analysis
          </Text>
          <Text>
            <strong>Next.js App Router</strong> - Modern React framework
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}
