import React from 'react';
import HomeComponent from '../app/components/home';
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
