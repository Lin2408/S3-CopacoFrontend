import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">

            <ul className="navbar-links">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/configurator">Configuration</Link>
                </li>
                <li>
                    <Link to="/items">Item overview</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
