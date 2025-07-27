// components/Navbar.tsx
'use client';

import { NavLink, Stack } from "@mantine/core";

import { IconHome2, IconSettings } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <>
      <Stack p="md">
        <NavLink label="Inicio" leftSection={<IconHome2 size={16} />} href="/" />
        <NavLink label="Configuración" leftSection={<IconSettings size={16} />} href="/settings" />
      </Stack>
    </>
  );
}
