"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

export function AboutSection() {

  return (
    <VStack align="stretch" spacing={8} maxW="800px">
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Hi! I'm Jeenil 👋
        </Heading>
        <Text fontSize="xl" color="gray.500">
          Currently working as an Associate Systems Engineer
        </Text>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          About Me
        </Heading>
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg">
            I currently work with Infrastructure as Code managing On-Prem
            Systems and also Hybrid cloud infrastructure.
          </Text>
          <Text fontSize="lg">
            This site is my learning playground where I document my journey with
            modern web technologies sprinkled throughout my different projects.
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
            <strong>SCIM Provisioning</strong> - Building centralised identity provisioning from Entra ID to SaaS apps
          </Text>
          <Text>
            <strong>Entra ID Directory Extensions</strong> - Custom tenant schema management via Terraform + azapi, JSON-driven attribute definitions
          </Text>
          <Text>
            <strong>GitHub Actions</strong> - CI/CD workflows
          </Text>
          <Text>
            <strong>Kubernetes & ArgoCD</strong> - GitOps workflows
          </Text>
          <Text>
            <strong>Apache Airflow</strong> - Workflow automation
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}
