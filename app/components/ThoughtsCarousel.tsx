"use client";
import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inCardsSection, setInCardsSection] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const allTags = Array.from(new Set(thoughts.flatMap((t) => t.tags)));
    const filtered = activeTag ? thoughts.filter((t) => t.tags.includes(activeTag as any)) : thoughts;

    // Update current card index based on scroll progress
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const idx = Math.min(Math.floor(progress * filtered.length), filtered.length - 1);
        setCurrentIndex(idx);
    });

    // Show/hide counter based on whether cards section is in view
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInCardsSection(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleTagClick = (tag: string) => {
        setActiveTag(activeTag === tag ? null : tag);
        setCurrentIndex(0);
    };

    return (
        <div className="relative w-full flex flex-col items-center gap-4 pt-8 pb-16">

            <div className="absolute inset-0 -z-10 bg-fixed bg-[radial-gradient(ellipse_at_bottom_left,_#ff4500_0%,_#c2410c_25%,_#3a2419_55%,_#1f1f23_85%)]" />

            {/* Sticky tag filters */}
            <div className="sticky top-4 md:top-8 z-30 flex justify-center w-full pointer-events-none px-4">
                <div className="flex items-center gap-1 rounded-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl px-2 py-2 pointer-events-auto max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <button onClick={() => setActiveTag(null)} className={`shrink-0 px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-semibold transition-all duration-300 ${activeTag === null ? "bg-orange-400 text-black" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                        All
                    </button>
                    <div className="shrink-0 w-px h-4 bg-white/10" />
                    {allTags.map((tag, i) => (
                        <div key={tag} className="shrink-0 flex items-center">
                            <button onClick={() => handleTagClick(tag)} className={`shrink-0 px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-semibold transition-all duration-300 ${activeTag === tag ? "bg-orange-400 text-black" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                                {tag.toLowerCase()}
                            </button>
                            {i < allTags.length - 1 && <div className="shrink-0 w-px h-4 bg-white/10" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Fixed section label + counter (desktop only, top-left) — only visible when in cards section */}
            <div className={`hidden md:flex fixed top-24 left-8 z-20 flex-col items-start gap-1 pointer-events-none transition-opacity duration-500 ${inCardsSection ? "opacity-100" : "opacity-0"}`}>
                <span className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-light">Section</span>
                <span className="text-white/80 uppercase tracking-[0.3em] text-sm font-semibold">Thoughts</span>
                <span className="text-white/60 text-xs tabular-nums mt-2">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </span>
            </div>

            {/* Fixed section label + counter (mobile only, top-right below filter) */}
            <div className={`flex md:hidden fixed top-25  z-20 flex-row items-center gap-2 pointer-events-none transition-opacity duration-500 ${inCardsSection ? "opacity-100" : "opacity-0"}`}>
                <span className="text-white/40 uppercase tracking-[0.3em] text-[9px] font-light">Thoughts</span>
                <span className="text-white/60 text-[10px] tabular-nums">
                    {String(currentIndex + 1).padStart(2, "0")}/{String(filtered.length).padStart(2, "0")}
                </span>
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
                            range={[i * (1 / filtered.length), (i + 1) * (1 / filtered.length)]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </div>
    );
}