import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { User } from "@/entities/user/types";

type VerifyResponse = { accessToken: string; user: User };

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async (input: { email: string; code: string }): Promise<VerifyResponse> => {
      const { data } = await api.post<VerifyResponse>(endpoints.verifyOtp, input);
      return data;
    },
  });
}
