import ClienteHeaderStrategy from "./ClienteHeaderStrategy";
import NoAuthHeaderStrategy from "./NoAuthHeaderStrategy";
import LaboristaHeaderStrategy from "./LaboristaHeaderStrategy";

/**
 * Devuelve el componente de Header correcto según autenticación y tipo de usuario.
 * Este archivo reemplaza completamente a la versión basada en clases.
 */
interface HeaderProps {
  isUserAuthenticated: boolean;
  tipoCliente?: string | null;
  userName?: string | null;
}

export function getHeaderComponent(
  isUserAuthenticated: boolean,
  tipoCliente?: string | null,
  userName?: string | null
): JSX.Element {

  // Usuario no autenticado
  if (!isUserAuthenticated) {
    return <NoAuthHeaderStrategy />;
  }

  // Usuarios normales
  if (["Estudiante", "Profesor", "Externo"].includes(tipoCliente || "")) {
    return <ClienteHeaderStrategy userName={userName} />;
  }

  // Usuario Laborista
  if (tipoCliente === "Laborista") {
    return <LaboristaHeaderStrategy userName={userName} />;
  }

  // Caso por defecto
  return <NoAuthHeaderStrategy />;
}

export default getHeaderComponent;
