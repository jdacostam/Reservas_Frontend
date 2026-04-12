import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row, Modal } from "react-bootstrap";
import Contenedor from "./Contenedor";
import ComponenteReserva from "../../Components/ComponenteReserva";
import { useGeneral } from "../../Utils/GeneralContext";
import "/src/Styles/Contenedor.css";
import { API_BASE_URL } from "../../Utils/apiBaseUrl";

class ContenedorReservas extends Contenedor {
    render(): JSX.Element {
        const [reservas, setReservas] = useState<any[]>([]);
        const [handleShow, setTipoReserva] = useState<any>(null);
        const { userEmail } = useGeneral();
        const [feedback, setFeedback] = useState<{ type: "success" | "danger"; text: string } | null>(null);
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [reservaEliminar, setReservaEliminar] = useState<any>(null);

        useEffect(() => {
            if (userEmail) {
                obtenerReservasPorEmail(userEmail);
            }
        }, [userEmail]);

        const obtenerReservasPorEmail = async (email: string) => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/reservas/byEmail/${email}`
                );
                if (!response.ok) throw new Error("Error al obtener reservas");
                const json = await response.json();
                setReservas(json);
            } catch (error) {
                console.error("Error al obtener reservas:", error);
            }
        };

        const confirmarEliminarReserva = async () => {
            if (!reservaEliminar) return;
            try {
                const response = await fetch(
                    `${API_BASE_URL}/reservas/eliminar/${reservaEliminar.id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok)
                    throw new Error("Error al eliminar la reserva");

                setReservas((prev) => prev.filter((r) => r.id !== reservaEliminar.id));
                setFeedback({ type: "success", text: "Reserva eliminada correctamente." });
                setShowDeleteModal(false);
                setReservaEliminar(null);
            } catch (error) {
                console.error("Error al eliminar la reserva:", error);
                setFeedback({ type: "danger", text: "No fue posible eliminar la reserva." });
            }
        };

        //CALIFICAR
        const [show, setShow] = useState(false);
        const [showCalificacion, setShowCalificacion] = useState(false);
        const handleCloseCalificar = () => setShow(false);

        const [reserva, setReserva] = useState<any>(null);
        const handleShowCalificar = (reserva: any) => {
            setShow(true);
            setReserva(reserva);
        };
        const handleCloseCalificacion = () => setShowCalificacion(false);
        const handleShowCalificacion = (reserva: any) => {
            setShowCalificacion(true);
            setReserva(reserva);
        };
        const [calificacion, setCalificacion] = useState<number | null>(null);
        const [comentario, setComentario] = useState<string>("");

        const handleCalificar = async (reserva: any, calificacion: number | null, comentario: string) => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/reservas/calificar/${reserva.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            calificacion,
                            comentario,
                        }),
                    }
                );
                if (!response.ok)
                    throw new Error("Error al calificar el espacio");

                // Actualiza la tarjeta para cambiar de "Calificar" a "Mostrar calificación" sin recargar.
                setReservas((prev) =>
                    prev.map((item) =>
                        item.id === reserva.id ? { ...item, calificacion, comentario } : item
                    )
                );
                setReserva((prev: any) => {
                    if (!prev) return null;
                    return { ...prev, calificacion, comentario };
                });
                setFeedback({ type: "success", text: "Calificación guardada correctamente." });
            } catch (error) {
                console.error("Error al calificar el espacio:", error);
                setFeedback({ type: "danger", text: "No fue posible guardar la calificación." });
            }
        };

        return (
            <>
                <div className="align-self-start ps-5 pt-5 mb-3">
                    <h3 data-testid="Espacios para reservar">
                        Tus espacios reservados:
                    </h3>
                </div>
                {feedback && (
                    <div className="px-5">
                        <Alert variant={feedback.type} dismissible onClose={() => setFeedback(null)}>
                            {feedback.text}
                        </Alert>
                    </div>
                )}
                <Row
                    className="align-items-center"
                    onClick={() => {
                        setTipoReserva("espacio");
                    }}
                >
                    {reservas.length > 0 ? (
                        reservas.map((reserva, index) => (
                            <Col
                                key={index}
                                xs="12"
                                sm="6"
                                md="4"
                                lg="3"
                                className="text-center mt-3"
                            >
                                <div onClick={() => handleShow(reserva)}>
                                    <ComponenteReserva
                                        nombre={
                                            reserva.calendario.espacio.nombre
                                        }
                                        tipo={reserva.calendario.espacio.tipo}
                                        capacidad={
                                            reserva.calendario.espacio.capacidad
                                        }
                                        descripcion={
                                            reserva.calendario.espacio
                                                .descripcion
                                        }
                                        cantidad={reserva.calendario.capacidad}
                                        disponible={reserva.estado}
                                        fecha={reserva.calendario.fecha}
                                        horaInicio={
                                            reserva.calendario.horaInicio
                                        }
                                        horaFin={reserva.calendario.horaFin}
                                    />
                                </div>
                                {reserva.estado === "pendiente" && (
                                    <Button
                                        variant="danger"
                                        className="mt-2"
                                        onClick={() => {
                                            setReservaEliminar(reserva);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                )}
                                {reserva.estado === "completada" &&
                                    reserva.calificacion === null && (
                                        <Button
                                            variant="primary"
                                            className="mt-2"
                                            onClick={() =>
                                                handleShowCalificar(reserva)
                                            }
                                        >
                                            Calificar
                                        </Button>
                                    )}
                                {reserva.calificacion !== null && (
                                    <Button
                                        variant="secondary"
                                        className="mt-2"
                                        onClick={() =>
                                            handleShowCalificacion(reserva)
                                        }
                                    >
                                        Mostrar calificación
                                    </Button>
                                )}
                            </Col>
                        ))
                    ) : (
                        <p className="h4 sub">No tienes espacios reservados</p>
                    )}
                </Row>

                <Modal show={show} onHide={handleCloseCalificar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Calificar Espacio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            ¿Cómo calificarías el espacio{" "}
                            <strong>
                                {reserva?.calendario?.espacio?.nombre ||
                                    "Desconocido"}
                            </strong>
                            -
                            <strong>
                                {reserva?.calendario?.espacio?.tipo ||
                                    "Desconocido"}
                            </strong>
                            ?
                        </p>

                        <div className="mb-3">
                            <label
                                htmlFor="calificacion"
                                className="form-label"
                            >
                                Calificación
                            </label>
                            <select
                                id="calificacion"
                                className="form-select"
                                value={calificacion ?? ""}
                                onChange={(e) =>
                                    setCalificacion(Number(e.target.value))
                                }
                            >
                                <option value="" disabled>
                                    Selecciona una calificación
                                </option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="comentario" className="form-label">
                                Comentario
                            </label>
                            <textarea
                                id="comentario"
                                className="form-control"
                                rows={3}
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                placeholder="Escribe un comentario breve..."
                            ></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                handleCloseCalificar();
                                setCalificacion(null);
                                setComentario("");
                            }}
                        >
                            Cerrar
                        </Button>
                        <Button
                            variant="primary"
                            onClick={async () => {
                                if (calificacion === null) {
                                    setFeedback({ type: "danger", text: "Selecciona una calificación antes de continuar." });
                                    return;
                                }
                                await handleCalificar(reserva, calificacion, comentario);
                                handleCloseCalificar();
                                setCalificacion(null);
                                setComentario("");
                            }}
                        >
                            Calificar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showCalificacion} onHide={handleCloseCalificacion}>
                    <Modal.Header closeButton>
                        <Modal.Title>Calificación del Espacio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Espacio:{" "}
                            <strong>
                                {reserva?.calendario?.espacio?.nombre ||
                                    "Desconocido"}
                            </strong>{" "}
                            -
                            <strong>
                                {reserva?.calendario?.espacio?.tipo ||
                                    "Desconocido"}
                            </strong>
                        </p>
                        <p>
                            Calificación:{" "}
                            {reserva?.calificacion || "No calificado"}
                        </p>
                        <p>
                            Comentario:{" "}
                            {reserva?.comentario ||
                                "No hay comentario disponible"}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseCalificacion}
                        >
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cancelar reserva</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que quieres eliminar la reserva del espacio {" "}
                        <strong>{reservaEliminar?.calendario?.espacio?.nombre || "seleccionado"}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Volver
                        </Button>
                        <Button variant="danger" onClick={confirmarEliminarReserva}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ContenedorReservas;
