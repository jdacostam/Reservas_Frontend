import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import '../../../Styles/SidebarMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShop,
  faUser,
  faCartShopping,
  faSignOut,
  faStar,
  faArrowPointer,
} from '@fortawesome/free-solid-svg-icons';

const LaboristaHeaderStrategy: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
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
              <FontAwesomeIcon icon={faUser} /> {localStorage.getItem('username')}
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
