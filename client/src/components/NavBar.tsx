import { ActionIcon, Drawer, Button, Container, Group, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

const NavBar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const menuItems = ['Home', 'About', 'Login'];
  const titleStyle = { fontWeight: 700, fontSize: '1.2rem' };

  return (
    <>
      <Container
        size="lg"
        py="md"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.colors.gray[3]}`,
        }}
      >
        <div style={titleStyle}>FERPa DERPA</div>

        {/* Desktop nav */}
        <Group gap="md" visibleFrom="sm">
          {menuItems.map((label) => (
            <Button key={label} variant="subtle">
              {label}
            </Button>
          ))}
        </Group>

        {/* Mobile hamburger */}
        <ActionIcon
          onClick={toggle}
          variant="outline"
          radius="xl"
          size="lg"
          hiddenFrom="sm"
          style={{
            borderColor: 'red',
            width: '32px',
            height: '32px',
            padding: '0',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'scale(0.65)' }} // scale down to ~65%
          >
            <rect x="2" y="4" width="16" height="2" fill="black" />
            <rect x="2" y="9" width="16" height="2" fill="black" />
            <rect x="2" y="14" width="16" height="2" fill="black" />
          </svg>
        </ActionIcon>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        title="Menu"
        padding="md"
        size="md"
        hiddenFrom="sm"
      >
        <Stack>
          {menuItems.map((label) => (
            <Button key={label} variant="subtle" onClick={() => close()}>
              {label}
            </Button>
          ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default NavBar;
