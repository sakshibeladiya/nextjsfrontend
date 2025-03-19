import { AuthPage } from "@components/auth-page";
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";

export default async function Register() {
  const data = await GetData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="register" />;
}

async function GetData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
