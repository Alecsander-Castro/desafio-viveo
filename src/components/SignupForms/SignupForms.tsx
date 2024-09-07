"use client";

import {
  Alert,
  Box,
  Container,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Link from "next/link";
import { createUser } from "@/utils/api";

const TextForm = styled(Field)({
  display: "block",
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("invalid email").required("Email obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Sua senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial"
    ),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não são iguais")
    .required("Por favor, digite novamente sua senha"),
});

export default function SignupForms() {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));
  const handleSubmit = async (values: any) => {
    setLoading(true);
    await sleep(500);
    const response = await createUser(values);
    if (response) {
      setLoading(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Cadastro realizado com sucesso!");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <TextField
              data-testid="input-name"
              fullWidth
              color="success"
              id="name"
              name="name"
              value={formik.values.name}
              label="Nome"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              data-testid="input-email"
              sx={{ mt: 2 }}
              fullWidth
              color="success"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              data-testid="input-password"
              sx={{ mt: 2 }}
              fullWidth
              color="success"
              id="password"
              name="password"
              label="Senha"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              data-testid="input-re_password"
              sx={{ mt: 2 }}
              fullWidth
              color="success"
              id="re_password"
              name="re_password"
              label="Confirmar Senha"
              type="password"
              value={formik.values.re_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.re_password && Boolean(formik.errors.re_password)
              }
              helperText={
                formik.touched.re_password && formik.errors.re_password
              }
            />
            <Box className="flex flex-col justify-center items-center md:flex-row-reverse md:justify-around">
              {loading && (
                <button
                  data-testid="submit-button"
                  type="submit"
                  className="bg-teal-600 shadow-xl p-4 mt-4 rounded-full w-32 text-white hover:bg-teal-800 duration-300"
                >
                  <CachedIcon className="animate-spin" />
                </button>
              )}
              {!loading && (
                <button
                  data-testid="submit-button"
                  type="submit"
                  className="bg-teal-600 shadow-xl p-4 mt-4 rounded-full w-32 text-white hover:bg-teal-800 duration-300"
                >
                  Cadastrar
                </button>
              )}
            </Box>
            <Box className="text-center mt-5">
              <Link className="text-sm " href={"/login"}>
                Já possui uma conta?
                <span className="underline">Faça o login</span>{" "}
              </Link>
            </Box>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                data-testid="snackbar"
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
