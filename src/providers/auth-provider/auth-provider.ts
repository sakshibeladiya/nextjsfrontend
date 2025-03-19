"use client";

import type { AuthProvider } from "@refinedev/core";
import axios from "axios";
import Cookies from "js-cookie";
import { encrypt } from "./../../app/enc"
export var API_URL = ''
export var photos = ''
if (process.env.NODE_ENV === 'production') {
  API_URL = "http://195.35.22.220:8080/api/";
 
} else {
  API_URL = "http://195.35.22.220:8080/api/";
  // API_URL = "http://localhost:8080/api/";

}

export const authProvider: AuthProvider = {

  login: async ({ email, password, remember }) => {
    try {
      const options = {
        method: 'POST',
        url: `${API_URL}auth/sales_team/login`,
        headers: { 'content-type': 'application/json' },
        data: { email, password }
      };

      const { data } = await axios.request(options);
      var n = JSON.parse(JSON.stringify(data));
      if (data != null) {
        // Extract necessary data from response
        const { message, access, uuid } = data;

        // Set cookies with appropriate expiry

        Cookies.set("token", encrypt(message), {
          expires: remember ? 30 : 1, // 30 days if remember, 1 day otherwise
          path: "/",
        });
        Cookies.set("date", encrypt(access.toString()), {
          expires: remember ? 30 : 1,
          path: "/",
        });
        Cookies.set("uuid", uuid, {
          expires: remember ? 30 : 1,
          path: "/",
        });
        window.location.href = "/approvedProjects?pageSize=100&current=1";

        return {
          success: true,
        }
      } else {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: "Invalid username or password",
          },
        };
      }
    } catch (error) {
      // Handle request or other errors
      console.error("Login error:", error);
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },

  logout: async () => {

    Cookies.remove("date", { path: "/" });
    Cookies.remove("date", { path: "/" });
    Cookies.remove("token", { path: "/" });
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return {
      success: true,
    };
  },
  check: async () => {
    const auth = Cookies.get("token");
    const date = Cookies.get("date");
    const uuid = Cookies.get("uuid");

    if (auth && date && uuid) {
      // All cookies exist and are not null
      return {
        authenticated: true,
      };
    } else {
      // Any of the cookies are missing or null
      // if (typeof window !== "undefined") {
      //   window.location.href = "/login";
      // }
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/"
      };
    }
  },

  getPermissions: async () => {
    const auth = Cookies.get("date");
    if (auth) {
      const parsedUser = auth;
      return parsedUser;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("date");
    if (auth) {
      const parsedUser = auth;
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    console.log(error);

    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
