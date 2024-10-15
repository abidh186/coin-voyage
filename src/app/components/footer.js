import React from 'react';
import './footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <p>
          We are dedicated to providing insights to help you manage your
          expenses.
        </p>
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: contact@coin-voyage.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <ul className="social-links">
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <p>&copy; 2024 Coin Voyage. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
