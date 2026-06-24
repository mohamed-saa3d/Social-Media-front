import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LoginInput } from "./schemas";
import type { User } from "@/entities/user/types";

type LoginResponse = { accessToken: string; user: User };

export function useLogin() {
  return useMutation({
    mutationFn: async (input: LoginInput): Promise<LoginResponse> => {
      const { data } = await api.post<LoginResponse>(endpoints.login, input);
      return data;
    },
  });
}
