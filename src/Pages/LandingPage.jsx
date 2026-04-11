import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('landing-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('landing-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('landing-theme', 'light');
    }
  };

  return (
    <div className={`landing-page ${darkMode ? 'dark-mode' : ''}`}>
      <nav className="landing-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h2>Sistema de Reservas</h2>
          </div>
          <div className="navbar-actions">
            <button 
              className="btn-theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button 
              className="btn-nav-login" 
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </button>
            <button 
              className="btn-nav-register" 
              onClick={() => navigate('/registro')}
            >
              Registrarse
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Gestiona tus Espacios y Materiales de Forma <span className="highlight">Simple y Eficiente</span>
          </h1>
          <p className="hero-subtitle">
            Reserva aulas, laboratorios, auditorios y materiales en segundos. 
            Sistema completo de gestión diseñado para instituciones educativas.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary-large" 
              onClick={() => navigate('/registro')}
            >
              Comenzar Ahora
            </button>
            <button 
              className="btn-secondary-large" 
              onClick={() => navigate('/login')}
            >
              Ya tengo cuenta
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <div className="card-icon">📅</div>
            <div className="card-text">Reservas en tiempo real</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🔬</div>
            <div className="card-text">Gestión de materiales</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">✅</div>
            <div className="card-text">Confirmación instantánea</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>¿Por qué usar nuestro sistema?</h2>
          <p>Todas las herramientas que necesitas en un solo lugar</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Reserva de Espacios</h3>
            <p>
              Reserva aulas, laboratorios de física y computación, y auditorios 
              con disponibilidad en tiempo real.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Gestión de Materiales</h3>
            <p>
              Solicita préstamos de equipos y materiales de forma rápida. 
              Controla inventarios y disponibilidad.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Múltiples Roles</h3>
            <p>
              Sistema adaptado para estudiantes, profesores, externos y laboristas 
              con permisos personalizados.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Calendario Inteligente</h3>
            <p>
              Visualiza la disponibilidad semanal, filtra por tipo de espacio 
              y encuentra el horario perfecto.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Sistema de Calificaciones</h3>
            <p>
              Califica tu experiencia y ayuda a mejorar el servicio. 
              Consulta comentarios de otros usuarios.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Gestión Completa</h3>
            <p>
              Revisa tus reservas activas, historial completo y recibe 
              notificaciones sobre el estado de tus solicitudes.
            </p>
          </div>
        </div>
      </section>


      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3 className="stat-number">4</h3>
            <p className="stat-label">Tipos de Espacios</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">Disponibilidad</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">100%</h3>
            <p className="stat-label">Digital</p>
          </div>
        </div>
      </section>


      <section className="how-it-works-section">
        <div className="section-header">
          <h2>¿Cómo funciona?</h2>
          <p>Proceso simple en 3 pasos</p>
        </div>
        
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Regístrate</h3>
            <p>Crea tu cuenta como estudiante, profesor o externo en segundos</p>
          </div>
          
          <div className="step-arrow">→</div>
          
          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Busca y Reserva</h3>
            <p>Explora espacios disponibles o materiales y realiza tu reserva</p>
          </div>
          
          <div className="step-arrow">→</div>
          
          <div className="step-item">
            <div className="step-number">3</div>
            <h3>Confirma y Disfruta</h3>
            <p>Recibe confirmación instantánea y utiliza el espacio o material</p>
          </div>
        </div>
      </section>

      <section className="user-types-section">
        <div className="section-header">
          <h2>Para todo tipo de usuarios</h2>
        </div>
        
        <div className="user-types-grid">
          <div className="user-type-card">
            <div className="user-type-icon">🎓</div>
            <h3>Estudiantes</h3>
            <p>Reserva espacios para estudiar, trabajar en grupos o realizar prácticas de laboratorio.</p>
          </div>
          
          <div className="user-type-card">
            <div className="user-type-icon">👨‍🏫</div>
            <h3>Profesores</h3>
            <p>Programa tus clases, solicita materiales didácticos y gestiona reservas prioritarias.</p>
          </div>
          
          <div className="user-type-card">
            <div className="user-type-icon">🏢</div>
            <h3>Externos</h3>
            <p>Accede a espacios institucionales para eventos, capacitaciones o reuniones.</p>
          </div>
          
          <div className="user-type-card">
            <div className="user-type-icon">🔧</div>
            <h3>Laboristas</h3>
            <p>Administra reservas, gestiona inventarios y supervisa el uso de espacios y materiales.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nuestra plataforma y simplifica la gestión de reservas</p>
          <button 
            className="btn-cta" 
            onClick={() => navigate('/registro')}
          >
            Crear Cuenta Gratis
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
