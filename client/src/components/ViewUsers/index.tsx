import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Table, Button, Container, Title, Center, Card, Image, Text, Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GET_USERS_QUERY } from '../../utilities/graphql-api';
import styles from './viewusers.module.css';

const ViewUsers = () => {
  interface User {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
  }

  interface DetectionOptions {
    useProbability?: boolean;
    useCount?: boolean;
  }

  const theme = useMantineTheme();
  const isMobileScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const isTabletScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const isMobileOrTablet = isMobileScreen || isTabletScreen;

  const [users, setUsers] = useState<User[]>([]);
  const [isGenderDetectorLoaded, setIsGenderDetectorLoaded] = useState<boolean>(true);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [genderDetector, setGenderDetector] = useState<{ detect: (name: string, options?: DetectionOptions) => string } | null>(null);

  useEffect(() => {
    const loadGenderDetector = async () => {
      try {
        const module = await import('gender-detection-ts');
        setGenderDetector(() => module.default || module);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setGenderError(err.message || 'Error loading gender detector');
        } else {
          setGenderError('An unknown error occurred');
        }
      } finally {
        setIsGenderDetectorLoaded(false);
      }
    };

    loadGenderDetector();
  }, []);

  // Use Apollo Client's useQuery hook to fetch users
  const { loading, error, data } = useQuery(GET_USERS_QUERY);

  // Update users state when data changes
  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users);
    }
  }, [data]);

  if (loading) {
    return <p>Retrieving Data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const getGender = (name: string, options?: DetectionOptions) => {
    if (!genderDetector) return 'unknown';
    return genderDetector.detect(name, options as DetectionOptions);
  };

  if (isGenderDetectorLoaded) {
    return <p>Loading name determination...</p>;
  }

  if (genderError) {
    return <p>Error: {genderError}</p>;
  }

  return (
    <Container size="lg" py="md">
      <Title order={2} mb="lg" style={{ textAlign: 'center' }}>
        Users
      </Title>

      {isMobileOrTablet ? (
        <div className={styles.cardContainer}>
          {users.map((user) => (
            <Card
              style={{
                textAlign: 'center',
                border: '1px solid grey',
                borderRadius: '8px',
                padding: '16px',
              }}
              key={user.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Image
                  src={`https://randomuser.me/api/portraits/${getGender(user.first_name, { useProbability: true }) === 'female' ? 'women' : 'men'
                    }/${Math.floor(Math.random() * 100)}.jpg`}
                  alt={user.first_name}
                  height={160}
                />
              </Card.Section>
              <Text fw={500} size="lg" mt="md" style={{ textAlign: 'center' }}>
                {user.full_name}
              </Text>
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

      <Center mt="lg" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="filled" color="green" size="md">
          Register New User
        </Button>
      </Center>
    </Container>
  );
};

export default ViewUsers;