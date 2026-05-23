import { ColorModeScript } from "@chakra-ui/react";
import { config } from "./theme/config";
import { Providers } from "./components/Providers";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieHeader = (await headers()).get("cookie") ?? "";

  return (
    <html lang="en" suppressHydrationWarning>
      {/* There should be NO text, comments, or blank lines
        between the <html> tag above and the <body> tag below.
      */}
      <body suppressHydrationWarning>
        {/* Script MUST be the first thing in <body> */}
        <ColorModeScript initialColorMode={config.initialColorMode} type="cookie" />

        {/* Providers wrapper is next */}
        <Providers cookieHeader={cookieHeader}>{children}</Providers>
      </body>
    </html>
  );
}
