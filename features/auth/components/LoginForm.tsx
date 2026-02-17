"use client";

import { useFormik } from "formik";
import { loginSchema } from "../validation/login.schema";
import { useLogin } from "../hooks/useLogin";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { AppDispatch } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
        const data = await mutateAsync(values);

        dispatch(
          loginSuccess({
            user: {
              id: data.id,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              image: data.image,
              role: "user",
            },
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );

        toast.success("Login successful 🚀");
        router.push("/products");
      } catch {
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
        text-white"
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
