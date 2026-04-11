import ClienteHeaderStrategy from "./ClienteHeaderStrategy";
import NoAuthHeaderStrategy from "./NoAuthHeaderStrategy";
import LaboristaHeaderStrategy from "./LaboristaHeaderStrategy";

/**
 * Devuelve el componente de Header correcto según autenticación y tipo de usuario.
 * Este archivo reemplaza completamente a la versión basada en clases.
 */
export function getHeaderComponent(isUserAuthenticated: boolean): JSX.Element {
  const tipoCliente = localStorage.getItem("tipoUsuario");

  // Usuario no autenticado
  if (!isUserAuthenticated) {
    return <NoAuthHeaderStrategy />;
  }

  // Usuarios normales
  if (["Estudiante", "Profesor", "Externo"].includes(tipoCliente || "")) {
    return <ClienteHeaderStrategy />;
  }

  // Usuario Laborista
  if (tipoCliente === "Laborista") {
    return <LaboristaHeaderStrategy />;
  }

  // Caso por defecto
  return <NoAuthHeaderStrategy />;
}

export default getHeaderComponent;
