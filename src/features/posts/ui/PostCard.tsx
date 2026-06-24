import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { PostAuthor } from "@/entities/post/ui/PostAuthor";
import type { Post } from "@/entities/post/types";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return d.toLocaleDateString();
}

export function PostCard({ post }: { post: Post }) {
  const userId = typeof post.userId === "string" ? post.userId : post.userId?.id ?? "unknown";
  return (
    <article className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <header className="flex items-center justify-between">
        <PostAuthor userId={userId} />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(post.createdAt)}</span>
          <button className="rounded-full p-1.5 hover:bg-muted" aria-label="More">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </header>

      {post.text && (
        <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
          {post.text}
        </p>
      )}

      {post.image && (
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <img src={post.image} alt="" className="h-auto w-full object-cover" loading="lazy" />
        </div>
      )}

      <footer className="mt-4 flex items-center gap-1 border-t border-border pt-3 text-sm text-muted-foreground">
        <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-primary/10 hover:text-primary">
          <Heart className="h-4 w-4" />
          <span>{post.likes?.length ?? 0}</span>
        </button>
        <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-primary/10 hover:text-primary">
          <MessageCircle className="h-4 w-4" />
          <span>{post.commentsCount ?? 0}</span>
        </button>
        <button className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-primary/10 hover:text-primary">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </footer>
    </article>
  );
}
