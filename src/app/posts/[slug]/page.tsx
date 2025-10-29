import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  const { title, date, tags } = post.frontmatter;
  return (
    <article className="prose prose-invert prose-zinc mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <div className="mb-2 text-sm text-zinc-400">{new Date(date).toLocaleDateString()}</div>
        <h1 className="mb-3 text-3xl font-semibold text-zinc-100">{title}</h1>
        {tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">
                #{t}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* MDX content */}
      <MDXRemote source={post.content} options={{ mdxOptions: { rehypePlugins: [rehypePrism] } }} />
    </article>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const url = `https://zerotrace.example/posts/${post.slug}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url,
      type: "article",
      tags: post.frontmatter.tags,
    },
  };
}


