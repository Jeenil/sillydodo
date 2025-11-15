"use client";

import {
  Box,
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

          <Box
            p={3}
            bg="yellow.50"
            _dark={{ bg: "yellow.900" }}
            borderRadius="md"
            borderLeft="4px"
            borderColor="yellow.400"
          >
            <Text
              fontSize="sm"
              color="yellow.800"
              _dark={{ color: "yellow.200" }}
            >
              <strong>Documentation coming soon!</strong> Auto-generated docs
              from PowerShell and Bash configs will be displayed here.
            </Text>
          </Box>
        </Box>

        {/* Placeholder for future projects */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          opacity={0.6}
        >
          <Heading as="h3" size="md" mb={4} fontFamily="mono">
            More Projects
          </Heading>
          <Text color="gray.600" _dark={{ color: "gray.400" }}>
            Additional projects will be added here as I build them. Stay tuned!
          </Text>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
