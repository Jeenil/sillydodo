"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { lessonsLearned } from "../../data/projects";
import { useNavigation } from "../../hooks/useNavigation";

// Headline numbers, matching the resume
const stats = [
  { value: "3,650", label: "external users moved to Entra ID" },
  { value: "36 TB", label: "file shares and archive moved to Azure" },
  { value: "700+", label: "devices set up and secured with Intune" },
  { value: "22", label: "releases of my Terraform module" },
];

const learning = [
  "Azure storage",
  "Kubernetes",
  "Azure networking",
  "SFTP architecture, on-prem to cloud",
  "Entra ID directory extensions",
  "Logging and alerting",
];

export function AboutSection() {
  const { setCurrentSection } = useNavigation();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack align="stretch" spacing={10} maxW="900px">
      <Box pt={6}>
        <Heading as="h1" size="2xl" mb={4}>
          Hi! I&apos;m Jeenil 👋
        </Heading>
        <Text fontSize="xl" mb={2}>
          Associate Systems Engineer working on Entra ID identity governance and Azure
          infrastructure, built secure by default and kept simple.
        </Text>
        <Text fontSize="lg" color="gray.500">
          I started in IT support in 2021 and grew into engineering by automating the work I
          used to do by hand.
        </Text>
        <Flex gap={3} mt={6} flexWrap="wrap">
          <Button colorScheme="brand" color="gray.900" onClick={() => setCurrentSection("work")}>
            See my work
          </Button>
          <Button variant="outline" onClick={() => setCurrentSection("opensource")}>
            Open source
          </Button>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        {stats.map((s) => (
          <Box key={s.label} bg={cardBg} border="1px" borderColor={borderColor} borderRadius="lg" p={4}>
            <Text fontSize="2xl" fontWeight="bold" lineHeight="1.2">
              {s.value}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {s.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box>
        <Heading as="h2" size="md" mb={1}>
          Lessons from the swamp 🦎
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Picked up from my team and mentors, one code review at a time.
        </Text>
        <VStack align="stretch" spacing={2}>
          {lessonsLearned.map((l) => (
            <Text key={l} pl={4} borderLeft="3px solid" borderColor="brand.500">
              {l}
            </Text>
          ))}
        </VStack>
      </Box>

      <Box>
        <Heading as="h2" size="md" mb={4}>
          Getting better at
        </Heading>
        <Flex gap={2} flexWrap="wrap">
          {learning.map((l) => (
            <Badge key={l} variant="subtle" colorScheme="lizard" px={3} py={1} borderRadius="full" textTransform="none" fontSize="sm">
              {l}
            </Badge>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
}
