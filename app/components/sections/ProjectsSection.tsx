"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  Link,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface ProjectCardProps {
  name: string;
  repoUrl: string;
  description: string;
  badges: { label: string; color: string }[];
  registryUrl?: string;
  registryLabel?: string;
  registryColor?: string;
}

function ProjectCard({ name, repoUrl, description, badges, registryUrl, registryLabel, registryColor = "blue" }: ProjectCardProps) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.750");

  return (
    <Box
      bg={cardBg}
      p={6}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{ bg: hoverBg, transform: "translateY(-4px)", shadow: "lg" }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="start" mb={4}>
        <Link
          href={repoUrl}
          isExternal
          _hover={{ color: "brand.500", textDecoration: "none" }}
        >
          <Heading as="h3" size="md" fontFamily="mono">
            {name}
          </Heading>
        </Link>
        <Link href={repoUrl} isExternal color="brand.500" ml={3} flexShrink={0}>
          <ExternalLinkIcon boxSize={5} />
        </Link>
      </Flex>

      <Text mb={4} color="gray.600" _dark={{ color: "gray.400" }}>
        {description}
      </Text>

      <Flex gap={2} flexWrap="wrap" mb={4}>
        {badges.map((b) => (
          <Badge key={b.label} colorScheme={b.color}>{b.label}</Badge>
        ))}
      </Flex>

      <HStack spacing={3} flexWrap="wrap">
        {registryUrl && (
          <Button
            as={Link}
            href={registryUrl}
            isExternal
            size="sm"
            variant="solid"
            colorScheme={registryColor}
            rightIcon={<ExternalLinkIcon />}
            _hover={{ textDecoration: "none" }}
          >
            {registryLabel ?? "Registry"}
          </Button>
        )}
        <Button
          as={Link}
          href={`${repoUrl}#readme`}
          isExternal
          size="sm"
          variant="outline"
          rightIcon={<ExternalLinkIcon />}
          _hover={{ textDecoration: "none" }}
        >
          View on GitHub
        </Button>
      </HStack>
    </Box>
  );
}

const projects: ProjectCardProps[] = [
  {
    name: "local-configs",
    repoUrl: "https://github.com/Jeenil/local-configs",
    description:
      "Cross-platform shell configurations for PowerShell and Bash with Git workflow automation, aliases, and productivity enhancements.",
    badges: [
      { label: "PowerShell", color: "blue" },
      { label: "Bash", color: "green" },
      { label: "Git", color: "purple" },
      { label: "Automation", color: "orange" },
    ],
  },
  {
    name: "discogs-state-mgmt",
    repoUrl: "https://github.com/Jeenil/discogs-state-mgmt",
    description:
      "Declarative, Git-based workflow for managing a Discogs record collection. Update a JSON file. Will be adding in more features and CI/CD runs. Also my love for music section soon!",
    badges: [
      { label: "PowerShell", color: "blue" },
      { label: "GitHub Actions", color: "purple" },
      { label: "Declarative State", color: "cyan" },
      { label: "Discogs API", color: "pink" },
    ],
  },
  {
    name: "configs",
    repoUrl: "https://github.com/Jeenil/configs",
    description:
      "General configuration files and dotfiles for tools, editors, and development environments across machines.",
    badges: [
      { label: "PowerShell", color: "blue" },
      { label: "Bash", color: "green" },
      { label: "Dotfiles", color: "purple" },
      { label: "Git", color: "orange" },
    ],
  },
  {
    name: "casio-lk-keyboard-learning-guide",
    repoUrl: "https://github.com/Jeenil/casio-lk-keyboard-learning-guide",
    description:
      "I've been trying to learn more music as it's such a big part of my life -trying to grow wings and fly!",
    badges: [
      { label: "Markdown", color: "green" },
      { label: "Music", color: "pink" },
      { label: "Documentation", color: "orange" },
    ],
  },
];

export function ProjectsSection() {
  return (
    <VStack align="stretch" spacing={8} maxW="1200px">
      <Box>
        <Heading as="h1" size="2xl" mb={2}>
          Projects
        </Heading>
        <Text fontSize="lg" color="gray.500">
          A collection of things I&apos;ve built and am learning
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
