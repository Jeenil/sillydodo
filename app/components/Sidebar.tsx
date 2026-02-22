'use client';

import {
  Box,
  VStack,
  Text,
  Flex,
  Heading,
  Divider,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useNavigation } from '../hooks/useNavigation';

type SectionId = 'about' | 'projects' | 'infrastructure' | 'contact' | 'quiz';

interface NavItem {
  id: SectionId;
  label: string;
  emoji: string;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', emoji: '👤' },
  { id: 'projects', label: 'Projects', emoji: '📁' },
  { id: 'infrastructure', label: 'Infrastructure', emoji: '⚙️' },
  { id: 'contact', label: 'Contact', emoji: '📧' },
  { id: 'quiz', label: 'Gizz Quiz', emoji: '🎸' },
];

function SidebarContent() {
  const { currentSection, setCurrentSection } = useNavigation();
  const activeBg = useColorModeValue('brand.500', 'brand.500');
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <VStack align="stretch" spacing={1} h="full">
      {/* Header */}
      <Box p={6} borderBottom="1px" borderColor={borderColor}>
        <Heading size="md" fontFamily="mono">
          sillydodo.net
        </Heading>
        <Text fontSize="sm" color="gray.500" mt={1}>
          Jeenil Patel
        </Text>
      </Box>

      {/* Navigation */}
      <VStack align="stretch" spacing={2} p={4} flex={1}>
        {navItems.map((item) => {
          const isActive = currentSection === item.id;

          return (
            <Flex
              key={item.id}
              as="button"
              align="center"
              p={3}
              borderRadius="md"
              bg={isActive ? activeBg : 'transparent'}
              color={isActive ? 'gray.900' : 'inherit'}
              _hover={{
                bg: isActive ? activeBg : hoverBg,
                transform: 'translateX(4px)',
              }}
              transition="all 0.2s"
              cursor="pointer"
              onClick={() => setCurrentSection(item.id)}
            >
              <Text mr={3} fontSize="xl">{item.emoji}</Text>
              <Text fontWeight={isActive ? 'semibold' : 'normal'}>
                {item.label}
              </Text>
              {item.id === 'infrastructure' && (
                <Text ml="auto" fontSize="xs" color="gray.500">
                  soon
                </Text>
              )}
            </Flex>
          );
        })}
      </VStack>

      {/* Footer */}
      <Box p={4} borderTop="1px" borderColor={borderColor}>
        <Text fontSize="xs" color="gray.500" fontFamily="mono">
          Built with Next.js
        </Text>
      </Box>
    </VStack>
  );
}

// Desktop Sidebar
export function DesktopSidebar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="nav"
      w="280px"
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      overflowY="auto"
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent />
    </Box>
  );
}

// Mobile Drawer
interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody p={0}>
          <SidebarContent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
