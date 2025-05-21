import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>List Property</h1>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#007bff',
    padding: '15px 20px',
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
};

export default Header;
