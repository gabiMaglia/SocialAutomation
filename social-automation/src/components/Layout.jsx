import { AppShell, Text, Group, Button, Container, Flex } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css'

export default function Layout() {
  const navigate = useNavigate();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Flex
          justify="space-between"
          align="center"
          h={60}
          px="md"
          bg="dark.7"
        >
          <Group>
            <Text size="md" fw={700} c="white" style={{ display: 'inline-flex' }}>
              🌐 SocialAutomation
            </Text>
          </Group>
            <Group gap="sm">
                {/* <Text size="md" fw={700} c="white" style={{ display: 'inline-flex' }}>
                  🌐 SocialAutomation
                </Text> */}
                <Button variant="subtle" onClick={() => navigate('/home')}>Inicio</Button>
                <Button variant="subtle" onClick={() => navigate('/chat')}>Chat</Button>
                <Button variant="subtle" onClick={() => navigate('/about')}>Sobre</Button>
                <Button variant="subtle" onClick={() => navigate('/contact')}>Contacto</Button>
            </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <Flex justify="center" align="center" h="100%">
            <Container size="md">
            <Outlet />
            </Container>
        </Flex>
      </AppShell.Main>

      <AppShell.Footer>
        <Text ta="center" size="sm" c="dimmed">© 2025 SocialAutomationApp.</Text>
      </AppShell.Footer>
    </AppShell>
  );
}
