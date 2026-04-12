import React, { useState, useMemo, useEffect } from 'react';
import { useEspacios } from '../hooks/useEspacios';
import { FiltrosReserva } from '../types/reserva.types';
import './FiltroReservas.css';
import { API_BASE_URL } from "../Utils/apiBaseUrl";
import { useGeneral } from "../Utils/GeneralContext";

interface Props {
  onSelectEspacio: (espacioId: string | null, espacioNombre?: string) => void;
  onFiltrosChange?: (filtros: FiltrosReserva) => void;
}

const FiltroReservas: React.FC<Props> = ({ onSelectEspacio, onFiltrosChange }) => {
  const { userEmail, userType, fetchUserByEmail } = useGeneral();
  const [tipoUsuario, setTipoUsuario] = useState(userType || '');
  const [filtros, setFiltros] = useState<FiltrosReserva>({});
  const [selectedEspacio, setSelectedEspacio] = useState<string>('');

  const { espacios, loading, error } = useEspacios();

  const espaciosFiltrados = useMemo(() => {
    if (!filtros.tipoEspacio) {
      return tipoUsuario === 'Profesor' ? espacios : espacios;
    }
    return espacios.filter((espacio) => espacio.tipo === filtros.tipoEspacio);
  }, [espacios, filtros.tipoEspacio, tipoUsuario]);

  const handleFiltroChange = (campo: string, valor: any) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };
    setFiltros(nuevosFiltros);
    onFiltrosChange?.(nuevosFiltros);
    onSelectEspacio(null, '');
    setSelectedEspacio('');
  };

  const handleEspacioChange = (espacioId: string) => {
    setSelectedEspacio(espacioId);
    if (!espacioId) {
      onSelectEspacio(null, '');
      return;
    }

    const espacioSeleccionado = espacios.find((e) => e.id.toString() === espacioId);
    onSelectEspacio(espacioId, espacioSeleccionado?.nombre || '');
  };

  const limpiarFiltros = () => {
    setFiltros({});
    setSelectedEspacio('');
    onSelectEspacio(null, '');
    onFiltrosChange?.({});
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserByEmail(userEmail)
        .then((user) => setTipoUsuario(user?.tipo || ''))
        .catch((error) => console.error('Error al obtener usuario:', error));
    }
  }, [userEmail, fetchUserByEmail]);

  const tiposEspacio = [
    { value: 'Aula', label: 'Aula', icon: 'fa-chalkboard' },
    { value: 'Laboratorio de Computación', label: 'Lab. Computación', icon: 'fa-laptop-code' },
    { value: 'Laboratorio de Física', label: 'Lab. Física', icon: 'fa-flask' },
    ...(tipoUsuario === 'Profesor'
      ? [{ value: 'Auditorio', label: 'Auditorio', icon: 'fa-users' }]
      : []),
  ];

  return (
    <div className="filtro-reservas">
      <div className="filtro-header">
        <div className="filtro-title">
          <i className="fas fa-search filtro-icon"></i>
          <h3>Buscar Espacios</h3>
        </div>
        <div className="filtro-subtitle">Encuentra el espacio perfecto para tu reserva</div>
      </div>

      <div className="filtro-content">
        {/* Filtro por tipo de espacio */}
        <div className="filter-group">
          <label className="filter-label">
            <i className="fas fa-building filter-label-icon"></i>
            Tipo de Espacio
          </label>
          <div className="filter-options">
            <button
              type="button"
              className={`filter-option ${!filtros.tipoEspacio ? 'active' : ''}`}
              onClick={() => handleFiltroChange('tipoEspacio', undefined)}
            >
              <i className="fas fa-star filter-option-icon"></i>
              <span>Todos</span>
            </button>
            {tiposEspacio.map((tipo) => (
              <button
                key={tipo.value}
                type="button"
                className={`filter-option ${filtros.tipoEspacio === tipo.value ? 'active' : ''}`}
                onClick={() => handleFiltroChange('tipoEspacio', tipo.value)}
              >
                <i className={`fas ${tipo.icon} filter-option-icon`}></i>
                <span>{tipo.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selección de espacio */}
        <div className="filter-group">
          <label className="filter-label">
            <i className="fas fa-map-marker-alt filter-label-icon"></i>
            Seleccionar Espacio
          </label>

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Cargando espacios...</span>
            </div>
          )}

          {error && (
            <div className="error-state">
              <i className="fas fa-exclamation-triangle error-icon"></i>
              <span>Error cargando espacios</span>
            </div>
          )}

          {!loading && !error && (
            <div className="select-wrapper">
              <select
                className="modern-select"
                value={selectedEspacio}
                onChange={(e) => handleEspacioChange(e.target.value)}
              >
                <option value="">Seleccione un espacio</option>
                {espaciosFiltrados.map((espacio) => (
                  <option key={espacio.id} value={espacio.id}>
                    {espacio.nombre} - {espacio.tipo} (Cap: {espacio.capacidad})
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          )}
        </div>

        {/* Información del espacio seleccionado */}
        {selectedEspacio && (
          <div className="selected-space-info">
            {(() => {
              const espacio = espacios.find((e) => e.id.toString() === selectedEspacio);
              return espacio ? (
                <div className="space-card">
                  <div className="space-header">
                    <i className="fas fa-door-open space-icon"></i>
                    <div className="space-details">
                      <h4>{espacio.nombre}</h4>
                      <p>{espacio.tipo}</p>
                    </div>
                  </div>
                  <div className="space-capacity">
                    <i className="fas fa-users capacity-icon"></i>
                    <span>Capacidad: {espacio.capacidad} personas</span>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {/* Acciones */}
        <div className="filter-actions">
          <button
            type="button"
            className="clear-filters-btn"
            onClick={limpiarFiltros}
            disabled={loading}
          >
            <i className="fas fa-redo-alt btn-icon"></i>
            <span>Limpiar Filtros</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltroReservas;
