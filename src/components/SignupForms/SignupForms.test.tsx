import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForms from "./SignupForms";
import { createUser } from "@/utils/api";

jest.mock("../../utils/api", () => ({
  createUser: jest.fn().mockResolvedValue(true),
}));

describe("<SignupForms />", () => {
  it("should render Signup inputs", () => {
    render(<SignupForms />);

    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-re_password")).toBeInTheDocument();
  });

  it("should call createUser API and show success message on submit", async () => {
    const user = userEvent.setup();

    render(<SignupForms />);

    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Alec");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "alec@test.com"
    );
    await user.type(screen.getByLabelText("Senha"), "Alec@123");
    await user.type(screen.getByLabelText("Confirmar Senha"), "Alec@123");

    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        name: "Alec",
        email: "alec@test.com",
        password: "Alec@123",
        re_password: "Alec@123",
      });
    });

    expect(screen.getByTestId("snackbar")).toHaveTextContent(
      "Cadastro realizado com sucesso!"
    );
  });
});
