
import axios from "axios";
import { store } from "@/store/store";
import { logout, loginSuccess } from "@/features/auth/authSlice";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  
});

/* ===============================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  console.log("token",token)

  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ===============================
   RESPONSE INTERCEPTOR
   Auto refresh token
================================ */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // if token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        const { data } = await axios.post(
          "https://dummyjson.com/auth/refresh",
          { refreshToken },
          // { withCredentials: true },
        );

        store.dispatch(
          loginSuccess({
            user: state.auth.user!,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  },
);
