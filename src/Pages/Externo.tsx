import React, { useEffect, useState } from 'react';

interface ResourceType {
  id: number;
  name: string;
  description: string;
}

interface Resource {
  id: number;
  name: string;
  photoUrl: string;
  features: {
    [key: string]: string;
  };
  isActive: boolean;
  type: ResourceType;
}

interface IntegrationResponse {
  success: boolean;
  message: string;
  data: {
    unit: {
      id: number;
      name: string;
      description: string;
    };
    resources: Resource[];
    summary: {
      totalResourceTypes: number;
      totalResources: number;
      lastUpdated: string;
    };
  };
}

const Externo: React.FC = () => {
  const [mensaje, setMensaje] = useState('');
  const [recursos, setRecursos] = useState<Resource[]>([]);
  const [recursosObtenidos, setRecursosObtenidos] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [unidadInfo, setUnidadInfo] = useState<{ name: string; description: string } | null>(null);

  const fetchRecursos = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        'https://integraservicios-backend.onrender.com/api/public/integration/resources',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener los recursos externos');
      }

      const json: IntegrationResponse = await response.json();
      console.log('Recursos externos:', json);

      if (json.success && json.data.resources) {
        setRecursos(json.data.resources);
        setUnidadInfo({
          name: json.data.unit.name,
          description: json.data.unit.description,
        });
        setRecursosObtenidos(true);
        setMensaje(`${json.data.summary.totalResources} recursos externos obtenidos exitosamente.`);
      } else {
        throw new Error('No se pudieron obtener los recursos');
      }
    } catch (error) {
      setMensaje(`Error: ${error instanceof Error ? error.message : String(error)}`);
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchRecursos();
  }, []);

  const handleReservar = () => {
    window.open('https://integra-servicios.vercel.app/', '_blank');
  };

  return (
    <div
      style={{
        maxWidth: '100%',
        padding: '20px',
        minHeight: '70vh',
        background: 'transparent',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '15px',
          }}
        >
          Recursos Externos
        </h1>

        {unidadInfo && (
          <>
            <h4
              style={{
                color: '#fff',
                textTransform: 'capitalize',
                fontSize: '1.3rem',
                fontWeight: '500',
                marginBottom: '10px',
              }}
            >
              {unidadInfo.name}
            </h4>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1rem',
                maxWidth: '700px',
                margin: '0 auto',
              }}
            >
              {unidadInfo.description}
            </p>
          </>
        )}
      </div>

      {mensaje && (
        <div
          style={{
            display: 'block',
            margin: '0 auto 30px',
            padding: '18px 25px',
            maxWidth: '650px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#667eea',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '500',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          {mensaje}
        </div>
      )}

      {cargando && (
        <div className="text-center mt-5">
          <div
            className="spinner-border"
            style={{
              color: '#fff',
              width: '3rem',
              height: '3rem',
            }}
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p
            className="mt-3"
            style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: '500',
            }}
          >
            Obteniendo recursos externos...
          </p>
        </div>
      )}

      {recursosObtenidos && !cargando && (
        <>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '35px',
            }}
          >
            <h3
              style={{
                color: '#fff',
                fontSize: '1.8rem',
                fontWeight: '600',
                display: 'inline-block',
                padding: '10px 30px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {recursos.length} Espacios Disponibles
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '25px',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 10px',
            }}
          >
            {recursos.map((recurso: Resource, index: number) => (
              <div
                key={recurso.id}
                style={{
                  position: 'relative',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                {/* Status Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    zIndex: 10,
                    padding: '8px 15px',
                    borderRadius: '25px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: recurso.isActive
                      ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                      : 'linear-gradient(135deg, #868f96 0%, #596164 100%)',
                    color: '#fff',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {recurso.isActive ? '● ACTIVO' : '○ INACTIVO'}
                </div>

                {/* Image Section */}
                {recurso.photoUrl && (
                  <div
                    style={{
                      height: '200px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={recurso.photoUrl}
                      alt={recurso.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '60%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                      }}
                    ></div>
                  </div>
                )}

                {/* Content Section */}
                <div style={{ padding: '20px' }}>
                  <h4
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#2d3748',
                      marginBottom: '12px',
                      lineHeight: '1.3',
                    }}
                  >
                    {recurso.name}
                  </h4>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '15px',
                      padding: '10px',
                      background:
                        'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                      borderRadius: '10px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: '#667eea',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Tipo de Recurso
                      </div>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          color: '#4a5568',
                          fontWeight: '500',
                        }}
                      >
                        {recurso.type.description}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  {Object.keys(recurso.features).length > 0 && (
                    <div style={{ marginTop: '15px' }}>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          color: '#667eea',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          marginBottom: '10px',
                        }}
                      >
                        Características
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '8px',
                        }}
                      >
                        {Object.entries(recurso.features)
                          .slice(0, 4)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              style={{
                                padding: '8px',
                                background: 'rgba(102, 126, 234, 0.05)',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                border: '1px solid rgba(102, 126, 234, 0.1)',
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: '600',
                                  color: '#667eea',
                                  fontSize: '0.7rem',
                                  marginBottom: '2px',
                                }}
                              >
                                {key}
                              </div>
                              <div
                                style={{
                                  color: '#4a5568',
                                  fontWeight: '500',
                                }}
                              >
                                {value}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center" style={{ marginTop: '60px', marginBottom: '40px' }}>
            <button
              onClick={handleReservar}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                padding: '18px 50px',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#fff',
                borderRadius: '50px',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.5)';
              }}
            >
              Reservar Ahora
            </button>
            <p
              style={{
                marginTop: '15px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
              }}
            >
              Accede a la plataforma externa para gestionar tu reserva
            </p>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Externo;
