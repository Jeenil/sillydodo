import { ColorModeScript } from "@chakra-ui/react";
import { config } from "./theme/config";
import { Providers } from "./components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* There should be NO text, comments, or blank lines
        between the <html> tag above and the <body> tag below.
      */}
      <body suppressHydrationWarning>
        {/* Script MUST be the first thing in <body> */}
        <ColorModeScript initialColorMode={config.initialColorMode} />

        {/* Providers wrapper is next */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
