"use client";

import {
  Badge,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { roles, workProjects, type WorkProject } from "../../data/projects";
import { MermaidDiagram } from "../MermaidDiagram";
import { TechBadge } from "../TechBadge";

function WorkCard({ name, summary, metric, status, details, lesson, diagram, tech }: WorkProject) {
  const { isOpen, onToggle } = useDisclosure();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const diagramBg = useColorModeValue("gray.50", "gray.900");
  const hasMore = Boolean(details?.length || lesson || diagram);

  return (
    <Flex
      direction="column"
      bg={cardBg}
      p={5}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
    >
      {metric && (
        <Box mb={3}>
          <Text fontSize="3xl" fontWeight="bold" lineHeight="1.1">
            {metric.value}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {metric.label}
          </Text>
        </Box>
      )}

      <Flex align="center" gap={2} mb={1} flexWrap="wrap">
        <Heading as="h3" size="sm">
          {name}
        </Heading>
        {status && <Badge colorScheme="brand">{status}</Badge>}
      </Flex>
      <Text color="gray.600" _dark={{ color: "gray.400" }} mb={3}>
        {summary}
      </Text>

      <Flex gap={2} flexWrap="wrap" mt="auto">
        {tech?.map((t) => (
          <TechBadge key={t} id={t} />
        ))}
      </Flex>

      {hasMore && (
        <>
          <Collapse in={isOpen} animateOpacity>
            <VStack align="stretch" spacing={3} pt={4}>
              {details && (
                <Box as="ul" pl={5} fontSize="sm">
                  {details.map((d) => (
                    <Box as="li" key={d} mb={1}>
                      {d}
                    </Box>
                  ))}
                </Box>
              )}
              {/* Mermaid sizes diagrams from the visible container, so only render when open */}
              {diagram && isOpen && (
                <Box bg={diagramBg} border="1px" borderColor={borderColor} borderRadius="md" p={4}>
                  <MermaidDiagram chart={diagram.trim()} />
                </Box>
              )}
              {lesson && (
                <Text fontSize="sm" color="gray.500">
                  <strong>Next time:</strong> {lesson}
                </Text>
              )}
            </VStack>
          </Collapse>
          <Button
            size="xs"
            variant="ghost"
            alignSelf="start"
            mt={3}
            ml={-2}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={onToggle}
          >
            {isOpen ? "Less" : "More"}
          </Button>
        </>
      )}
    </Flex>
  );
}

export function WorkSection() {
  return (
    <VStack align="stretch" spacing={10} maxW="1100px">
      <Box>
        <Heading as="h1" size="2xl" mb={2}>
          Work
        </Heading>
        <Text fontSize="lg" color="gray.500">
          What I&apos;ve built and led, newest role first. Open a card for the details.
        </Text>
      </Box>

      {roles.map((role) => (
        <Box key={role.id}>
          <Flex align="baseline" gap={3} mb={4} flexWrap="wrap">
            <Heading as="h2" size="md">
              {role.title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {role.dates}
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} alignItems="start">
            {workProjects
              .filter((p) => p.role === role.id)
              .map((p) => (
                <WorkCard key={p.name} {...p} />
              ))}
          </SimpleGrid>
        </Box>
      ))}
    </VStack>
  );
}
