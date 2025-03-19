
import type { AuthProvider } from "@refinedev/core";
// import { cookies } from "next/headers";
import { getCookies } from 'next-client-cookies/server';
export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async (cookies: any) => {
    var data = JSON.parse(JSON.stringify(cookies ?? {}));
    const auth = data.token;
    const date = data.date;
    const uuid = data.uuid;

    // auth && date && uuid
    if (auth && date && uuid) {
      return {
        authenticated: true,
      };
    }
    // if (typeof window !== "undefined") {
    //   window.location.href = "/login";
    // }
    return {
      authenticated: false,
      logout: true,
      redirectTo:"/"
    };
  },
};
