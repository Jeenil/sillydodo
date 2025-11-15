import { ColorModeScript } from "@chakra-ui/react";
import { config } from "./theme-config";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* ColorModeScript is correctly placed here */}
        <ColorModeScript initialColorMode={config.initialColorMode} />

        {/* Providers wrap the content */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
