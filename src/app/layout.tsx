import "./globals.css";
import "@mantine/core/styles.css";

import type { Metadata } from "next";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";
import AppFrame from "@/components/layout/app-frame";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "IA Post Generator",
  description:
    "Genera posteos con IA para redes sociales de forma fácil y rápida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider
          defaultColorScheme="auto"
          theme={{
            primaryColor: "cyan",
            fontFamily: "var(--font-geist-sans)",
            headings: { fontFamily: "var(--font-geist-sans)" },
          }}
        >
          <AppFrame>{children}</AppFrame>
        </MantineProvider>
      </body>
    </html>
  );
}
