import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/app/store/auth.store";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const { isAuthenticated } = useAuthStore.getState();
    throw redirect({ to: isAuthenticated ? "/feed" : "/auth" });
  },
  component: () => null,
});
