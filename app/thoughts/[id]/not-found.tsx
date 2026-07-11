import Link from "next/link"

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
            <h1 className="text-3xl font-bold mb-4">Thought not found</h1>
            <p className="text-white/60 mb-8">
                This one got lost in the overthinking spiral.
            </p>
            <Link href="/thoughts#thoughts" className="text-orange-400 hover:text-orange-300">
                ← Back to all thoughts
            </Link>
        </main>
    )
}