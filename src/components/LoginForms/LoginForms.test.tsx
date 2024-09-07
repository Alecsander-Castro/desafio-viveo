import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForms from "./LoginForms";

jest.mock("../../utils/api", () => ({
  getUsers: jest
    .fn()
    .mockResolvedValueOnce([{ email: "alec@test.com", password: "Alec@123" }]),
}));
describe("<LoginForms />", () => {
  it("should render login inputs", () => {
    render(<LoginForms />);
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
  });

  it("should show success message when login is successful", async () => {
    const user = userEvent.setup();

    render(<LoginForms />);

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "alec@test.com"
    );
    await user.type(screen.getByLabelText("Senha"), "Alec@123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(screen.getByTestId("snackbar")).toHaveTextContent(
        "Login realizado com sucesso!"
      );
    });
  });
});
