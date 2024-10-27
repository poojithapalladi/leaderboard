// src/components/Navbar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { authState, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/leaderboard" style={{ marginLeft: '10px' }}>Leaderboard</Link>
      </div>
      <div>
        {authState ? (
          <>
            <span>Welcome, {authState.firstName}</span>
            <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: '10px' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
