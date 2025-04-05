// client/src/components/NavBar.tsx
import { Container, Group, Burger, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const NavBar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Container
      size="lg"
      style={{
        padding: '1rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>MyApp</div>

      <Group gap="lg" visibleFrom="sm">

        {/* Menu items will go here */}
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Login</a>
      </Group>

      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    </Container>
  );
};

export default NavBar;
