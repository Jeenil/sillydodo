import { ColorModeScript } from "@chakra-ui/react";
import { headers } from "next/headers";
import { Providers } from "./components/Providers";
import { config } from "./theme/config";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get("cookie") ?? "";

  return (
    <html lang="en" suppressHydrationWarning>
      {/* There should be NO text, comments, or blank lines
        between the <html> tag above and the <body> tag below.
      */}
      <body suppressHydrationWarning>
        {/* Script MUST be the first thing in <body> */}
        <ColorModeScript
          initialColorMode={config.initialColorMode}
          type="cookie"
        />

        {/* Providers wrapper is next */}
        <Providers cookieHeader={cookieHeader}>{children}</Providers>
      </body>
    </html>
  );
}
