import { describe, test, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../Pages/Login";
import { BrowserRouter } from "react-router-dom";

// Mock del contexto useGeneral
vi.mock("../Utils/GeneralContext", () => ({
  useGeneral: () => ({
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
  }),
}));

describe("Pruebas unitarias", () => {
  beforeEach(() => {
    // Mock de matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Renderizar el componente antes de cada test
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  // -------------------------- PRUEBA 1 ----------------------------
  test("Deben cargar los inputs ", () => {
    expect(screen.getByTestId("Correo")).toBeDefined();
    expect(screen.getByTestId("Contraseña")).toBeDefined();
    expect(screen.getByTestId("Tipo de registro")).toBeDefined();
  });

  // -------------------------- PRUEBA 2 ----------------------------
  test("El correo debe ser menor a 45 caracteres", async () => {
    // Completa el formulario de login
    fireEvent.change(screen.getByTestId("Correo"), {
      target: { value: "1234567890123456789012345678901234@example.com" },
    });
    fireEvent.change(screen.getByTestId("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByTestId("Tipo de registro"), {
      target: { value: "Cliente" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByText("Iniciar sesión"));

    // Espera a que se complete el envio
    await screen.findByText("El correo es mayor a 45 caracteres");

    // Verifica que el usuario se haya registrado correctamente
    expect(
      screen.getByText("El correo es mayor a 45 caracteres")
    ).toBeDefined();
  });

  // -------------------------- PRUEBA 3 ----------------------------
  test("La contraseña debe ser menor a 45 caracteres", async () => {
    // Completa el formulario de login
    fireEvent.change(screen.getByTestId("Correo"), {
      target: { value: "juanperez@example.com" },
    });
    fireEvent.change(screen.getByTestId("Contraseña"), {
      target: { value: "1234567890123456789012345678901234567890123456" },
    });
    fireEvent.change(screen.getByTestId("Tipo de registro"), {
      target: { value: "Cliente" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByText("Iniciar sesión"));

    // Espera a que se complete el envio
    await screen.findByText("La contraseña es mayor a 45 caracteres");

    // Verifica que el usuario se haya registrado correctamente
    expect(
      screen.getByText("La contraseña es mayor a 45 caracteres")
    ).toBeDefined();
  });
});

describe("Pruebas de integracion", () => {
  beforeEach(() => {
    // Mock de matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Renderizar el componente antes de cada test
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  // -------------------------- PRUEBA 4 ----------------------------
  test("Deben cargar los componentes ", () => {
    expect(screen.getByTestId("Header")).toBeDefined();
    expect(screen.getByTestId("Form")).toBeDefined();
  });

  // -------------------------- PRUEBA 5 ----------------------------
  test("El correo es incorrecto", async () => {
    // Completa el formulario de login
    fireEvent.change(screen.getByTestId("Correo"), {
      target: { value: "noexiste@example.com" },
    });
    fireEvent.change(screen.getByTestId("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByTestId("Tipo de registro"), {
      target: { value: "Cliente" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByText("Iniciar sesión"));

    // Espera a que se complete el registro
    await screen.findByText("Correo o contraseña incorrectos");

    // Verifica que el usuario se haya registrado correctamente
    expect(screen.getByText("Correo o contraseña incorrectos")).toBeDefined();
  });

  // // -------------------------- PRUEBA 6 ----------------------------
  // test("La contraseña es incorrecta", async () => {
  //   // Completa el formulario de login
  //   fireEvent.change(screen.getByTestId("Correo"), {
  //     target: { value: "juanperez@example.com" },
  //   });
  //   fireEvent.change(screen.getByTestId("Contraseña"), {
  //     target: { value: "contraseniaIncorrecta" },
  //   });
  //   fireEvent.change(screen.getByTestId("Tipo de registro"), {
  //     target: { value: "Cliente" },
  //   });

  //   // Envía el formulario
  //   fireEvent.click(screen.getByText("Iniciar sesión"));

  //   // Espera a que se complete el registro
  //   await screen.findByText("Cotraseña incorrecta");

  //   // Verifica que el usuario se haya registrado correctamente
  //   expect(screen.getByText("Cotraseña incorrecta")).toBeDefined();
  // });

});
