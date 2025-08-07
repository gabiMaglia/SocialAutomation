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
import { ModalsProvider } from "@mantine/modals";

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
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider
          defaultColorScheme="auto"
          theme={{
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            headings: {
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            },
          }}
        >
          <ModalsProvider>

            <AppFrame>{children}</AppFrame>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
