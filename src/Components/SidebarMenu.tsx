import React, { useState } from 'react';
import "../Styles/SidebarMenu.css"; // Importa los estilos

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Menú lateral */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">uwuwuwuu</a></li>
          <li><a href="#">Proyectos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>

      {/* Capa semitransparente (para cerrar al hacer clic fuera) */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default SidebarMenu;