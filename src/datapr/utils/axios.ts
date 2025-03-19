// import type { HttpError } from "@refinedev/core";
// import axios from "axios";

// const axiosInstance = axios.create();

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const customError: HttpError = {
//       ...error,
//       message: error.response?.data?.message,
//       statusCode: error.response?.status,
//     };

//     return Promise.reject(customError);
//   },
// );

// export { axiosInstance };

import type { HttpError } from "@refinedev/core";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to get cookies

const axiosInstance = axios.create();

// Add a request interceptor to set token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const uuid = Cookies.get("uuid"); // Get token from cookies

    if (uuid) {
      config.headers.uuid = uuid; // Set token in headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
