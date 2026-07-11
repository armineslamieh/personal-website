import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6">
            <h1 className="text-3xl font-bold mb-4">Project not found</h1>
            <p className="text-white/60 mb-8 text-center">
                This one might still be in the making — or it wandered off.
            </p>
            <Link href="/projects" className="text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-widest text-sm">
                ← Back to all projects
            </Link>
        </main>
    );
}