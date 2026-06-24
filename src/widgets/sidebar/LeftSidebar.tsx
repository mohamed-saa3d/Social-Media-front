import { Home, Compass, Bell, MessageSquare, Bookmark, User, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { Avatar } from "@/entities/post/ui/PostAuthor";
import { useNavigate } from "@tanstack/react-router";

const nav = [
  { icon: Home, label: "Feed", active: true },
  { icon: Compass, label: "Explore" },
  { icon: Bell, label: "Notifications" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export function LeftSidebar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] flex-col gap-1 lg:flex">
      <nav className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-3">
        {nav.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
              active
                ? "bg-primary/15 text-primary"
                : "text-foreground/80 hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4.5 w-4.5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-border bg-card p-3">
        <div className="flex items-center gap-3 px-1 py-1">
          <Avatar id={user?.id ?? user?._id ?? "anon"} size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold">{user?.username ?? "You"}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <button
            aria-label="Log out"
            onClick={() => {
              logout();
              navigate({ to: "/auth" });
            }}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
