import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Coin Voyage</h1>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
