import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Form fillers</h1>
      <nav className="header__nav">
        <Link to="/">Main</Link>
        <Link to="/controlled-form">Controlled Form</Link>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
      </nav>
    </header>
  );
};

export default Header;
