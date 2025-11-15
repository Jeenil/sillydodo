'use client';

import {
  Flex,
  IconButton,
  useColorModeValue,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

interface HeaderProps {
  onMenuOpen: () => void;
}

export function Header({ onMenuOpen }: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={{ base: 0, md: '280px' }}
      right={0}
      h="60px"
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      align="center"
      px={4}
      zIndex={10}
    >
      {/* Mobile menu button */}
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        display={{ base: 'flex', md: 'none' }}
        onClick={onMenuOpen}
        mr={3}
      />

      {/* Title (only on mobile) */}
      <Heading
        size="sm"
        fontFamily="mono"
        flex={1}
        display={{ base: 'block', md: 'none' }}
      >
        sillydodo.net
      </Heading>

      {/* Spacer for desktop */}
      <Flex flex={1} display={{ base: 'none', md: 'flex' }} />

      {/* Color mode toggle */}
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  );
}
