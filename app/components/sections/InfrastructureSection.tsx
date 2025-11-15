"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export function InfrastructureSection() {
  return (
    <VStack align="stretch" spacing={8} maxW="800px">
      <Box>
        <Heading as="h1" size="2xl" mb={2}>
          Infrastructure
        </Heading>
        <Text fontSize="lg" color="gray.500">
          Behind the scenes of this portfolio
        </Text>
      </Box>

      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        minH="200px"
        borderRadius="lg"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Infrastructure Documentation Coming Soon!
        </AlertTitle>
        <AlertDescription maxW="sm">
          This section will showcase the Kubernetes, ArgoCD, and Airflow setup
          that powers the automation behind this site.
        </AlertDescription>
      </Alert>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Planned Architecture
        </Heading>
        <VStack spacing={3} align="stretch">
          <Text>
            <strong>Kubernetes Cluster</strong> - Running on jeeninbee Ubuntu
            server
          </Text>
          <Text>
            <strong>ArgoCD</strong> - GitOps continuous delivery
          </Text>
          <Text>
            <strong>Apache Airflow</strong> - Automated documentation generation
          </Text>
          <Text>
            <strong>Vercel</strong> - Static site deployment
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}
