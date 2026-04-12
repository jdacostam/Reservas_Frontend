import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "./apiBaseUrl";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false);
  const [estampable, setEstampable] = useState(false);
  const [estampados, setEstampados] = useState([]);
  const [estampadoElegido, setEstampadoElegido] = useState(-1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [authChecked, setAuthChecked] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    setAuthChecked(true);
  }, []);

  const applyUser = (user) => {
    setUserEmail(user?.email ?? null);
    setUserName(user?.nombre ?? null);
    setUserType(user?.tipo ?? null);
    return user;
  };

  const fetchUserByEmail = async (email) => {
    if (!email) return null;

    const response = await fetch(`${API_BASE_URL}/usuario/consultarEmail/${email}`);
    if (!response.ok) throw new Error("Error al obtener usuario");

    const data = await response.json();
    const user = Array.isArray(data) ? data[0] : data;
    return user ?? null;
  };

  const login = async (userOrEmail) => {
    if (!userOrEmail) return null;

    if (typeof userOrEmail === "string") {
      const user = await fetchUserByEmail(userOrEmail);
      return applyUser(user);
    }

    return applyUser(userOrEmail);
  };

  const logout = () => {
    setUserEmail(null);
    setUserName(null);
    setUserType(null);
    setSelectedImage(null);
  };

  const handleShow = (data) => {
    if (userEmail != null) {
      setSelectedImage(data.diseño);
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClose1 = () => {
    setShow2(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        show,
        setShow,
        handleShow,
        handleClose,
        show2,
        setShow2,
        handleClose1,
        estampable,
        setEstampable,
        estampados,
        setEstampados,
        estampadoElegido,
        setEstampadoElegido,
        selectedImage,
        userEmail,
        userName,
        userType,
        login,
        logout,
        fetchUserByEmail,
        authChecked
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => {
  return useContext(GeneralContext);
};
