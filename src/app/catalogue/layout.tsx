"use client"
import { overriddenLightTheme } from "@app/theme";
import { Header } from "@components/header";
import { authProviderServer } from "@providers/auth-provider";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import React from "react";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Headerlogo } from "@app/logo/logo";
export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await GetData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }


  return (<ThemeProvider theme={overriddenLightTheme}>

    <ThemedLayoutV2
      Title={({ collapsed }) =>
        <Headerlogo collapsed={collapsed} />
      }




      initialSiderCollapsed={true} Header={Header}>{children}</ThemedLayoutV2>
  </ThemeProvider>);
}


async function GetData() {
  const cookies = useCookies();
  const { authenticated, redirectTo } = await authProviderServer.check(cookies.get());

  return {
    authenticated,
    redirectTo,
  };
}
