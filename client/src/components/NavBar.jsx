import { NavLink } from 'react-router-dom';
import homeLogo from '../assets/nicologo.png';

function NavBar() {

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/about" className="nav-link">About</NavLink>
      <NavLink to="/projects" className="nav-link">Projects</NavLink>
      <NavLink to="/services" className="nav-link">Services</NavLink>
      <NavLink to="/contact" className="nav-link">Contact</NavLink>
      <img src={homeLogo} className="nav-link-logo" alt="logo"></img>
    </nav>
  );
}

export default NavBar;

