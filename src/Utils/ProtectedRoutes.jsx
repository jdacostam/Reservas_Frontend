import { Outlet, Navigate } from "react-router-dom";
import { useGeneral } from "./GeneralContext";

const ProtectedRoutes = (prop) => {
  const { userType, userEmail } = useGeneral();
  const usuario = userType;
  

  if (prop.rolAutorizado) {
    if (usuario && usuario === prop.rolAutorizado) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (!userEmail) {
      return <Outlet />;
    }
  }
  return <Navigate to="/" />;
};

export default ProtectedRoutes;
