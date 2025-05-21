import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>List Property</h1>
      {isLoggedIn && (
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

const styles = {
  header: {
    width: '98%',
    backgroundColor: '#ffffff',
    color: '#007bff',
    padding: '15px 15px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    color: '#007bff',
  },
  logoutButton: {
    backgroundColor: '#4682b4',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '15px',
    cursor: 'pointer',
  },
};

export default Header;
