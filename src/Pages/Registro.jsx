import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { ConversionEmail } from "../Classes/Adapter/conversionEmail";
import Header from "../Classes/Header/Header";
import { FachadaDeEstados } from "../Classes/Estados/Fachada/FachadaDeEstados";
import { API_BASE_URL } from "../Utils/apiBaseUrl";

function Registro() {
  const fachada = new FachadaDeEstados();
  const emailAdapter = new ConversionEmail();
  const navigate = useNavigate();

  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(fachada.getMostrarAlerta());
  const [alertState, setAlertState] = useState(fachada.getEstadoDeAlerta());
  const [loading, setLoading] = useState(false);

  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    password: "",
    tipo: "",
    cedula: "",
    codigoEstudiantil: "",
  });

  const clientChange = (e) => {
    const { name, value } = e.target;

    if (name === "cedula" || name === "codigoEstudiantil") {
      const maxLength = name === "cedula" ? 10 : 11;
      const numericValue = value.replace(/\D/g, "").slice(0, maxLength);
      setCliente({ ...cliente, [name]: numericValue });
      return;
    }

    setCliente({ ...cliente, [name]: value });
  };

  const handleSelect = (e) => {
    const tipo = e.target.value;
    setCliente({ ...cliente, tipo, codigoEstudiantil: "" });
  };

  const clientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { nombre, email, password, tipo, cedula, codigoEstudiantil } =
        cliente;

      // Validaciones específicas de longitud
      if (nombre.length > 45) {
        setAlertText("El nombre es mayor a 45 caracteres");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      if (email.length > 45) {
        setAlertText("El correo es mayor a 45 caracteres");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      if (password.length > 45) {
        setAlertText("La contraseña es mayor a 45 caracteres");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      if (!/^\d{6,10}$/.test(cedula)) {
        setAlertText("La cédula debe tener entre 6 y 10 números");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      if (tipo === "Estudiante" && !/^\d{11}$/.test(codigoEstudiantil)) {
        setAlertText("El código estudiantil debe ser de 11 dígitos");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      const emailLower = emailAdapter.convertirEmailAMinuscula(email);
      const payload = {
        ...cliente,
        email: emailLower,
        codigoEstudiantil: tipo === "Estudiante" ? codigoEstudiantil : null,
      };

      if (import.meta.env.DEV) {
        const debugPayload = { ...payload, password: "***" };
        console.log("[Registro] API_BASE_URL:", API_BASE_URL);
        console.log("[Registro] Payload:", debugPayload);
      }

      const res = await fetch(`${API_BASE_URL}/usuario/crearUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (import.meta.env.DEV) {
        console.log("[Registro] Response:", {
          status: res.status,
          ok: res.ok,
          data,
        });
      }

      if (data.statusCode === 200) {
        setAlertText("El usuario ya existe");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
      } else {
        setAlertText("Registro exitoso");
        setAlertState(fachada.cambioEstadoDeAlerta(0));
        setShowAlert(fachada.cambioMostrarAlerta());
        setTimeout(() => navigate("/login"), 500);
      }

      setLoading(false);
    } catch (error) {
      setAlertText("Error en el registro");
      setAlertState(fachada.cambioEstadoDeAlerta(1));
      setShowAlert(fachada.cambioMostrarAlerta());
      setLoading(false);
    }
  };

  const isCedulaValida = /^\d{6,10}$/.test(cliente.cedula);
  const isCodigoEstudiantilValido =
    cliente.tipo !== "Estudiante" || /^\d{11}$/.test(cliente.codigoEstudiantil);

  return (
    <>
      <Header />
      <Alert
        className="alert mt-5"
        variant={alertState}
        show={showAlert}
        onClose={() => setShowAlert(fachada.cambioMostrarAlerta())}
        dismissible
      >
        {alertText}
      </Alert>
      <div className="text-center content" style={{ paddingTop: "15rem" }}>
        <Form.Group className="mb-1 mt-5 pt-5" controlId="formBasicTipo">
          <Image className="logoCentral" src="/logo.png" fluid width="22%" />
        </Form.Group>
        <Form onSubmit={clientSubmit} data-testid="Form">
          <Form.Group className="mb-3" controlId="formTipoUsuario">
            <Form.Select 
              style={{ width: "325px" }}
              onChange={handleSelect} 
              value={cliente.tipo} 
              data-testid="Tipo de registro"
            >
              <option value="">Selecciona tu rol</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Profesor">Profesor</option>
              <option value="Externo">Externo</option>
            </Form.Select>
            <Form.Text>¿Cuál es tu rol dentro del sistema?</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Control
              style={{ width: "325px" }}
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={clientChange}
              value={cliente.nombre}
              data-testid="Nombre"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              style={{ width: "325px" }}
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={clientChange}
              value={cliente.email}
              data-testid="Correo"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              style={{ width: "325px" }}
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={clientChange}
              value={cliente.password}
              data-testid="Contraseña"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Control
              style={{ width: "325px" }}
              type="text"
              name="cedula"
              placeholder="Cédula"
              onChange={clientChange}
              value={cliente.cedula}
              inputMode="numeric"
              maxLength={10}
            />
            <Form.Text>Debe tener entre 6 y 10 números.</Form.Text>
          </Form.Group>

          {cliente.tipo === "Estudiante" && (
            <Form.Group className="mb-3" controlId="formCodigoEstudiantil">
              <Form.Control
                style={{ width: "325px" }}
                type="text"
                name="codigoEstudiantil"
                placeholder="Código Estudiantil"
                onChange={clientChange}
                value={cliente.codigoEstudiantil}
                inputMode="numeric"
                maxLength={11}
              />
              <Form.Text>Debe tener exactamente 11 dígitos.</Form.Text>
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={
              !cliente.nombre ||
              !cliente.email ||
              !cliente.password ||
              !cliente.tipo ||
              !isCedulaValida ||
              !isCodigoEstudiantilValido
            }
            data-testid="Registrarme"
          >
            {loading ? "Registrando..." : "Registrarme"}
          </Button>
        </Form>
        <Form.Group>
          <hr />
          <Link to={"/login"}>
            <Button variant="outline-primary">Ya tengo cuenta - Iniciar Sesión</Button>
          </Link>
          <Link to={"/"} className="d-block mt-3">
            <Button
              variant="outline-secondary"
              className="btn-back-home"
            >
              ← Volver al inicio
            </Button>
          </Link>
        </Form.Group>
      </div>
    </>
  );
}

export default Registro;
