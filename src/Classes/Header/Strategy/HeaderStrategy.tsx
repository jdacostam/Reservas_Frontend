import ClienteHeaderStrategy from "./ClienteHeaderStrategy";
import NoAuthHeaderStrategy from "./NoAuthHeaderStrategy";
import LaboristaHeaderStrategy from "./LaboristaHeaderStrategy";

export function getHeaderComponent(isUserAuthenticated: boolean): JSX.Element {
  const tipoCliente = localStorage.getItem("tipoUsuario");

  if (!isUserAuthenticated) return <NoAuthHeaderStrategy />;

  if (["Estudiante", "Profesor", "Externo"].includes(tipoCliente || "")) {
    return <ClienteHeaderStrategy />;
  }

  if (tipoCliente === "Laborista") {
    return <LaboristaHeaderStrategy />;
  }

  return <NoAuthHeaderStrategy />;
}
