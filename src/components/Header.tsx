import React from 'react';
import { signOut } from 'next-auth/react';
import './Header.css';

const Header = ({ name }: { name: string }) => {
  return (
    <header>
      <h1>Coin Voyage</h1>
      <nav>
        <ul>
          <li>{name}</li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#" onClick={() => signOut()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
