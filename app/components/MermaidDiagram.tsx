"use client";

import { Box, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({
  chart,
}: MermaidDiagramProps): React.JSX.Element {
  const { colorMode } = useColorMode();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(false);

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: colorMode === "dark" ? "dark" : "default",
        });
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const rendered = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(rendered.svg);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      }
    }

    render().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [chart, colorMode]);

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.400" fontSize="sm">
          Diagram failed to render.
        </Text>
      </Box>
    );
  }

  // Suppress hydration warning: svg is always empty on the server and filled client-side after
  // mermaid renders -the mismatch is intentional.
  return (
    <Box
      suppressHydrationWarning
      minH="100px"
      dangerouslySetInnerHTML={{ __html: svg }}
      sx={{ "& svg": { maxWidth: "100%", height: "auto" } }}
      overflowX="auto"
    />
  );
}
