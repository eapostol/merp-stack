import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// made apollo available everywhere
export const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // Update this URL if your server runs on a different port or path
  cache: new InMemoryCache(),
});
// import { client } from './utilities/graphql-api'; // Import the Apollo Client instance
import NavBar from './components/NavBar';
import React, { Suspense } from 'react';

// Dynamically import components by implementing lazy loading
const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const ViewUsers = React.lazy(() => import('./components/ViewUsers'));
// TODO: remove test component
// const ViewUsersTestGql = React.lazy(() => import('./components/ViewUsersTestGql'));

function App() {
  return (
    <ApolloProvider client={client}> {/* Wrap the app with ApolloProvider */}
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/view-users" element={<ViewUsers />} />
            {/* <Route path="/view-users-gql" element={<ViewUsersTestGql />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
}

export default App;
