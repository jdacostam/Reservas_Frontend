import Container from "react-bootstrap/Container";
import getHeaderComponent from "./Strategy/HeaderContext";
import { useState, useEffect } from "react";

const Header = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsUserAuthenticated(username !== null);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const username = localStorage.getItem("username");
      setIsUserAuthenticated(username !== null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Container fluid className="mx-0 px-0">
      {getHeaderComponent(isUserAuthenticated)}
    </Container>
  );
};

export default Header;
