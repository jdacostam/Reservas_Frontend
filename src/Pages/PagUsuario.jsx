import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { GeneralProvider } from "../Utils/GeneralContext";
import Header from "../Classes/Header/Header";
import ClienteProfile from "../Components/ClienteProfile";
import { Outlet } from "react-router-dom";
import "../Styles/PagUsuario.css";

function PagUsuario() {

  return (
    <GeneralProvider>
      <div className="pag-usuario-wrapper">
        <Container fluid className="align-items-center m-0 p-0">
          <Row className="width-100vw">
           <Header />
          </Row>

          <Row className="width-100vw pag-usuario-content">
            <Outlet/>
          </Row>

        </Container>
      </div>
    </GeneralProvider>
  );
}

export default PagUsuario;
