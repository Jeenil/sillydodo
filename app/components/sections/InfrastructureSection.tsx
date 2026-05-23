"use client";

import {
  Box,
  Code,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  Flex,
  Link,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MermaidDiagram } from "../MermaidDiagram";

const deployDiagram = `
flowchart LR
    DEV([Developer]) -->|git push| GH[GitHub]
    GH -->|auto-deploy| VCL[Vercel CDN]
    VCL --> SITE([sillydodo.net])
    USERS([Users]) --> VCL
`.trim();

const iacDiagram = `
flowchart LR
    TF[terraform-azuread-identity-governance] -->|plan and apply| AAD[Azure AD]
    AAD -->|manages| APKG[Entitlement Catalogs and Access Packages]
`.trim();

export function InfrastructureSection() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const diagramBg = useColorModeValue("gray.50", "gray.900");

  return (
    <VStack align="stretch" spacing={10} maxW="900px">

      {/* Header */}
      <Box>
        <Heading as="h1" size="2xl" mb={2}>
          Infrastructure
        </Heading>
        <Text fontSize="lg" color="gray.500">
          What&apos;s actually running behind this site.
        </Text>
      </Box>

      {/* Deployment */}
      <Box>
        <Flex align="center" gap={3} mb={4}>
          <Heading as="h2" size="lg">Deployment</Heading>
          <Badge colorScheme="green" fontSize="sm" px={2} py={1}>Live</Badge>
        </Flex>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Vercel watches the <Code fontSize="sm">main</Code> branch -every push auto-deploys the site with zero config.
        </Text>
        <Box bg={diagramBg} border="1px" borderColor={borderColor} borderRadius="lg" p={6}>
          <MermaidDiagram chart={deployDiagram} />
        </Box>
      </Box>

      {/* Infrastructure as Code */}
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Infrastructure as Code
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Terraform modules for declarative Azure AD Entitlement Management and identity governance.
        </Text>

        <Box bg={diagramBg} border="1px" borderColor={borderColor} borderRadius="lg" p={6} mb={6}>
          <MermaidDiagram chart={iacDiagram} />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {/* terraform-azuread-identity-governance */}
          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor={borderColor}>
            <Flex justify="space-between" align="start" mb={4}>
              <Link
                href="https://registry.terraform.io/modules/Jeenil/identity-governance/azuread/latest"
                isExternal
                _hover={{ color: "brand.500", textDecoration: "none" }}
              >
                <Heading as="h3" size="md" fontFamily="mono">
                  terraform-azuread-identity-governance
                </Heading>
              </Link>
              <Link
                href="https://registry.terraform.io/modules/Jeenil/identity-governance/azuread/latest"
                isExternal
                color="brand.500"
                ml={3}
                flexShrink={0}
              >
                <ExternalLinkIcon boxSize={5} />
              </Link>
            </Flex>

            <Text mb={4} color="gray.600" _dark={{ color: "gray.400" }}>
              Terraform module for Azure AD Entitlement Management -a superset
              of the fortytwoservices upstream module. Fixes catalog resource
              deduplication when Member and Owner packages share resources,
              adds group and Teams display name resolution, SharePoint path
              suffix support, and structured OData filter assembly for
              auto-assignment policies.
            </Text>

            <Flex gap={2} flexWrap="wrap" mb={4}>
              <Badge colorScheme="purple">Terraform</Badge>
              <Badge colorScheme="blue">Azure AD</Badge>
              <Badge colorScheme="cyan">Entitlement Management</Badge>
              <Badge colorScheme="orange">IaC</Badge>
            </Flex>

            <HStack spacing={3} flexWrap="wrap">
              <Button
                as={Link}
                href="https://registry.terraform.io/modules/Jeenil/identity-governance/azuread/latest"
                isExternal
                size="sm"
                variant="solid"
                colorScheme="purple"
                rightIcon={<ExternalLinkIcon />}
                _hover={{ textDecoration: "none" }}
              >
                Terraform Registry
              </Button>
              <Button
                as={Link}
                href="https://registry.terraform.io/modules/Jeenil/identity-governance/azuread/latest#why-not-use-fortytwoservicesterraform-azuread-entitlement-management"
                isExternal
                size="sm"
                variant="ghost"
                rightIcon={<ExternalLinkIcon />}
                _hover={{ textDecoration: "none" }}
              >
                Why this exists
              </Button>
              <Button
                as={Link}
                href="https://github.com/Jeenil/terraform-azuread-identity-governance#readme"
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

          {/* entra-vacuum */}
          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor={borderColor}>
            <Flex justify="space-between" align="start" mb={4}>
              <Link
                href="https://www.powershellgallery.com/packages/EntraVacuum"
                isExternal
                _hover={{ color: "brand.500", textDecoration: "none" }}
              >
                <Heading as="h3" size="md" fontFamily="mono">
                  entra-vacuum
                </Heading>
              </Link>
              <Link
                href="https://www.powershellgallery.com/packages/EntraVacuum"
                isExternal
                color="brand.500"
                ml={3}
                flexShrink={0}
              >
                <ExternalLinkIcon boxSize={5} />
              </Link>
            </Flex>

            <Text mb={4} color="gray.600" _dark={{ color: "gray.400" }}>
              PowerShell module for Entra ID desired-state management. Reconciles
              access package assignments against policy filters faster than the
              built-in 24-hour cycle.
            </Text>

            <Flex gap={2} flexWrap="wrap" mb={4}>
              <Badge colorScheme="blue">PowerShell</Badge>
              <Badge colorScheme="purple">Entra ID</Badge>
              <Badge colorScheme="cyan">Microsoft Graph</Badge>
              <Badge colorScheme="orange">GitHub Actions</Badge>
            </Flex>

            <HStack spacing={3} flexWrap="wrap">
              <Button
                as={Link}
                href="https://www.powershellgallery.com/packages/EntraVacuum"
                isExternal
                size="sm"
                variant="solid"
                colorScheme="blue"
                rightIcon={<ExternalLinkIcon />}
                _hover={{ textDecoration: "none" }}
              >
                PSGallery
              </Button>
              <Button
                as={Link}
                href="https://github.com/Jeenil/entra-vacuum#readme"
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
        </SimpleGrid>
      </Box>

    </VStack>
  );
}
