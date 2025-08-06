import './globals.css';
import '@mantine/core/styles.css'; 

import type { Metadata } from 'next';
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import { Geist, Geist_Mono } from 'next/font/google';
import AppFrame from '@/components/layout/app-frame';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Post Generator',
  description: 'Genera copy para redes con IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider defaultColorScheme="auto">
          <AppFrame>{children}</AppFrame>
        </MantineProvider>
      </body>
    </html>
  );
}
