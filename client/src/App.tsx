import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import React, { Suspense } from 'react';
// Dynamically import components by implementing lazy loading 
const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const ViewUsersTest = React.lazy(() => import('./components/ViewUsersTest'));
const ViewUsersTestGql = React.lazy(() => import('./components/ViewUsersTestGql'));

function App() {
  return (
    <Router>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/view-users" element={<ViewUsersTest />} /> {/* Add the route */}
          <Route path="/view-users-gql" element={<ViewUsersTestGql />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
