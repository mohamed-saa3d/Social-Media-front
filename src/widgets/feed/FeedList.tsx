import { useEffect, useRef } from "react";
import { usePostsFeed } from "@/features/posts/model/usePostsFeed";
import { PostCard } from "@/features/posts/ui/PostCard";
import { FeedSkeleton } from "./FeedSkeleton";
import { Loader2 } from "lucide-react";

export function FeedList() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePostsFeed();

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) return <FeedSkeleton count={4} />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-card p-6 text-center">
        <p className="text-sm text-foreground">Couldn't load your feed.</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {(error as Error)?.message ?? "Unknown error"}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:dark:glow"
        >
          Try again
        </button>
      </div>
    );
  }

  const posts = data?.pages.flatMap((p) => p.data) ?? [];

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
        No posts yet. Be the first to share something.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <PostCard key={p._id ?? p.id} post={p} />
      ))}
      <div ref={sentinelRef} className="flex justify-center py-6">
        {isFetchingNextPage ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        ) : !hasNextPage ? (
          <span className="text-xs text-muted-foreground">You're all caught up</span>
        ) : null}
      </div>
    </div>
  );
}
