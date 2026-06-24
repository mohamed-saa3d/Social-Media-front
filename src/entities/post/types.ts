import type { User } from "@/entities/user/types";

export type Post = {
  _id: string;
  id?: string;
  userId: string | User;
  text: string;
  image?: string | null;
  likes: string[];
  commentsCount: number;
  createdAt: string;
};

export type PostsPage = {
  data: Post[];
  page: number;
  hasMore: boolean;
};
