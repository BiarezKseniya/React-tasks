import { Outlet } from 'react-router';
import Header from './components/header/Header';
import './App.css';
import './styles/Header.css';
import './styles/Form.css';
import './styles/PasswordStrength.css';
import './styles/Autocomplete.css';
import './styles/DataCard.css';
import './styles/Main.css';
import Main from './components/main/Main';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <main>{location.pathname === '/' ? <Main /> : <Outlet />}</main>
    </>
  );
};

export default App;
