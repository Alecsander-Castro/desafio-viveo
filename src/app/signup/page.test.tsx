import { render, screen } from "@testing-library/react";
import Signup from "./page";

describe("<Signup/>", () => {
  it("should be render signup page", () => {
    render(<Signup />);
    expect(
      screen.getByText(
        /Junte-se a nós e descubra soluções ágeis e inovadoras para o seu negócio!/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Faça o seu cadastro/i)).toBeInTheDocument();
  });
});
