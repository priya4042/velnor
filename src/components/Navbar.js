// components/Navbar.js
import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/">
        <Logo width="60px" />
      </Link>
      <div>
        <Link to="/signin" style={styles.link}>Sign In</Link>
        <Link to="/signup" style={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    marginLeft: '20px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Navbar;
