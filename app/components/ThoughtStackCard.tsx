"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

type Comment = {
    id: number;
    author: string;
    body: string;
};

type Thought = {
    id: number;
    title: string;
    body: string;
    coverImage: string | null;
    tags: string[];
    readMinutes: number;
    createdAt: Date;
    comments: Comment[];
};

type Props = {
    thought: Thought;
    index: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
};

export default function ThoughtStackCard({ thought, index, progress, range, targetScale }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={containerRef} className="h-screen sticky top-0 flex items-center justify-center px-4 md:px-0">
            <motion.div style={{ scale, top: `${index * 30}px` }} className="relative w-full md:w-[780px] max-w-[92vw] h-[380px] md:h-[440px] rounded-3xl overflow-hidden origin-top shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_50px_rgba(200,80,20,0.15)]">
                <Link href={`/thoughts/${thought.id}`} className="block w-full h-full relative group">
                    {thought.coverImage ? (
                        <motion.img src={thought.coverImage} alt="" style={{ scale: imageScale }} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-black" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

                    <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex items-start justify-between gap-4">
                        <div className="flex flex-wrap gap-3">
                            {thought.tags.map((tag) => (
                                <span key={tag} className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/70 font-medium">
                                    #{tag.toLowerCase()}
                                </span>
                            ))}
                        </div>
                        <span className="shrink-0 text-[9px] md:text-[10px] uppercase tracking-widest text-white/50">
                            {thought.readMinutes} min read
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex flex-col gap-2 md:gap-3">
                        <h2 className="text-white text-xl md:text-4xl font-bold leading-tight tracking-tight">
                            {thought.title}
                        </h2>

                        <p className="text-white/70 text-xs md:text-base line-clamp-2 leading-relaxed">
                            {thought.body}
                        </p>

                        {thought.comments.length > 0 && (
                            <div className="mt-1 md:mt-2 flex flex-col gap-1 border-l-2 border-orange-400/50 pl-3">
                                {thought.comments.slice(0, 2).map((c) => (
                                    <p key={c.id} className="text-white/50 text-[10px] md:text-xs italic line-clamp-1">
                                        &ldquo;{c.body}&rdquo; — {c.author}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-2 md:mt-3 pt-2 md:pt-3 border-t border-white/10">
                            <span className="text-white/50 text-[10px] md:text-xs">
                                {thought.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </span>
                            <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-semibold group-hover:text-orange-400 transition-colors">
                                Read more →
                            </span>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}