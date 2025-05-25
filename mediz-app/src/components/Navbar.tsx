// components/Navbar.js
import { Link } from 'react-router-dom';
import logo from '../assets/medblocks.webp';

function Navbar() {
return (
    <nav className="fixed top-0 w-full px-15 py-5 flex items-start justify-between">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Mediz Logo" className="h-8 w-auto mr-2" />
      </Link>
      <div>
        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }} to="/register" className="mr-10">Register</Link>
        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }} to="/search" className="">Search</Link>
      </div>
    </nav>
  );
}

export default Navbar;