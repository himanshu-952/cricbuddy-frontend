import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all-matches">All Matches</Link></li>
        <li><Link to="/upcoming">Upcoming Matches</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}
