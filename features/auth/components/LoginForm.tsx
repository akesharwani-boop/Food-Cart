"use client";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../authSlice";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    // ADMIN LOGIN (custom)
    if (username === "admin" && password === "admin123") {
      dispatch(
        loginSuccess({
          user: {
            id: 0,
            username: "admin",
            email: "admin@food.com",
            firstName: "Admin",
            lastName: "",
            role: "admin",
          },
          accessToken: "admin-token",
          refreshToken: "admin-refresh",
        }),
      );
      router.push("/admin/dashboard");
      return;
    }

    // NORMAL USER LOGIN
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    dispatch(
      loginSuccess({
        user: {
          ...data,
          role: "user",
        },
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }),
    );

    router.push("/products");
  };

  return <div>/* form UI here */</div>;
}
