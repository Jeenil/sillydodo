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
  Image,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { repos, type Repo } from "../../data/projects";
import { tech as techInfo, type Tech } from "../../data/tech";
import { TechBadge } from "../TechBadge";

function ProjectCard({ name, repoUrl, description, tech, tags, registryUrl, registryLabel, registryColor = "blue", extraLink, upstream }: Repo) {
  const first = tech[0];
  const primary: Tech | undefined = first ? techInfo[first] : undefined;
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
      borderTop="4px solid"
      borderTopColor={primary?.color ?? "brand.500"}
      _hover={{ bg: hoverBg, transform: "translateY(-4px)", shadow: "lg" }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="start" mb={4}>
        <HStack spacing={3} align="center" minW={0}>
          {primary?.logo && <Image src={primary.logo} alt={primary.label} boxSize="28px" flexShrink={0} />}
          <Link
            href={repoUrl}
            isExternal
            _hover={{ color: "brand.500", textDecoration: "none" }}
            minW={0}
          >
            <Heading as="h3" size="md" fontFamily="mono" wordBreak="break-word">
              {name}
            </Heading>
          </Link>
        </HStack>
        <Link href={repoUrl} isExternal color="brand.500" ml={3} flexShrink={0}>
          <ExternalLinkIcon boxSize={5} />
        </Link>
      </Flex>

      <Text mb={4} color="gray.600" _dark={{ color: "gray.400" }}>
        {description}
      </Text>

      {upstream && (
        <Box mb={4}>
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Upstream contributions
          </Text>
          <VStack align="stretch" spacing={1}>
            {upstream.map((u) => (
              <HStack key={u.url} spacing={2} align="start">
                <Badge colorScheme={u.merged ? "lizard" : "brand"} flexShrink={0} mt={0.5}>
                  {u.merged ? "Merged" : "In review"}
                </Badge>
                <Link href={u.url} isExternal fontSize="sm">
                  {u.label} <ExternalLinkIcon mx={0.5} />
                </Link>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      <Flex gap={2} flexWrap="wrap" mb={4}>
        {tech.map((t) => (
          <TechBadge key={t} id={t} />
        ))}
        {tags?.map((t) => (
          <Badge key={t} alignSelf="center" variant="subtle">{t}</Badge>
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
        {extraLink && (
          <Button
            as={Link}
            href={extraLink.url}
            isExternal
            size="sm"
            variant="ghost"
            rightIcon={<ExternalLinkIcon />}
            _hover={{ textDecoration: "none" }}
          >
            {extraLink.label}
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


export function OpenSourceSection() {
  const published = repos.filter((r) => r.published);
  const sideProjects = repos.filter((r) => !r.published);

  return (
    <VStack align="stretch" spacing={10} maxW="1200px">
      <Box>
        <Heading as="h1" size="2xl" mb={2}>
          Open Source
        </Heading>
        <Text fontSize="lg" color="gray.500">
          Modules I publish and maintain, plus side projects
        </Text>
      </Box>

      <Box>
        <Heading as="h2" size="md" mb={4}>
          Published modules
        </Heading>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {published.map((r) => (
            <ProjectCard key={r.name} {...r} />
          ))}
        </SimpleGrid>
      </Box>

      <Box>
        <Heading as="h2" size="md" mb={4}>
          Side projects
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
          {sideProjects.map((r) => (
            <ProjectCard key={r.name} {...r} />
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
