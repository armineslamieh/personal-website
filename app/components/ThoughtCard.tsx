import Link from "next/link";
import type { Thought } from "@prisma/client";

export default function ThoughtCard({
                                        thought,
                                        isLatest = false,
                                    }: {
    thought: Thought;
    isLatest?: boolean;
}) {
    return (
        <article className="relative rounded-3xl overflow-hidden
        h-80 w-full flex items-center flex-row pl-10
        bg-gradient-to-r from-black to-orange-900 shadow-lg shadow-orange-500/30 gap-10 hover:scale-105 transition-all duration-300 hover:cursor-pointer">
            {/* Background cover image */}
            {thought.coverImage && (
                <div className="relative w-[500px] h-[270px] flex-shrink-0 overflow-hidden rounded-[32px] group">

                    <img
                        src={thought.coverImage}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Soft glow */}
                    <div className="absolute inset-0 ring-1 ring-white/10 rounded-[32px]" />

                    {/* Floating label */}
                    <div className="absolute top-4 left-4 flex flex-row gap-2 ">
                    {thought.tags.map((tag) => (
                    <div key={tag} className="top-4 left-4 px-3 py-1 rounded-full
                    bg-black/40 backdrop-blur-md text-white text-xs tracking-widest">
                        {tag.toUpperCase()}
                    </div>
                    ))}
                        </div>
                </div>
            )}
            <div className=" flex flex-col gap-5 mr-5 bg-black/20 p-5 rounded-3xl">
                <h1 className="text-white text-2xl font-bold">{thought.title}</h1>
                <hr className="border-gray-600" />
                <p className="text-white text-lg">{thought.body}</p>

                <div className="absolute bottom-0 mb-10 flex flex-row gap-3
                    text-white/70 text-sm bg-white/10 px-2 py-1 rounded-full">
                    <p className="text-sm">Created At: {thought.createdAt.toLocaleString()}</p>
                </div>

                <div className="absolute top-0 mt-10 flex flex-row gap-3
                    text-white/70 text-sm bg-white/10 px-2 py-1 rounded-full">
                    <p className="text-sm">{thought.readMinutes} min read</p>
                </div>

            </div>

        </article>
    );
}