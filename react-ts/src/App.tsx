import { Outlet } from 'react-router';
import Header from './components/header/Header';
import './App.css';
import './styles/Header.css';
import './styles/Form.css';
import './styles/PasswordStrength.css';
import './styles/Autocomplete.css';

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
