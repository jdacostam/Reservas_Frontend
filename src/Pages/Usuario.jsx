import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Usuario() {
  const email = localStorage.getItem("email");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (email) {
      obtenerUsuario(email);
    }
  }, []); // Ejecutar solo una vez

  const obtenerUsuario = async (email) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/usuario/consultarEmail/${email}`
      );
      if (!response.ok) throw new Error("Error al obtener usuario");
      const json = await response.json();
      setUsuario(json);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  };

  return <Row>{usuario ? usuario.tipo : "Cargando..."}</Row>;
}

export default Usuario;
