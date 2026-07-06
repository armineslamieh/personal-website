import Link from "next/link";
import type { Thought } from "@prisma/client";

export default function ThoughtCard({ thought }: { thought: Thought }) {
    return (
        <Link href={`/thoughts/${thought.id}`}>
            <article className="relative rounded-3xl overflow-hidden h-80 w-full
                shadow-lg shadow-orange-900/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">

                {/* Full background image */}
                {thought.coverImage ? (
                    <img
                        src={thought.coverImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-black" />
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                {/* Top row — tags + read time */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex gap-2">
                        {thought.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-black/50
                                backdrop-blur-md text-white text-xs tracking-widest">
                                {tag.toUpperCase()}
                            </span>
                        ))}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md
                        text-white/80 text-xs">
                        {thought.readMinutes} min read
                    </span>
                </div>

                {/* Bottom — title, excerpt, date */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                    <h2 className="text-white text-2xl font-bold leading-tight">
                        {thought.title}
                    </h2>
                    <p className="text-white/70 text-sm line-clamp-2">
                        {thought.body}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                        {thought.createdAt.toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric"
                        })}
                    </p>
                </div>

            </article>
        </Link>
    );
}