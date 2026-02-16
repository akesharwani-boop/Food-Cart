"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  editUser: any;
  refresh: () => void;
}

const schema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Mobile is required"),
  role: Yup.string().required("Role is required"),
});

export default function UserModal({ open, setOpen, editUser, refresh }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">
          {editUser ? "Edit User" : "Create User"}
        </h2>

        <Formik
          initialValues={{
            firstName: editUser?.firstName || "",
            lastName: editUser?.lastName || "",
            email: editUser?.email || "",
            phone: editUser?.phone || "",
            role: editUser?.role || "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            if (editUser) {
              await fetch(`https://dummyjson.com/users/${editUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              toast.success("User updated successfully ✏️");
            } else {
              await fetch(`https://dummyjson.com/users/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              toast.success("User created successfully 🎉");
            }

            refresh();
            setOpen(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-3">
              <Field
                name="firstName"
                placeholder="First Name"
                className="input"
              />
              {touched.firstName && typeof errors.firstName === "string" && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}

              <Field
                name="lastName"
                placeholder="Last Name"
                className="input"
              />
              <Field name="email" placeholder="Email" className="input" />
              <Field name="phone" placeholder="Mobile" className="input" />
              <Field name="role" placeholder="Role" className="input" />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded"
              >
                {editUser ? "Update" : "Create"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
