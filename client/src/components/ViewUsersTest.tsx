import { Table, Button, Container, Title, Center, Card, Image, Text, Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { isMobile as isMobileDevice, isTablet } from 'react-device-detect'; // Import device detection

const ViewUsersTest = () => {
  const theme = useMantineTheme(); // Access Mantine's theme for breakpoints
  const isMobileScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`); // Check if the screen is mobile-sized
  const isMobile = isMobileScreen || isMobileDevice || isTablet; // Combine media query and device detection

  console.log('Theme Breakpoints:', theme.breakpoints);
  console.log('Current Screen Width:', window.innerWidth);
  console.log('Is Mobile Screen:', isMobileScreen);
  console.log('Is Mobile Device:', isMobileDevice);
  console.log('Is Tablet:', isTablet);
  console.log('Is Mobile:', isMobile);

  // Mock data for the table/cards
  const mockUsers = [
    {
      userId: '1',
      firstName: 'John',
      middleInitial: 'A',
      lastName: 'Doe',
      fullName: 'John A. Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
    },
    {
      userId: '2',
      firstName: 'Jane',
      middleInitial: 'B',
      lastName: 'Smith',
      fullName: 'Jane B. Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith',
    },
    {
      userId: '3',
      firstName: 'Michael',
      middleInitial: '',
      lastName: 'Johnson',
      fullName: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      username: 'mjohnson',
    },
    {
      userId: '4',
      firstName: 'Emily',
      middleInitial: 'C',
      lastName: 'Davis',
      fullName: 'Emily C. Davis',
      email: 'emily.davis@example.com',
      username: 'edavis',
    },
    {
      userId: '5',
      firstName: 'Chris',
      middleInitial: '',
      lastName: 'Brown',
      fullName: 'Chris Brown',
      email: 'chris.brown@example.com',
      username: 'cbrown',
    },
  ];

  return (
    <Container size="lg" py="md">
      {/* Title */}
      <Title order={2} mb="lg" style={{ textAlign: 'center' }}>
        Users
      </Title>

      {/* Responsive Display */}
      {isMobile ? (
        // Display Cards for Mobile and Tablet
        <div style={{ display: 'grid', gap: '1rem' }}>
          {mockUsers.map((user) => (
            <Card key={user.userId} shadow="sm" padding="lg" radius="md" withBorder>
              {/* Random Image */}
              <Card.Section>
                <Image
                  src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                  alt="Random User"
                  height={160}
                />
              </Card.Section>

              {/* Full Name */}
              <Text fw={500} size="lg" mt="md" style={{ textAlign: 'left' }}>
                {user.fullName}
              </Text>

              {/* User Details */}
              <Text size="sm" mt="sm">
                <strong>ID:</strong> {user.userId}
              </Text>
              <Text size="sm">
                <strong>First Name:</strong> {user.firstName}
              </Text>
              <Text size="sm">
                <strong>Middle Initial:</strong> {user.middleInitial || 'N/A'}
              </Text>
              <Text size="sm">
                <strong>Last Name:</strong> {user.lastName}
              </Text>
              <Text size="sm">
                <strong>Email:</strong> {user.email}
              </Text>
              <Text size="sm">
                <strong>Username:</strong> {user.username}
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
        <Table striped highlightOnHover withRowBorders withColumnBorders>
          <thead>
            <tr>
              <th>UserID</th>
              <th>First Name</th>
              <th>Middle Initial</th>
              <th>Last Name</th>
              <th>Full Name</th>
              <th>E-mail Address</th>
              <th>Username</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.middleInitial}</td>
                <td>{user.lastName}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <Button variant="outline" color="blue" size="xs">
                    Update
                  </Button>
                </td>
                <td>
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
      <Center mt="lg">
        <Button variant="filled" color="green" size="md">
          Register New User
        </Button>
      </Center>
    </Container>
  );
};

export default ViewUsersTest;