// components/Logo.js
import React from 'react';

const Logo = ({ width = '60px' }) => {
  return (
    <img
      src="assets/velnor-logo.png"
      alt="Velnor Logo"
      style={{ width, height: 'auto' }}
    />
  );
};

export default Logo;
