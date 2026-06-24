import { createFileRoute, redirect } from "@tanstack/react-router";
import { FeedPage } from "@/pages/feed/FeedPage";
import { useAuthStore } from "@/app/store/auth.store";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed · Lumen" },
      { name: "description", content: "Your premium social feed." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/auth" });
  },
  component: FeedPage,
});
