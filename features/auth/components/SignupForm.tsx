"use client";

import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { signupSchema } from "../validation/signup.schema";
import { loginSuccess } from "../authSlice";
import toast from "react-hot-toast";

export default function SignupForm({ switchToLogin }: any) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          //  Fake signup 

          const newUser = {
            id: Date.now(),
            username: values.username,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            image: "",
            role: "user" as const, 
          };

          dispatch(
            loginSuccess({
              user:newUser,
              accessToken: "fakeToken",
              refreshToken: "fakeRefresh",
            }),
          );

          toast.success("User signed up successfully 🎉");
        } catch {
          toast.error("Something went wrong");
        }

        setSubmitting(false);
      }}>
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <Field name="firstName" placeholder="First Name" className="input" />
          {errors.firstName && touched.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}

          <Field name="lastName" placeholder="Last Name" className="input" />
          {errors.lastName && touched.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}

          <Field name="email" placeholder="Email" className="input" />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <Field name="username" placeholder="Username" className="input" />
          {errors.username && touched.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}

          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded">
            Sign Up
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-orange-500 underline">
              Login
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
}
