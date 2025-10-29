import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">Access Denied</div>
      <h1 className="mb-2 text-3xl font-semibold text-zinc-100">File Not Found</h1>
      <p className="mb-6 text-zinc-300/90">The resource you requested doesn't exist or has been moved.</p>
      <Link href="/" className="rounded border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-cyan-300 hover:border-cyan-400/80">
        Return to terminal
      </Link>
    </div>
  );
}


