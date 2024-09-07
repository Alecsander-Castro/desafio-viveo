import { Box, Container, Grid2 } from "@mui/material";
import Image from "next/image";
import heroLogin from "../../assets/hero-login.svg";
import logo from "../../assets/viveo-logo.svg";
import LoginForms from "@/components/LoginForms/LoginForms";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Grid2 container>
        <Grid2
          sx={{
            backgroundColor: "#6ee1dc",
            display: { xs: "none", md: "block" },
          }}
          size={{ xs: 12, md: 6 }}
        >
          <Image
            className="md:h-screen"
            src={heroLogin}
            alt="imagem principal de login"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box className=" flex flex-col items-center justify-center h-screen md:h-auto md:justify-normal md:mt-40">
            <Box className="mb-10">
              <Link href={"/"}>
                <Image src={logo} alt="logo" width={200} />
              </Link>
            </Box>
            <h1 className="text-xl pb-10">Prazer, somos a Viveo</h1>
            <p className="text-base text-center md:text-start">
              Somos um ecossistema de produtos e serviços, oferecendo soluções
              ágeis, confiáveis e inovadoras ao setor.
            </p>
            <p className="text-xl my-5 font-semibold text-teal-800">
              Faça o seu login
            </p>
            <LoginForms />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
