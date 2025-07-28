'use client';

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome2, IconSettings } from '@tabler/icons-react';
import Image from 'next/image';
import logo from '@/assets/logo.webp'

import styles from "./app-frame.module.css";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();  

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      className={styles.page}
      aside={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      layout="alt"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
            <div>
              {/* TODO LOGO */}
              {/* <Image alt='Social-Automation' objectFit='contain' width={60} height={60} src={logo}></Image> */}
            </div> 
          <Burger opened={opened} onClick={toggle} size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Aside p="md">
        <Stack>
          <NavLink  href="/" label="Inicio"        leftSection={<IconHome2    size={16} />} />
          <NavLink  href="/generate" label="Generar Posteo" leftSection={<IconSettings size={16} />} />
          <NavLink  href="/config" label="Configuración" leftSection={<IconSettings size={16} />} />
        </Stack>
      </AppShell.Aside>

      <AppShell.Main className={styles.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
