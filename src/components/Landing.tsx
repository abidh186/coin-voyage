import Footer from './Footer';
import Header from './Header';
import TransactionsDisplay from './TransactionsDisplay';

const Landing = ({ name }: { name: string }) => (
  <>
    <Header name={name} />
    <TransactionsDisplay />
    <Footer />
  </>
);

export default Landing;
