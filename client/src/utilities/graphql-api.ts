import { gql } from '@apollo/client';

// Define the GraphQL query to fetch users
export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      first_name
      last_name
      full_name
      email
      hashed_password
    }
  }
`;

// TODO: remove code once Apollo is available 
// Initialize Apollo Client
// export const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql/', // Update this URL if your server runs on a different port or path
//   cache: new InMemoryCache(),
// });

// // Function to fetch users
// export const fetchUsers = async () => {
//   try {
//     const response = await client.query({ query: GET_USERS_QUERY });
//     console.log(response.data.users);
//     return response.data.users;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };