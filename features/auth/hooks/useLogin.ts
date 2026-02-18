import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/auth/login", {
      ...payload
      }
    
      );

      return data;
    },
  });
};

const getUserProfile = async (token: string) => {
  console.log("myToken", token);
  const me = await api.get("/user/me");
  console.log("me", me);
};

export default getUserProfile;
// import { useMutation } from "@tanstack/react-query";
// import { api } from "@/lib/axios";

// interface LoginPayload {
//   username: string;
//   password: string;
// }

// export const useLogin = () => {
//   return useMutation({
//     mutationFn: async (payload: LoginPayload) => {
//       const { data } = await api.post("/auth/login", payload);
//       return data;
//     },
//   });
// };
