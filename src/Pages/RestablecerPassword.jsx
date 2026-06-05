import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Classes/Header/Header";
import "../Styles/Login.css";
import { ConversionEmail } from "../Classes/Adapter/conversionEmail";
import { FachadaDeEstados } from "../Classes/Estados/Fachada/FachadaDeEstados";
import { API_BASE_URL } from "../Utils/apiBaseUrl";

function RestablecerPassword() {
  const navigate = useNavigate();
  const emailAdapter = new ConversionEmail();
  const fachada = new FachadaDeEstados();

  const [datos, setDatos] = useState({
    email: "",
    cedula: "",
    password: "",
    confirmPassword: "",
  });

  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(fachada.getMostrarAlerta());
  const [alertState, setAlertState] = useState(fachada.getEstadoDeAlerta());
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cedula") {
      // Permitir solo números y máximo 10 caracteres
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setDatos({ ...datos, [name]: numericValue });
      return;
    }

    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, cedula, password, confirmPassword } = datos;

      if (!email || !cedula || !password || !confirmPassword) {
        setAlertText("Por favor complete todos los campos");
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

      if (password !== confirmPassword) {
        setAlertText("Las contraseñas no coinciden");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      if (password.length > 45) {
        setAlertText("La contraseña no puede superar los 45 caracteres");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      const emailLower = emailAdapter.convertirEmailAMinuscula(email);
      const payload = {
        email: emailLower,
        cedula,
        nuevaPassword: password,
      };

      if (import.meta.env.DEV) {
        console.log("[RestablecerPassword] API_BASE_URL:", API_BASE_URL);
        console.log("[RestablecerPassword] Payload:", { ...payload, password: "***" });
      }

      const res = await fetch(`${API_BASE_URL}/usuario/restablecerPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (import.meta.env.DEV) {
        console.log("[RestablecerPassword] Response:", {
          status: res.status,
          ok: res.ok,
          data,
        });
      }

      // El backend puede retornar statusCode 200 en su data, res.ok o responder de diversas formas exitosas.
      if (res.ok || data.statusCode === 200 || data.success) {
        setAlertText(data.message || "Contraseña restablecida con éxito");
        setAlertState(fachada.cambioEstadoDeAlerta(0));
        setShowAlert(fachada.cambioMostrarAlerta());
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setAlertText(data.message || "Error al restablecer la contraseña. Verifique sus datos.");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
      }
    } catch (error) {
      console.error(error);
      setAlertText("Error de red o del servidor");
      setAlertState(fachada.cambioEstadoDeAlerta(1));
      setShowAlert(fachada.cambioMostrarAlerta());
    } finally {
      setLoading(false);
    }
  };

  const isCedulaValida = /^\d{6,10}$/.test(datos.cedula);
  const passwordsCoinciden = datos.password && datos.password === datos.confirmPassword;
  const isFormValido =
    datos.email &&
    isCedulaValida &&
    datos.password &&
    passwordsCoinciden &&
    datos.password.length <= 45;

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
        <Form.Group className="mb-1 mt-5 pt-5" controlId="formLogo">
          <Image className="logoCentral" src="/logo.png" fluid width="22%" />
        </Form.Group>
        <h2 className="text-white mb-4">Restablecer Contraseña</h2>
        <Form onSubmit={handleSubmit} data-testid="RestablecerForm">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              style={{ width: "325px" }}
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              value={datos.email}
              data-testid="Correo"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Control
              style={{ width: "325px" }}
              type="text"
              name="cedula"
              placeholder="Cédula"
              onChange={handleChange}
              value={datos.cedula}
              inputMode="numeric"
              maxLength={10}
              required
            />
            <Form.Text className="text-muted text-white-50">
              Debe tener entre 6 y 10 números.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              style={{ width: "325px" }}
              type="password"
              name="password"
              placeholder="Nueva Contraseña"
              onChange={handleChange}
              value={datos.password}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <Form.Control
              style={{ width: "325px" }}
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Nueva Contraseña"
              onChange={handleChange}
              value={datos.confirmPassword}
              required
            />
            {datos.confirmPassword && !passwordsCoinciden && (
              <Form.Text className="text-danger d-block mt-1">
                Las contraseñas no coinciden.
              </Form.Text>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValido || loading}
          >
            {loading ? "Restableciendo..." : "Restablecer Contraseña"}
          </Button>
        </Form>
        <Form.Group>
          <hr />
          <Link to={"/login"}>
            <Button variant="outline-secondary">
              ← Regresar al Login
            </Button>
          </Link>
        </Form.Group>
      </div>
    </>
  );
}

export default RestablecerPassword;
