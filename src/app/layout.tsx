import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viveo | Cuidamos de Cada Vida, Simple Assim!",
  description: "Cuidamos de Cada Vida, Simple Assim!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
