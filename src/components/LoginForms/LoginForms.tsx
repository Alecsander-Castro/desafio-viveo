"use client";

import { getUsers } from "@/utils/api";
import { Alert, Box, Container, Snackbar, TextField } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { useState } from "react";
import { Cached } from "@mui/icons-material";

interface ILoginCredentials {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("Digite seu e-mail"),
  password: yup.string().required("Digite sua senha"),
});

export default function LoginForms() {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const handleSubmit = async (values: ILoginCredentials) => {
    setLoading(true);
    await sleep(500);
    const users = await getUsers();
    const user = users.filter(
      (user: ILoginCredentials) =>
        user.email === values.email && user.password === values.password
    );
    if (!user.length) {
      setLoading(false);
      setSnackbarSeverity("error");
      setSnackbarMessage("E-mail ou senha incorretos");
      setOpenSnackbar(true);
    } else {
      setLoading(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Login realizado com sucesso!");
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
              variant="outlined"
              fullWidth
              data-testid="input-email"
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
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              data-testid="input-password"
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
            <Box className="flex flex-col justify-center items-center md:flex-row-reverse md:justify-around">
              {loading && (
                <button
                  type="submit"
                  className="bg-teal-600 shadow-xl p-4 mt-4 rounded-full w-32 text-white hover:bg-teal-800 duration-300"
                >
                  <Cached className="animate-spin" />
                </button>
              )}
              {!loading && (
                <button
                  type="submit"
                  className="bg-teal-600 shadow-xl p-4 mt-4 rounded-full w-32 text-white hover:bg-teal-800 duration-300"
                >
                  Entrar
                </button>
              )}
              <Link
                className="text-sm mt-3 hover:underline duration-300"
                href="#"
              >
                Esqueceu sua senha?
              </Link>
            </Box>
            <Box className="text-center mt-5">
              <Link className="text-sm " href={"/signup"}>
                Não possui uma conta?{" "}
                <span className="underline">Cadastre-se!</span>{" "}
              </Link>
            </Box>
          </Form>
        )}
      </Formik>

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
    </Container>
  );
}
