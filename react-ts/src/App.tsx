import { Outlet } from 'react-router';
import Header from './components/header/Header';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
