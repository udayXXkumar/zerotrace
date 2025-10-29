import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import FilterClient from "./search-client";

export const dynamic = "error"; // SSG only

export default async function PostsPage() {
  const posts = await getAllPosts();
  const tags = getAllTags(posts);
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-semibold text-zinc-100">All Posts</h1>
      <FilterClient tags={tags} posts={posts} />
    </div>
  );
}


