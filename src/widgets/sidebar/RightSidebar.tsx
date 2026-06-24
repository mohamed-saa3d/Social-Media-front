import { TrendingUp, UserPlus } from "lucide-react";
import { Avatar } from "@/entities/post/ui/PostAuthor";

const suggestions = ["nova_helix", "violet.machine", "kairo.dev", "atlas_kim"];
const trending = ["#cybergrunge", "#lavenderhaze", "#neonfutures", "#shadowstack"];

export function RightSidebar() {
  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] flex-col gap-4 overflow-y-auto xl:flex">
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-display text-sm font-semibold">Trending</h3>
        </div>
        <ul className="space-y-2">
          {trending.map((t) => (
            <li key={t} className="flex items-center justify-between text-sm">
              <span className="text-foreground/90">{t}</span>
              <span className="text-xs text-muted-foreground">12.4k</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-3 font-display text-sm font-semibold">Suggested for you</h3>
        <ul className="space-y-3">
          {suggestions.map((s) => (
            <li key={s} className="flex items-center gap-3">
              <Avatar id={s} size={36} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{s}</p>
                <p className="truncate text-xs text-muted-foreground">Suggested · new</p>
              </div>
              <button className="inline-flex items-center gap-1 rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
                <UserPlus className="h-3.5 w-3.5" /> Follow
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="px-2 text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Lumen · Premium social
      </p>
    </aside>
  );
}
