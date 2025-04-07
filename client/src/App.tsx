import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import ViewUsersTest from './components/ViewUsersTest'; // Import the new component

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/view-users" element={<ViewUsersTest />} /> {/* Add the route */}
      </Routes>
    </Router>
  );
}

export default App;
