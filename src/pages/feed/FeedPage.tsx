import { TopBar } from "@/widgets/topbar/TopBar";
import { LeftSidebar } from "@/widgets/sidebar/LeftSidebar";
import { RightSidebar } from "@/widgets/sidebar/RightSidebar";
import { FeedList } from "@/widgets/feed/FeedList";
import { useAuthStore } from "@/app/store/auth.store";
import { Avatar } from "@/entities/post/ui/PostAuthor";
import { Image as ImageIcon, Smile, Send } from "lucide-react";

export function FeedPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-aurora min-h-screen">
      <TopBar />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_320px]">
        <LeftSidebar />

        <section className="min-w-0 space-y-4">
          {/* Composer */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Avatar id={user?.id ?? user?._id ?? "anon"} />
              <div className="flex-1">
                <textarea
                  rows={2}
                  placeholder={`What's on your mind, ${user?.username ?? "friend"}?`}
                  className="w-full resize-none rounded-xl border border-border bg-background/60 p-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <button className="rounded-full p-2 hover:bg-muted" aria-label="Image">
                      <ImageIcon className="h-4 w-4" />
                    </button>
                    <button className="rounded-full p-2 hover:bg-muted" aria-label="Emoji">
                      <Smile className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:dark:glow">
                    <Send className="h-3.5 w-3.5" />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          <FeedList />
        </section>

        <RightSidebar />
      </main>
    </div>
  );
}
