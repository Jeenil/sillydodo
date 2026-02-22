"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Link,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon, EmailIcon } from "@chakra-ui/icons";

interface ContactLinkProps {
  emoji: string;
  label: string;
  value: string;
  href: string;
}

function ContactLink({ emoji, label, value, href }: ContactLinkProps) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.750");

  return (
    <Link
      href={href}
      isExternal
      _hover={{ textDecoration: "none" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Flex
        bg={cardBg}
        p={6}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        align="center"
        gap={4}
        _hover={{
          bg: hoverBg,
          transform: "translateY(-4px)",
          shadow: "lg",
        }}
        transition="all 0.2s"
      >
        <Text fontSize="3xl">{emoji}</Text>
        <Box flex={1}>
          <Text fontSize="sm" color="gray.500">
            {label}
          </Text>
          <Text fontSize="lg" fontWeight="semibold">
            {value}
          </Text>
        </Box>
        <ExternalLinkIcon color="gray.500" />
      </Flex>
    </Link>
  );
}

export function ContactSection() {
  return (
    <VStack align="stretch" spacing={8} maxW="800px">
      <Box>
        <Heading as="h1" size="2xl" mb={2}>
          Get In Touch
        </Heading>
        <Text fontSize="lg" color="gray.500">
          Feel free to reach out for collaborations or just to say hi!
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <ContactLink
          emoji="🐙"
          label="GitHub"
          value="@Jeenil"
          href="https://github.com/Jeenil"
        />
        <ContactLink
          emoji="💼"
          label="LinkedIn"
          value="Jeenil Patel"
          href="https://www.linkedin.com/in/jeenil-patel"
        />
        <ContactLink
          emoji="📧"
          label="Email"
          value="jeenilrpatel@gmail.com"
          href="mailto:jeenilrpatel@gmail.com"
        />
      </SimpleGrid>

      <Box
        p={4}
        bg="blue.50"
        _dark={{ bg: "blue.900" }}
        borderRadius="md"
        borderLeft="4px"
        borderColor="blue.400"
      >
        <Text fontSize="sm" color="blue.800" _dark={{ color: "blue.200" }}>
          <strong>Logging and Notifications coming soon!</strong> I'll be using
          one of the plethora (That's a big word for Elmo!) of open-source
          options from{" "}
          <Link
            href="https://landscape.cncf.io/"
            isExternal
            textDecoration="underline"
            fontWeight="bold"
          >
            here
          </Link>
          .
        </Text>
      </Box>
    </VStack>
  );
}
