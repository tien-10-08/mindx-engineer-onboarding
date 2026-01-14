// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [message, setMessage] = useState<string>('Loading...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get('/api/')    
      .then(res => {
        setMessage(res.data.message || 'Hello from API!');
      })
      .catch(err => {
        setError('API Error: ' + (err.message || 'Unknown error'));
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
      <h1>React Frontend - Week 1 Onboarding</h1>
      <p>Backend API Response: {message}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <nav>
        <Link to="/about" style={{ margin: '0 15px', textDecoration: 'none', color: 'blue' }}>
          Go to About Page
        </Link>
      </nav>
    </div>
  );
}

function About() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
      <h1>About Page</h1>
      <p>Đây là ứng dụng full-stack React + Express được deploy trên AKS.</p>
      <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;