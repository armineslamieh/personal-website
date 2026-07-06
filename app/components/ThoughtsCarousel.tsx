"use client";
import { useState } from "react";
import Link from "next/link";
import type { Thought } from "@prisma/client";

export default function ThoughtsCarousel({ thoughts }: { thoughts: Thought[] }) {
    const [current, setCurrent] = useState(0);
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // get all unique tags
    const allTags = Array.from(new Set(thoughts.flatMap((t) => t.tags)));

    // filter thoughts by selected tag
    const filtered = activeTag ? thoughts.filter((t) => t.tags.includes(activeTag as any)) : thoughts;

    const prev = () => setCurrent((i) => Math.max(i - 1, 0));
    const next = () => setCurrent((i) => Math.min(i + 1, filtered.length - 1));

    const handleTagClick = (tag: string) => {
        setActiveTag(activeTag === tag ? null : tag);
        setCurrent(0); // reset to first card on filter change
    };

    return (
        <div className="relative w-full flex flex-col items-center gap-8 py-16">

            {/* Tag filters */}
            <div className="flex flex-wrap gap-6 justify-center px-6">
                <button
                    onClick={() => { setActiveTag(null); setCurrent(0); }}
                    className={`px-4 py-1.5 rounded-full text-sm tracking-widest transition-all ${
                        activeTag === null
                            ? "bg-orange-500 text-white"
                            : "bg-white/10 text-white/60 hover:bg-white/20"
                    }`}
                >
                    ALL
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-4 py-1.5 rounded-full text-sm tracking-widest transition-all ${
                            activeTag === tag
                                ? "bg-orange-500 text-white"
                                : "bg-white/10 text-white/60 hover:bg-white/20"
                        }`}
                    >
                        {tag.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Cards track */}
            <div className="relative w-full flex items-center justify-center h-[420px]">
                {filtered.map((t, i) => {
                    const offset = i - current;
                    const isActive = offset === 0;
                    const isVisible = Math.abs(offset) <= 2;
                    if (!isVisible) return null;

                    return (
                        <Link
                            key={t.id}
                            href={`/thoughts/${t.id}`}
                            className="absolute transition-all duration-500 ease-out rounded-3xl overflow-hidden cursor-pointer"
                            style={{
                                width: isActive ? "600px" : "320px",
                                height: isActive ? "400px" : "280px",
                                left: "50%",
                                marginLeft: isActive ? "-300px" : "-160px",
                                transform: `translateX(${offset * 300}px) scale(${isActive ? 1 : 0.85})`,
                                opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.3,
                                zIndex: isActive ? 10 : 10 - Math.abs(offset),
                            }}
                        >
                            {t.coverImage ? (
                                <img src={t.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-black" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                <div className="flex gap-2">
                                    {t.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs tracking-widest">
                                            {tag.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/80 text-xs">
                                    {t.readMinutes} min read
                                </span>
                            </div>
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                                    <h2 className="text-white text-2xl font-bold leading-tight">{t.title}</h2>
                                    <p className="text-white/70 text-sm line-clamp-2">{t.body}</p>
                                    <p className="text-white/40 text-xs mt-1">
                                        {t.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button onClick={prev} disabled={current === 0}
                        className="text-white/60 hover:text-white disabled:opacity-20 transition-all text-xl px-2">
                    ←
                </button>
                {filtered.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-orange-500 w-4" : "bg-white/30"}`}
                    />
                ))}
                <button onClick={next} disabled={current === filtered.length - 1}
                        className="text-white/60 hover:text-white disabled:opacity-20 transition-all text-xl px-2">
                    →
                </button>
            </div>
        </div>
    );
}