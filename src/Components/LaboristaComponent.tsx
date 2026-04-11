import { useState, useEffect } from 'react';
import '../Styles/ClienteProfile.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Iconos SVG
const UserIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Botón personalizado
const Button = ({ children, onClick, className = '' }) => (
  <button onClick={onClick} className={`btn ${className}`}>
    {children}
  </button>
);

// Card personalizados
const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

export default function LaboristaProfile() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const email = localStorage.getItem('email');
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    if (email) {
      obtenerUsuario(email);
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentDate(today.toLocaleDateString('es-ES', options));
  }, []);

  const obtenerUsuario = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/consultarEmail/${email}`);
      if (!response.ok) throw new Error('Error al obtener usuario');
      const json = await response.json();
      setUsuario(json);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Hero Card con perfil */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient background */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background:
              'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        ></div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          {/* Avatar con gradiente */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
              transform: 'rotate(-5deg)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-5deg) scale(1)')}
          >
            <svg
              style={{ width: '60px', height: '60px', color: '#fff' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Info del usuario */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px',
                flexWrap: 'wrap',
              }}
            >
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2d3748',
                  margin: 0,
                }}
              >
                {usuario ? usuario.nombre : 'Cargando...'}
              </h1>
              <span
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                ● Activo
              </span>
            </div>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#667eea',
                fontWeight: '600',
                margin: '0 0 15px 0',
              }}
            >
              {usuario ? usuario.tipo : ''}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#718096',
                fontSize: '0.95rem',
              }}
            >
              <svg
                style={{ width: '18px', height: '18px' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span style={{ wordBreak: 'break-word' }}>{usuario ? usuario.email : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de acciones rápidas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        {/* Card de Gestión de Reservas */}
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '25px',
            padding: '30px',
            color: '#fff',
            boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📅</div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '10px',
              }}
            >
              Gestionar Reservas
            </h3>
            <p
              style={{
                opacity: 0.9,
                fontSize: '0.9rem',
                lineHeight: '1.6',
              }}
            >
              Administra y modifica las reservas de espacios.
            </p>
          </div>
          <button
            onClick={() => navigate('/laborista/gestionReservas')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#fff',
              padding: '12px 25px',
              borderRadius: '15px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>Ir a Reservas</span>
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        </div>

        {/* Card de Gestión de Materiales */}
        <div
          style={{
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            borderRadius: '25px',
            padding: '30px',
            color: '#fff',
            boxShadow: '0 15px 40px rgba(17, 153, 142, 0.4)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📦</div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '10px',
              }}
            >
              Gestionar Materiales
            </h3>
            <p
              style={{
                opacity: 0.9,
                fontSize: '0.9rem',
                lineHeight: '1.6',
              }}
            >
              Administra el inventario y materiales disponibles.
            </p>
          </div>
          <button
            onClick={() => navigate('/laborista/gestionMateriales')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#fff',
              padding: '12px 25px',
              borderRadius: '15px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>Ir a Materiales</span>
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        </div>

        {/* Card de Fecha */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '15px',
              background:
                'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px',
            }}
          >
            <svg
              style={{ width: '28px', height: '28px', color: '#667eea' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3
            style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#667eea',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px',
            }}
          >
            Fecha Actual
          </h3>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#2d3748',
              fontWeight: '600',
              margin: 0,
              textTransform: 'capitalize',
            }}
          >
            {currentDate}
          </p>
        </div>
      </div>

      {/* Panel informativo */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h3
          style={{
            fontSize: '1.3rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>👋</span>
          Bienvenido al Panel de Administración
        </h3>
        <p
          style={{
            color: '#4a5568',
            fontSize: '1rem',
            lineHeight: '1.7',
            margin: 0,
          }}
        >
          Desde este panel puedes gestionar todas las operaciones del sistema. Utiliza las tarjetas
          superiores para acceder rápidamente a las funciones principales.
        </p>
      </div>
    </div>
  );
}
