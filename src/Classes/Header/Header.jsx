import Container from "react-bootstrap/Container";
import getHeaderComponent from "./Strategy/HeaderContext";
import { useState, useEffect } from "react";
import { useGeneral } from "../../Utils/GeneralContext";

const Header = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { userEmail, userType, userName } = useGeneral();

  useEffect(() => {
    setIsUserAuthenticated(userEmail !== null);
  }, [userEmail]);

  return (
    <Container fluid className="mx-0 px-0">
      {getHeaderComponent(isUserAuthenticated, userType, userName)}
    </Container>
  );
};

export default Header;
