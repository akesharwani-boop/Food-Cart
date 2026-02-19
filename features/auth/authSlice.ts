import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  Only tokens set karega
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },

    //  Only user set karega
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    //  Logout
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setTokens, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
