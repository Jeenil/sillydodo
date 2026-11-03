"use client";

import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { accents, applyAccent, DEFAULT_ACCENT, loadAccent, saveAccent } from "../theme/accents";

// Header button that lets visitors pick the site's accent color
export function AccentPicker() {
  const [current, setCurrent] = useState(DEFAULT_ACCENT);

  // Apply the saved pick after mount, so server and client HTML match
  useEffect(() => {
    const saved = loadAccent();
    setCurrent(saved);
    applyAccent(saved);
  }, []);

  const pick = (id: string) => {
    setCurrent(id);
    applyAccent(id);
    saveAccent(id);
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Pick accent color"
          variant="ghost"
          icon={<Box boxSize="18px" borderRadius="full" bg="brand.500" border="2px solid" borderColor="whiteAlpha.700" />}
        />
      </PopoverTrigger>
      <PopoverContent w="auto">
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize="xs" color="gray.500" mb={2}>
            Pick a color
          </Text>
          <SimpleGrid columns={5} spacing={2}>
            {accents.map((a) => (
              <Tooltip key={a.id} label={a.label} openDelay={300}>
                <Box
                  as="button"
                  aria-label={a.label}
                  aria-pressed={current === a.id}
                  boxSize="28px"
                  borderRadius="full"
                  bg={a.shades[500]}
                  border="3px solid"
                  borderColor={current === a.id ? "gray.400" : "transparent"}
                  _hover={{ transform: "scale(1.1)" }}
                  transition="transform 0.15s"
                  onClick={() => pick(a.id)}
                />
              </Tooltip>
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
