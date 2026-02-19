"use client";

import { useFormik } from "formik";
import { loginSchema } from "../validation/login.schema";
import { useLogin } from "../hooks/useLogin";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "../authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { AppDispatch } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import axios from "axios";
interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        // 1️⃣ Login
        const loginData = await mutateAsync(values);

        // 2️⃣ Tokens store
        dispatch(
          setTokens({
            accessToken: loginData.accessToken,
            refreshToken: loginData.refreshToken,
          }),
        );

        // 3️⃣ auth/me call
        const { data: userData } = await api.get("/auth/me");

        // 4️⃣ user store
        dispatch(setUser(userData));

        toast.success("Login successful 🚀");

        if (userData.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/products");
        }
      } catch (error) {
        toast.error("Invalid credentials ❌");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="
        w-full
        bg-orange-500
        hover:bg-orange-600
        text-white">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
