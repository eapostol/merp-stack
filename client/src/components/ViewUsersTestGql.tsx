import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../utilities/graphql-api';

const ViewUsersTestGql: React.FC = () => {
  interface User {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    hashed_password: string;
  }

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
        // setError(err.message || 'Error fetching users');
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
    <div>
      <h2>Users List</h2>
      <table border={1} cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Full Name</th>
            <th>Email</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsersTestGql;