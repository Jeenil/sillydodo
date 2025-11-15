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
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
