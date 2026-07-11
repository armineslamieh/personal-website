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
        <div ref={containerRef} className="h-screen sticky top-0 flex items-center justify-center">
            <motion.div
                style={{
                    scale,
                    top: `${index * 30}px`,
                }}
                className="relative w-[780px] max-w-[90vw] h-[400px] rounded-3xl overflow-hidden origin-top"
                initial={{
                    boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 0 50px rgba(200,80,20,0.2)",
                }}
            >
                <Link href={`/thoughts/${thought.id}`} className="block w-full h-full relative">

                    {/* Image with parallax scale */}
                    {thought.coverImage ? (
                        <motion.img
                            src={thought.coverImage}
                            alt=""
                            style={{ scale: imageScale }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-black" />
                    )}

                    {/* Gradient overlays — same as original */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                    {/* Top row — tags + read time */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                            {thought.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-widest">
                                    {tag.toUpperCase()}
                                </span>
                            ))}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs">
                            {thought.readMinutes} min read
                        </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                        <h2 className="text-white text-2xl font-bold leading-tight">{thought.title}</h2>
                        <p className="text-white/70 text-sm line-clamp-2">{thought.body}</p>

                        {thought.comments.length > 0 && (
                            <div className="mt-2 flex flex-col gap-1">
                                <span className="text-orange-400/70 text-[10px] uppercase tracking-widest">Latest comments</span>
                                {thought.comments.map((c) => (
                                    <p key={c.id} className="text-white/60 text-xs italic line-clamp-1">
                                        &ldquo;{c.body}&rdquo; — {c.author}
                                    </p>
                                ))}
                            </div>
                        )}

                        <p className="text-orange-400/70 text-xs mt-1">
                            {thought.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}