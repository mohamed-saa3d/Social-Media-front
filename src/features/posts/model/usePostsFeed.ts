import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { Post, PostsPage } from "@/entities/post/types";

const LIMIT = 10;

export function usePostsFeed() {
  return useInfiniteQuery({
    queryKey: ["posts", "feed"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }): Promise<PostsPage> => {
      const { data } = await api.get(endpoints.posts, {
        params: { page: pageParam, limit: LIMIT },
      });
      // Tolerate either { data, page, hasMore } or a bare array.
      if (Array.isArray(data)) {
        return { data: data as Post[], page: pageParam as number, hasMore: data.length === LIMIT };
      }
      const list: Post[] = data.data ?? data.posts ?? [];
      const hasMore =
        typeof data.hasMore === "boolean" ? data.hasMore : list.length === LIMIT;
      return { data: list, page: pageParam as number, hasMore };
    },
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
  });
}
