// src/Utils/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useGeneral } from "./GeneralContext";

const PublicRoute = () => {
  const { userEmail, authChecked, userType } = useGeneral();

  if (!authChecked) return null; // Esperar a que cargue

  // Si ya está logueado, redirige al panel del usuario
  if (userEmail) return  userType == 'Estudiante' ? <Navigate to="/pagUsuario/usuario" replace /> : <Navigate to="/laborista/usuario" replace />;
  return <Outlet />
};

export default PublicRoute;
