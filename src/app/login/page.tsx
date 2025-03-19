"use client"
import { overriddenLightTheme } from "@app/theme";
import { AuthPage } from "@components/auth-page";
import { ThemeProvider } from "@mui/material";
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";

export default async function Login() {
  const data = await GetData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return (<ThemeProvider theme={overriddenLightTheme}>
    <AuthPage type="login" registerLink={false} forgotPasswordLink={false}
      rememberMe={false}
      title={
        <>
          <img src='https://eurodecor.co.in/img/logo2.JPG' width={200} height={90} />
        </>
      }
    />
  </ThemeProvider>

  );
}

async function GetData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
