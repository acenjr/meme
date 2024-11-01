import React, { useContext } from 'react';
import { ThemeContext } from '../App';

const Nav = () => {
  const { toggleTheme } = useContext(ThemeContext);

  const handleSelfie = () => {
    // Open camera and capture selfie
  };

  const handleText = () => {
    // Open text dialog
  };

  return (
    <nav>
      <button onClick={handleSelfie}>Take a selfie</button>
      <button onClick={handleText}>Add text</button>
      <button onClick={toggleTheme}>Change theme</button>
      {/* Add Download, Delete, and Reset buttons */}
    </nav>
  );
};

export default Nav;
