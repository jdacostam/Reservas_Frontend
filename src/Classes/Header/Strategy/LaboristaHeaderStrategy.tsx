import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import '../../../Styles/SidebarMenu.css';
import { useGeneral } from '../../../Utils/GeneralContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShop,
  faUser,
  faCartShopping,
  faSignOut,
  faStar,
  faArrowPointer,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  userName?: string | null;
}

const LaboristaHeaderStrategy: React.FC<Props> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useGeneral();
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink
              to="/laborista"
              end
              onClick={toggleMenu}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <FontAwesomeIcon icon={faUser} /> {userName || 'Usuario'}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/laborista/gestionMateriales"
              onClick={toggleMenu}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <FontAwesomeIcon icon={faStar} /> Gestión de materiales
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/laborista/gestionReservas"
              onClick={toggleMenu}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <FontAwesomeIcon icon={faCartShopping} /> Gestión de reservas
            </NavLink>
          </li>

          <li className="theme-toggle-li">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
              {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
          </li>

          <li onClick={handleLogout}>
            <Link to="/">
              <FontAwesomeIcon icon={faSignOut} /> Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default LaboristaHeaderStrategy;
