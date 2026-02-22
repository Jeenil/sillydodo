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
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export function ProjectsSection() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.750");

  return (
    <VStack align="stretch" spacing={8} maxW="1200px">
      <Box>
        <Heading as="h1" size="2xl" mb={2}>
          Projects
        </Heading>
        <Text fontSize="lg" color="gray.500">
          A collection of things I've built and am learning
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* local-configs Project */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          _hover={{
            bg: hoverBg,
            transform: "translateY(-4px)",
            shadow: "lg",
          }}
          transition="all 0.2s"
        >
          <Flex justify="space-between" align="start" mb={4}>
            <Heading as="h3" size="md" fontFamily="mono">
              local-configs
            </Heading>
            <Link
              href="https://github.com/Jeenil/local-configs"
              isExternal
              color="brand.500"
            >
              <ExternalLinkIcon boxSize={6} />
            </Link>
          </Flex>

          <Text mb={4} color="gray.600" _dark={{ color: "gray.400" }}>
            Cross-platform shell configurations for PowerShell and Bash with Git
            workflow automation, aliases, and productivity enhancements.
          </Text>

          <Flex gap={2} flexWrap="wrap" mb={4}>
            <Badge colorScheme="blue">PowerShell</Badge>
            <Badge colorScheme="green">Bash</Badge>
            <Badge colorScheme="purple">Git</Badge>
            <Badge colorScheme="orange">Automation</Badge>
          </Flex>

          <Button
            as={Link}
            href="https://github.com/Jeenil/local-configs#readme"
            isExternal
            size="sm"
            variant="outline"
            rightIcon={<ExternalLinkIcon />}
            _hover={{ textDecoration: "none" }}
          >
            View Docs on GitHub
          </Button>
        </Box>

        {/* discogs-state-mgmt Project */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          _hover={{
            bg: hoverBg,
            transform: "translateY(-4px)",
            shadow: "lg",
          }}
          transition="all 0.2s"
        >
          <Flex justify="space-between" align="start" mb={4}>
            <Heading as="h3" size="md" fontFamily="mono">
              discogs-state-mgmt
            </Heading>
            <Link
              href="https://github.com/Jeenil/discogs-state-mgmt"
              isExternal
              color="brand.500"
            >
              <ExternalLinkIcon boxSize={6} />
            </Link>
          </Flex>

          <Text mb={4} color="gray.600" _dark={{ color: "gray.400" }}>
            Declarative, Git-based workflow for managing a Discogs record
            collection. Update a JSON file. Will be adding in more features and
            CICD runs. Also my Love for music section soon!
          </Text>
          <Button
            as={Link}
            href="https://github.com/Jeenil/discogs-state-mgmt#readme"
            isExternal
            size="sm"
            variant="outline"
            rightIcon={<ExternalLinkIcon />}
            _hover={{ textDecoration: "none" }}
            mb={4}
          >
            View Docs on GitHub
          </Button>

          <Flex gap={2} flexWrap="wrap">
            <Badge colorScheme="blue">PowerShell</Badge>
            <Badge colorScheme="purple">GitHub Actions</Badge>
            <Badge colorScheme="cyan">Declarative State</Badge>
            <Badge colorScheme="pink">Discogs API</Badge>
          </Flex>
        </Box>

        {/* casio-lk-keyboard-learning-guide Project */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          _hover={{
            bg: hoverBg,
            transform: "translateY(-4px)",
            shadow: "lg",
          }}
          transition="all 0.2s"
        >
          <Flex justify="space-between" align="start" mb={4}>
            <Heading as="h3" size="md" fontFamily="mono">
              casio-lk-keyboard-learning-guide
            </Heading>
            <Link
              href="https://github.com/Jeenil/casio-lk-keyboard-learning-guide"
              isExternal
              color="brand.500"
            >
              <ExternalLinkIcon boxSize={6} />
            </Link>
          </Flex>

          <Text mb={4} color="gray.600" _dark={{ color: "gray.400" }}>
            I&apos;ve been trying to learn more music as it&apos;s such a big
            part of my life — trying to grow wings and fly!
          </Text>
          <Button
            as={Link}
            href="https://github.com/Jeenil/casio-lk-keyboard-learning-guide#readme"
            isExternal
            size="sm"
            variant="outline"
            rightIcon={<ExternalLinkIcon />}
            _hover={{ textDecoration: "none" }}
          >
            View Docs on GitHub
          </Button>

          <Flex gap={2} flexWrap="wrap">
            <Badge colorScheme="green">Markdown</Badge>
            <Badge colorScheme="pink">Music</Badge>
            <Badge colorScheme="orange">Documentation</Badge>
          </Flex>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
