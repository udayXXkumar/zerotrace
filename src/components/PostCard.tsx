import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const { title, date, tags, excerpt } = post.frontmatter;
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-5 transition-colors hover:border-accent hover:bg-zinc-900/70"
    >
      <div className="mb-2 text-sm text-zinc-400">{new Date(date).toLocaleDateString()}</div>
      <h3 className="mb-2 text-xl font-semibold text-zinc-100 group-hover:text-accent">{title}</h3>
      {excerpt && <p className="mb-3 text-zinc-300/80">{excerpt}</p>}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded border border-accent bg-accent-soft px-2 py-0.5 text-xs text-accent">
              #{t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}


