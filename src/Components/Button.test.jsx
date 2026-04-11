import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renderiza correctamente con texto', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('custom-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('llama a onClick cuando se hace click', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByTestId('custom-button');
    
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('está deshabilitado cuando disabled es true', () => {
    render(<Button disabled={true}>Click me</Button>);
    const button = screen.getByTestId('custom-button');
    
    expect(button).toBeDisabled();
  });

  it('no está deshabilitado por defecto', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('custom-button');
    
    expect(button).not.toBeDisabled();
  });

  it('no llama a onClick cuando está deshabilitado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled={true}>Click me</Button>);
    const button = screen.getByTestId('custom-button');
    
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
