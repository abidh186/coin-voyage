import React from 'react';
import HomeComponent from './components/landing';
import HeaderComponent from '../app/components/header';
import Footer from '../app/components/footer';

const Home: React.FC = () => {
  return (
    <div>
      <HeaderComponent />
      <HomeComponent />
      <Footer />
    </div>
  );
};

export default Home;
