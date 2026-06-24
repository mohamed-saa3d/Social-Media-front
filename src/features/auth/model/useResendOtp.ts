import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";

export function useResendOtp() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post(endpoints.resendOtp, { email });
      return data;
    },
  });
}
