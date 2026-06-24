import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { RegisterInput } from "./schemas";

export function useRegister() {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const { data } = await api.post(endpoints.register, input);
      return data;
    },
  });
}
