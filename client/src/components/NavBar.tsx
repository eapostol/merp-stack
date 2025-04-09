import { ActionIcon, Drawer, Button, CloseButton, Container, Group, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { IconX } from '@tabler/icons-react';
// import { useState } from 'react';

const NavBar = () => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const theme = useMantineTheme();
    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'View Users (Test)', path: '/view-users' },
        { label: 'Login', path: '/login' }
    ];
    const titleStyle = { fontWeight: 700, fontSize: '1.2rem' };
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)'); // Media query for tablets

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
                <Group gap="lg" visibleFrom="sm">
                    {menuItems.map((item) => (
                        <Button
                            key={item.label}
                            component={Link}
                            to={item.path}
                            variant="subtle"
                            styles={{
                                root: {
                                    paddingLeft: '0.75rem',
                                    paddingRight: '0.75rem',
                                    fontWeight: 500,
                                },
                            }}
                        >
                            {item.label}
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
                        display: isTablet ? 'block' : 'none', // Show on mobile and tablets
                        borderColor: 'red',
                        width: '32px',
                        height: '32px',
                        padding: '0',
                        transition: 'transform 0.3s ease',
                        transform: opened ? 'translateX(-8px)' : 'translateX(0)',
                        position: 'absolute', // Ensure it moves dynamically
                        right: '1rem', // Adjust based on container padding
                        top: '1rem', // Adjust for vertical alignment
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
                withCloseButton={false}
                opened={opened}
                onClose={close}
                title="Options"
                padding="md"
                size="md"
                hiddenFrom="sm"
                styles={{
                    content: {
                        borderLeft: '2px solid #ccc',
                        height: '100vh',
                        overflowY: 'auto', // Ensure content scrolls if it overflows
                    },
                    body: {
                        padding: '1rem',
                        borderLeft: '2px solid #ccc', // subtle left border
                        height: '100%',
                    },

                }}
            >
                <CloseButton
                    onClick={close}
                    icon={<IconX size={14} stroke={2} />}
                    size="xs"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        margin: '1rem auto',
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                        padding: 0,
                    }}
                />

                <Stack align="stretch" gap="xs">
                    {menuItems.map((item) => (
                        <Group key={item.label} gap="xs" align="center" wrap="nowrap">
                            <span style={{ fontWeight: 'bold', color: '#000', fontSize: '0.8rem' }}>✕&nbsp;</span>
                            <Button
                                component={Link}
                                to={item.path}
                                variant="subtle"
                                onClick={close}
                                fullWidth
                                justify="flex-start"
                                styles={{
                                    root: { justifyContent: 'flex-start', paddingLeft: 0 },
                                }}
                            >
                                {item.label}
                            </Button>
                        </Group>
                    ))}
                </Stack>


            </Drawer>
        </>
    );
};

export default NavBar;
