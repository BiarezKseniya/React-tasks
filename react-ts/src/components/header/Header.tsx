import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>Form fillers</h1>
      <nav className="header__nav">
        <NavLink to="/">Main</NavLink>
        <NavLink to="/controlled-form">Controlled Form</NavLink>
        <NavLink to="/uncontrolled-form">Uncontrolled Form</NavLink>
      </nav>
    </header>
  );
};

export default Header;
