import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './AuthContext';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Search from './pages/Search';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/trouve-ta-colllab" element={token ? <Search /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
