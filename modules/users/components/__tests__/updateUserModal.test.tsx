import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateUserModal from "../updateUserModal";
import { useUpdateUser } from "../../hooks/useUpdateUser";

// Mock do hook useUpdateUser
jest.mock("../../hooks/useUpdateUser");

const mockUseUpdateUser = useUpdateUser as jest.Mock;;

describe("UpdateUserModal", () => {
  const queryClient = new QueryClient();
  const defaultProps = {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    password: "senha123"
  };

  beforeEach(() => {
    mockUseUpdateUser.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: null,
      isSuccess: false
    });
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <NiceModal.Provider>
          <NiceModal.Provider>
            {NiceModal.show(UpdateUserModal, defaultProps)}
          </NiceModal.Provider>
        </NiceModal.Provider>
      </QueryClientProvider>
    );
  };

  it("deve renderizar o modal corretamente", async () => {
    renderComponent();

    expect(screen.getByText("Atualizar Usuário")).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toHaveValue(defaultProps.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(defaultProps.email);
    expect(screen.getByLabelText(/senha/i)).toHaveValue(defaultProps.password);
  });

  it("deve chamar mutate com os dados corretos ao submeter o formulário", async () => {
    const mutateMock = jest.fn();
    mockUseUpdateUser.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      error: null,
      isSuccess: false
    });

    renderComponent();

    const submitButton = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        userId: defaultProps.id,
        name: defaultProps.name,
        email: defaultProps.email,
        password: defaultProps.password
      });
    });
  });

  it("deve mostrar mensagem de erro quando houver erro na submissão", async () => {
    const errorMessage = "Erro ao atualizar usuário";
    mockUseUpdateUser.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: { message: errorMessage },
      isSuccess: false
    });

    renderComponent();

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("deve mostrar indicador de carregamento durante a submissão", async () => {
    mockUseUpdateUser.mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
      error: null,
      isSuccess: false
    });

    renderComponent();

    const submitButton = screen.getByRole("button", { name: /salvar/i });
    expect(submitButton).toBeDisabled();
  });

  it("deve fechar o modal após atualização bem-sucedida", async () => {
    mockUseUpdateUser.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: null,
      isSuccess: true
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText("Atualizar Usuário")).not.toBeInTheDocument();
    });
  });
}); 