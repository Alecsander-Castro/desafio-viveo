import Image from "next/image";
import logoImage from "../assets/viveo-logo.svg";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { getUsers } from "@/utils/api";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center bg-teal-200">
      <Box className="flex items-center justify-center">
        <Image className="w-36" src={logoImage} alt="logo" />
      </Box>
      <Box className="flex items-center justify-center py-5 gap-3">
        <Button variant="contained" color="primary">
          <Link href={"/login"}>Login</Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link href={"/signup"}>Cadastro</Link>
        </Button>
      </Box>
    </main>
  );
}
