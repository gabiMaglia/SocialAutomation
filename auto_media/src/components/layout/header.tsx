// components/Header.tsx
'use client';

import {
  Group,
  Burger,
  ActionIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  // Actualizar estado del AppShell (opcional si querés controlar el colapso global)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.dataset.navOpened = String(opened);
    }
  }, [opened]);

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title order={3}>Post Generator</Title>
      </Group>
      <ActionIcon
        variant="default"
        onClick={toggleColorScheme}
        size="lg"
        aria-label="Toggle color scheme"
      >
        {colorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
      </ActionIcon>
    </Group>
  );
}
