import React from "react";
import { Link } from "react-router-dom";
import "../../../Styles/SidebarMenu.css";

const NoAuthHeaderStrategy = () => {
  return (
    <nav className="noauth-nav">
      <h3>Reservas UD</h3>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Ingresar</Link></li>
      </ul>
    </nav>
  );
};

export default NoAuthHeaderStrategy;
