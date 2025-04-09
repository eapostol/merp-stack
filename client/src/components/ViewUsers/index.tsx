import { useState, useEffect } from 'react';
import { Table, Button, Container, Title, Center, Card, Image, Text, Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { fetchUsers } from '../../utilities/graphql-api'; // Import fetchUsers function
import styles from './viewusers.module.css';

const ViewUsers = () => {
  interface User {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
  }

  const theme = useMantineTheme(); // Access Mantine's theme for breakpoints
  const isMobileScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`); // Check if the screen is mobile-sized
  const isTabletScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`); // Check if the screen is tablet-sized
  const isMobileOrTablet = isMobileScreen || isTabletScreen; // Combine media query for mobile and tablet

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Error fetching users');
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container size="lg" py="md">
      {/* Title */}
      <Title order={2} mb="lg" style={{ textAlign: 'center' }}>
        Users
      </Title>

      {/* Responsive Display */}
      {isMobileOrTablet ? (
        // Display Cards for Mobile and Tablet
        <div className={styles.cardContainer}>
          {users.map((user) => (
            <Card
              style={{
                textAlign: 'center',
                border: '1px solid grey', // Add grey border
                borderRadius: '8px', // Add rounded corners
                padding: '16px', // Optional: Add padding for better spacing
              }}
              key={user.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              {/* Random Image */}
              <Card.Section>
                <Image
                  src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(
                    Math.random() * 100
                  )}.jpg`}
                  alt="Random User"
                  height={160}
                />
              </Card.Section>

              {/* Full Name */}
              <Text fw={500} size="lg" mt="md" style={{ textAlign: 'center' }}>
                {user.full_name}
              </Text>

              {/* User Details */}
              <Text size="sm" mt="sm">
                <strong>ID:</strong> {user.id}
              </Text>
              <Text size="sm">
                <strong>First Name:</strong> {user.first_name}
              </Text>
              <Text size="sm">
                <strong>Last Name:</strong> {user.last_name}
              </Text>
              <Text size="sm">
                <strong>Email:</strong> {user.email}
              </Text>

              {/* Action Buttons */}
              <Group mt="md" align="center">
                <Button variant="outline" color="blue" size="xs">
                  Update
                </Button>
                <Button variant="outline" color="red" size="xs">
                  Delete
                </Button>
              </Group>
            </Card>
          ))}
        </div>
      ) : (
        // Display Table for Desktop and Large Screens
        <Table>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="outline" color="blue" size="xs">
                    Update
                  </Button>
                  <Button variant="outline" color="red" size="xs">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Register New User Button */}
      <Center mt="lg" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="filled" color="green" size="md">
          Register New User
        </Button>
      </Center>
    </Container>
  );
};

export default ViewUsers;