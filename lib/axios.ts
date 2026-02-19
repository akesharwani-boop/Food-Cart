import axios from "axios";
import { store } from "@/store/store";
import { logout,setTokens } from "@/features/auth/authSlice";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
});

/* ===============================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  //  IMPORTANT: Token ho tabhi header set karna hai 
  if (token && config.headers) {
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

    // agar 401 aaye aur retry na hua ho toh mujhe dikkat hogi ye mere liye important part hai
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      store.getState().auth.refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        const { data } = await axios.post(
          "https://dummyjson.com/auth/refresh",
          { refreshToken }
        );

        //  new tokens store karna hai mujhe 
        store.dispatch(
          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );

        //  new token attach karna hai mujhe
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
