"use client";

import { Box, HStack, Image, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { tech, type Tech, type TechKey } from "../data/tech";

// A tech chip in the tech's brand color that links to its official docs
export function TechBadge({ id }: { id: TechKey }) {
  const t: Tech = tech[id];
  const bg = useColorModeValue("white", "whiteAlpha.100");

  return (
    <Link
      href={t.docsUrl}
      isExternal
      title={`${t.label} docs`}
      _hover={{ textDecoration: "none", transform: "translateY(-1px)" }}
      transition="transform 0.15s"
    >
      <HStack
        spacing={1.5}
        px={2}
        py={0.5}
        borderRadius="full"
        border="1px"
        borderColor={t.color}
        bg={bg}
      >
        {t.logo ? (
          <Image src={t.logo} alt="" boxSize="14px" />
        ) : (
          <Box boxSize="8px" borderRadius="full" bg={t.color} />
        )}
        <Text fontSize="xs" fontWeight="semibold">
          {t.label}
        </Text>
      </HStack>
    </Link>
  );
}
