import { api } from "@/lib/axios";

export const loginUser = async (payload: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/user/me");
  return data;
};
