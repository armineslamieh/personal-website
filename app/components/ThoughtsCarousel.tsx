"use client";
import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import ThoughtStackCard from "./ThoughtStackCard";

type Comment = {
    id: number;
    author: string;
    body: string;
    createdAt: Date;
    thoughtId: number;
};

type ThoughtWithComments = {
    id: number;
    title: string;
    body: string;
    coverImage: string | null;
    tags: string[];
    readMinutes: number;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
};

export default function ThoughtsCarousel({ thoughts }: { thoughts: ThoughtWithComments[] }) {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const allTags = Array.from(new Set(thoughts.flatMap((t) => t.tags)));
    const filtered = activeTag ? thoughts.filter((t) => t.tags.includes(activeTag as any)) : thoughts;

    const handleTagClick = (tag: string) => {
        setActiveTag(activeTag === tag ? null : tag);
    };

    return (
        <div className="relative w-full flex flex-col items-center gap-8 py-16 " id={"thoughts"}>

            {/* Gradient background — scoped to this section only */}
            <div className="absolute inset-0 -z-10 bg-fixed bg-[radial-gradient(ellipse_at_bottom_left,_#ff4500_0%,_#c2410c_25%,_#3a2419_55%,_#1f1f23_85%)]" />

            {/* Sticky tag filters */}
            <div className="sticky top-0 z-30 flex flex-wrap gap-6 justify-center px-6 py-4 backdrop-blur-md bg-black/20 w-full">
                <button
                    onClick={() => setActiveTag(null)}
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

            {/* Cards stack */}
            <div ref={containerRef} className="w-full">
                {filtered.map((t, i) => {
                    const targetScale = 1 - (filtered.length - i) * 0.03;
                    return (
                        <ThoughtStackCard
                            key={t.id}
                            thought={t}
                            index={i}
                            progress={scrollYProgress}
                            range={[i * (1 / filtered.length), 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </div>
    );
}