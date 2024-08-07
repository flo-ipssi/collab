import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Home: React.FC = () => {
  const { token } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      {!token ?<Link to="/login">Login</Link> : <Link to="/dashboard">Dashboard</Link> }
    </div>
  );
};

export default Home;
