import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useGeneral } from "../Utils/GeneralContext";

function Usuario() {
  const { userEmail, userType, fetchUserByEmail } = useGeneral();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (userEmail) {
      obtenerUsuario(userEmail);
    }
  }, [userEmail]);

  const obtenerUsuario = async (email) => {
    try {
      const user = await fetchUserByEmail(email);
      setUsuario(user);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  };

  return <Row>{usuario ? usuario.tipo : userType || "Cargando..."}</Row>;
}

export default Usuario;
