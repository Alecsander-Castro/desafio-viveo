import { Box } from "@mui/material";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viveo | Login",
  description: "Cuidamos de Cada Vida, Simple Assim!",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Box>{children}</Box>;
}
