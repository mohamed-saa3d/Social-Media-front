import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/pages/auth/AuthPage";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · Lumen" },
      { name: "description", content: "Sign in or create your Lumen account." },
    ],
  }),
  component: AuthPage,
});
