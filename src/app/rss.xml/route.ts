import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "error"; // SSG only

export async function GET() {
  const siteUrl = "https://udayxxkumar.github.io/zerotrace";
  const feed = new Feed({
    id: siteUrl,
    title: "zerotrace",
    description: "Anonymous infosec notes and write-ups",
    link: siteUrl,
    language: "en",
  });

  const posts = await getAllPosts();
  for (const p of posts) {
    const url = `${siteUrl}/posts/${p.slug}/`;
    feed.addItem({
      id: url,
      title: p.frontmatter.title,
      link: url,
      date: new Date(p.frontmatter.date),
      description: p.frontmatter.excerpt,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}


