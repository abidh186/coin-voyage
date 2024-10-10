import React from 'react';
import HomeComponent from '../app/components/home';
import HeaderComponent from '../app/components/header'; // Adjust the path as necessary

const Home: React.FC = () => {
  return (
    <div>
      <HeaderComponent />
      <HomeComponent />
    </div>
  );
};

export default Home;
