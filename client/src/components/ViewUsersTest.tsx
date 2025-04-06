import { Table, Button, Container, Title, Center, useMantineTheme } from '@mantine/core';

const ViewUsersTest = () => {
    const theme = useMantineTheme(); // Access Mantine's theme for breakpoints

    // Mock data for the table
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
            <Title order={2} mb="lg" style={{ textAlign: 'center' }}>
            Users
            </Title>
            {/* Table */}
            <Table
                striped
                highlightOnHover

                // If 'withBorder' is not supported, consider using 'sx' for custom border styling
                withColumnBorders
                style={{
                    border: '1px solid',
                    borderColor: theme.colors.gray[4],
                    tableLayout: 'auto',
                    fontSize: '0.8rem', // Default font size
                    [`@media (maxWidth: ${theme.breakpoints.sm})`]: {
                      fontSize: '0.7rem', // Smaller font size for small screens
                    },
                  }}
            >
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

            {/* Register New User Button */}
            <Center mt="lg">
                <Button
                    variant="filled"
                    color="green"
                    size="md"
                    style={{
                        width: '100%', // Example style
                      }}
                >
                    Register New User
                </Button>
            </Center>
        </Container>
    );
};

export default ViewUsersTest;