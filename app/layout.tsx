import React from "react";
import { Providers } from "./providers";

/**
 * Root layout component that wraps all pages
 * Defines the basic HTML structure
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap all content with Chakra providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
