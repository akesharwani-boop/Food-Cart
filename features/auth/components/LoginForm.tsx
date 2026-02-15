"use client";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../authSlice";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../validation/login.schema";
import toast from "react-hot-toast";
import { AppDispatch } from "@/store/store";

interface LoginFormProps {
  switchToSignup: () => void;
}

export default function LoginForm({ switchToSignup }: LoginFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      // ADMIN LOGIN
      if (username === "admin" && password === "admin123") {
        dispatch(
          loginSuccess({
            user: {
              id: 0,
              username: "admin",
              email: "admin@food.com",
              firstName: "Admin",
              lastName: "",
              image: "",
              role: "admin",
            },
            accessToken: "admin-token",
            refreshToken: "admin-refresh",
          }),
        );

        toast.success("Admin logged in successfully 👑");
        router.push("/admin/dashboard");
        return;
      }

      // NORMAL USER LOGIN
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

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

      toast.success("User logged in successfully 🚀");
      router.push("/products");
    } catch {
      toast.error("Invalid username or password ❌");
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleLogin(values.username, values.password);
          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <Field
                name="username"
                placeholder="Username"
                className="w-full border p-3 rounded-lg"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border p-3 rounded-lg"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Switch Link */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <button
          onClick={switchToSignup}
          className="text-orange-500 font-medium hover:underline">
          Sign Up
        </button>
      </p>
    </>
  );
}
