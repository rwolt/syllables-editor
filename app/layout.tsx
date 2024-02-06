import type { Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Syllable Text Editor",
  description: "Syllables and Rhymes for you Song Lyrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
