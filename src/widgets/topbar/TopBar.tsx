import { Search, Sun, Moon, Bell } from "lucide-react";
import { useThemeStore } from "@/app/store/theme.store";
import { Avatar } from "@/entities/post/ui/PostAuthor";
import { useAuthStore } from "@/app/store/auth.store";

export function TopBar() {
  const { theme, toggle } = useThemeStore();
  const user = useAuthStore((s) => s.user);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <a href="/feed" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground dark:glow">
            <span className="font-display text-lg font-bold">L</span>
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight sm:block">
            Lumen
          </span>
        </a>

        <div className="relative ml-4 hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search people, posts, tags…"
            className="h-10 w-full max-w-md rounded-full border border-border bg-muted/40 pl-10 pr-4 text-sm placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            aria-label="Notifications"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            <Bell className="h-4 w-4" />
          </button>
          <Avatar id={user?.id ?? user?._id ?? "anon"} size={36} />
        </div>
      </div>
    </header>
  );
}
