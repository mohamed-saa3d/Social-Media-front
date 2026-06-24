import { createFileRoute } from "@tanstack/react-router";
import { VerifyOtpPage } from "@/pages/auth/VerifyOtpPage";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({
    meta: [{ title: "Verify email · Lumen" }],
  }),
  component: VerifyOtpPage,
});
