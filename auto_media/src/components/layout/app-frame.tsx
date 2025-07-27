'use client';

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Stack,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome2, IconSettings } from '@tabler/icons-react';

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  

  return (
  <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          The burger icon is always visible
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        You can collapse the Navbar both on desktop and mobile. After sm breakpoint, the navbar is
        no longer offset by padding in the main element and it takes the full width of the screen
        when opened.
      </AppShell.Navbar>
      <AppShell.Main>
       {children}
      </AppShell.Main>
    </AppShell>
  );
}
