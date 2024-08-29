// import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './auth/AuthContext';
import Search from './pages/Search';
import ErrorPage from './ErrorPage';
import Register from './auth/Register';
import UserProfile from './pages/UserProfile';

function App() {
  const { token } = useAuth();

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/trouve-ta-colllab" element={token ? <Search /> : <Navigate to="/login" />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
  )
}

export default App
