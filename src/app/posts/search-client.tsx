"use client";
import { useMemo, useState } from "react";
import { Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function FilterClient({ tags, posts }: { tags: string[]; posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = query.toLowerCase();
      const inText =
        p.frontmatter.title.toLowerCase().includes(q) ||
        (p.frontmatter.excerpt || "").toLowerCase().includes(q);
      const tagOk = activeTag ? (p.frontmatter.tags || []).includes(activeTag) : true;
      return inText && tagOk;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-200 focus:border-accent focus:outline-none sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded border px-2 py-1 text-xs ${
              activeTag === null
                ? "border-accent bg-accent-soft text-accent"
                : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-accent"
            }`}
          >
            all
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`rounded border px-2 py-1 text-xs ${
                activeTag === t
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-accent"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}


