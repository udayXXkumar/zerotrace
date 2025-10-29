import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-[#0b0b0c]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-zinc-100">
          zerotrace <span className="text-accent">/</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/posts" className="hover:text-accent">Posts</Link>
          <Link href="/about" className="hover:text-accent">About</Link>
          <a href="/rss.xml" className="hover:text-accent">RSS</a>
        </nav>
      </div>
    </header>
  );
}


