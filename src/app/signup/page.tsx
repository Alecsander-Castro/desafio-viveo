"use client";

import { Box, Container, Grid2 } from "@mui/material";
import Image from "next/image";
import heroLogin from "../../assets/mobile.svg";
import logo from "../../assets/viveo-logo.svg";
import Link from "next/link";
import SignupForms from "@/components/SignupForms/SignupForms";
export default function Signup() {
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
            <p className="text-base text-center md:text-start">
              Junte-se a nós e descubra soluções ágeis e inovadoras para o seu
              negócio!
            </p>
            <p className="text-xl my-5 font-semibold text-teal-800">
              Faça o seu cadastro
            </p>
            <SignupForms />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
