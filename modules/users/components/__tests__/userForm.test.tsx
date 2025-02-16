import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import UserForm from '../userForm';

describe('UserForm', () => {
  const renderComponent = () => {
    const form = useForm({
      defaultValues: {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123'
      }
    });

    return render(<UserForm form={form} />);
  };

  it('deve renderizar os campos do formulário corretamente', () => {
    renderComponent();

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('deve mostrar os valores padrão nos campos', () => {
    renderComponent();

    expect(screen.getByLabelText(/nome/i)).toHaveValue('João Silva');
    expect(screen.getByLabelText(/email/i)).toHaveValue('joao@example.com');
    expect(screen.getByLabelText(/senha/i)).toHaveValue('senha123');
  });

  it('deve permitir a edição dos campos', () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(nameInput, { target: { value: 'Maria Silva' } });
    fireEvent.change(emailInput, { target: { value: 'maria@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'novasenha123' } });

    expect(nameInput).toHaveValue('Maria Silva');
    expect(emailInput).toHaveValue('maria@example.com');
    expect(passwordInput).toHaveValue('novasenha123');
  });
}); 