import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { globby } from "globby";

export type PostFrontmatter = {
  title: string;
  date: string; // ISO
  tags?: string[];
  excerpt?: string;
  featured?: boolean;
  cover?: string;
};

export type Post = {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
};

const POSTS_DIR = path.join(process.cwd(), "posts");

export async function getAllPostSlugs(): Promise<string[]> {
  const files = await globby(["**/*.md", "**/*.mdx"], { cwd: POSTS_DIR });
  return files
    .map((f) => f.replace(/\\/g, "/"))
    .map((f) => f.replace(/\.(md|mdx)$/i, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  return {
    slug,
    content,
    frontmatter: data as PostFrontmatter,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map((s) => getPostBySlug(s)));
  return posts
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
}

export function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>();
  for (const p of posts) {
    (p.frontmatter.tags || []).forEach((t) => tagSet.add(t));
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}


