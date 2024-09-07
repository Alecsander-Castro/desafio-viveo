import { render, screen } from "@testing-library/react";
import Login from "./page";

describe("<Login/>", () => {
  it("should be render login page", () => {
    render(<Login />);
    expect(screen.getByText(/Prazer, somos a Viveo/i)).toBeInTheDocument();
    expect(screen.getByText(/Faça o seu login/i)).toBeInTheDocument();
  });
});
