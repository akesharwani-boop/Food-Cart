import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface LoginPayload {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/auth/login", payload);
      return data;
    },
  });
};
