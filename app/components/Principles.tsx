"use client";

import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { engineeringPrinciples, operationsPrinciples, securityPrinciples, type Principle } from "../data/principles";

function PrincipleGroup({ title, items }: { title: string; items: Principle[] }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      <Text fontSize="sm" fontWeight="semibold" color="gray.500" textTransform="uppercase" mb={3}>
        {title}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={3}>
        {items.map((p) => (
          <Box
            key={p.name}
            bg={cardBg}
            p={4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
            borderLeft="4px solid"
            borderLeftColor="brand.500"
          >
            <Text fontWeight="bold" mb={1}>
              {p.name}
            </Text>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mb={2}>
              {p.why}
            </Text>
            <Link href={p.url} isExternal fontSize="xs" color="brand.600" _dark={{ color: "brand.300" }}>
              {p.source} <ExternalLinkIcon mx={0.5} />
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export function Principles() {
  return (
    <Box>
      <Heading as="h2" size="md" mb={1}>
        How I work
      </Heading>
      <Text mb={2}>
        I learned all of these from my current team and mentors. They taught me by example,
        through code reviews, design discussions and a lot of patience.
      </Text>
      <Text fontSize="sm" color="gray.500" mb={4}>
        Secure by default, kept as simple as the job allows.
      </Text>
      <VStack align="stretch" spacing={6}>
        <PrincipleGroup title="Security" items={securityPrinciples} />
        <PrincipleGroup title="Engineering" items={engineeringPrinciples} />
        <PrincipleGroup title="Operations" items={operationsPrinciples} />
      </VStack>
    </Box>
  );
}
