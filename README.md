# Sistema de Gestión de Reservas - Frontend

Sistema web moderno para la gestión de reservas de espacios y materiales en instituciones educativas. Desarrollado con React y Vite, implementando patrones de diseño de software.

## Descripción del Proyecto

El Sistema de Gestión de Reservas es una aplicación web completa que permite a estudiantes, profesores, externos y laboristas gestionar de manera eficiente la reserva de espacios (aulas, laboratorios, auditorios) y materiales educativos.

### Características Principales

- **Gestión de Reservas de Espacios**: Reserva de aulas, laboratorios de física y computación, y auditorios en tiempo real
- **Gestión de Materiales**: Solicitud y administración de préstamos de equipos y materiales
- **Múltiples Roles de Usuario**:
  - **Estudiantes**: Reserva de espacios para estudio y prácticas
  - **Profesores**: Programación de clases y solicitud de materiales
  - **Externos**: Acceso a espacios para eventos y capacitaciones
  - **Laboristas**: Administración completa de reservas e inventarios
- **Calendario Inteligente**: Visualización de disponibilidad semanal con filtros por tipo de espacio
- **Sistema de Calificaciones**: Evaluación de experiencias y comentarios
- **Gestión de Perfil**: Información de usuario y historial de reservas
- **Recursos Externos**: Acceso a enlaces y recursos adicionales
- **Tema Claro/Oscuro**: Interfaz adaptable según preferencias del usuario

## Ejecucion

### Prerrequisitos

- **Node.js** (versión 16 o superior)
- **npm**

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/pulidxxx/Sistema-de-gestion-de-reserva-frontend.git
cd Sistema-de-gestion-de-reserva-frontend
```

2. Instala las dependencias:

```bash
npm install
```

### Configuración

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
VITE_API_BASE_URL="https://www.reservaspro.xyz"
```

Ajusta la URL según la configuración de tu backend.

### Ejecutar el Proyecto

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Ejecutar Tests

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar tests una vez
npm run test:run

# Generar reporte de cobertura
npm run test:coverage
```

## 🛠️ Tecnologías Utilizadas

### Frontend Framework

- **React 18.2**: Biblioteca de UI
- **Vite 4.4**: Build tool y dev server

### UI y Estilos

- **React Bootstrap 2.9**: Componentes UI
- **Bootstrap 5.3**: Framework CSS
- **FontAwesome**: Iconografía

### Enrutamiento y Estado

- **React Router DOM 6.16**: Navegación SPA
- **React Select 5.10**: Selectores avanzados

### Utilidades

- **Axios 1.9**: Cliente HTTP
- **date-fns 4.1**: Manipulación de fechas
- **Day.js 1.11**: Librería de fechas ligera

### Testing

- **Vitest 0.34**: Framework de testing
- **Testing Library**: Testing de componentes React
- **jsdom**: Simulación de DOM para tests

## Estructura del Proyecto

```
src/
├── Classes/              # Implementación de patrones de diseño
│   ├── Adapter/         # Patrón Adapter
│   ├── Builder/         # Patrón Builder
│   ├── Estados/         # Patrón State
│   ├── Header/          # Header con Strategy
│   └── MetodoFabrica/   # Patrón Factory Method
├── Components/          # Componentes reutilizables
├── Pages/              # Páginas de la aplicación
├── Styles/             # Archivos CSS
├── Utils/              # Utilidades y contextos
├── hooks/              # Custom React hooks
└── types/              # Definiciones TypeScript
```
