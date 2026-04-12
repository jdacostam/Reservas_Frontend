import ClienteHeaderStrategy from "./ClienteHeaderStrategy";
import NoAuthHeaderStrategy from "./NoAuthHeaderStrategy";
import LaboristaHeaderStrategy from "./LaboristaHeaderStrategy";

export function getHeaderComponent(
  isUserAuthenticated: boolean,
  tipoCliente?: string | null,
  userName?: string | null
): JSX.Element {

  if (!isUserAuthenticated) return <NoAuthHeaderStrategy />;

  if (["Estudiante", "Profesor", "Externo"].includes(tipoCliente || "")) {
    return <ClienteHeaderStrategy userName={userName} />;
  }

  if (tipoCliente === "Laborista") {
    return <LaboristaHeaderStrategy userName={userName} />;
  }

  return <NoAuthHeaderStrategy />;
}
