import Link from "next/link";
import Typing from "@/components/Typing";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default async function Home() {
  const posts = await getAllPosts();
  const featured = posts.filter((p) => p.frontmatter.featured).slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <section className="mb-16">
        <div className="mb-3 text-sm uppercase tracking-[0.25em] text-accent">Security Engineering Journal</div>
        <h1 className="mb-4 text-5xl font-semibold text-zinc-100">
          <Typing text="zerotrace" />
        </h1>
        <p className="max-w-2xl text-zinc-300/90">
          Practical cybersecurity research, methodologies, and implementation notes. Clear, concise, and immediately useful.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/posts" className="rounded border border-accent bg-accent-soft px-4 py-2 text-accent hover:opacity-90">
            Read the blog
          </Link>
          <Link href="/about" className="rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-200 hover:border-accent">
            About
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold text-zinc-100">Featured</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {(featured.length > 0 ? featured : posts.slice(0, 2)).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mt-20 text-zinc-300/90">
        <h3 className="mb-2 text-xl font-semibold text-zinc-100">Mission</h3>
        <p>
          Publishing defensible, high-quality security guidance for practitioners. No hype—just validated techniques.
        </p>
      </section>
    </div>
  );
}
