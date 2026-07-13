"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const BrainScene = dynamic(() => import("@/app/components/BrainScene"), { ssr: false });

let hasSeenIntroThisSession = false;

type Project = {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    coverImage: string;
    year: number | null;
    techStack: string[];
    type: "ART" | "ENGINEERING";
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isBrainPage = pathname === "/projects";

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [ready, setReady] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then(setProjects)
            .catch(() => { });
    }, []);

    useEffect(() => {
        audioRef.current = new Audio("/sounds/Dont Be So Serious [Death Stranding OST]   Low Roar.mp3");
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;

        if (hasSeenIntroThisSession) {
            setShowIntro(false);
            audioRef.current.play().catch(() => {
                const resume = () => {
                    audioRef.current?.play();
                    window.removeEventListener("click", resume);
                };
                window.addEventListener("click", resume);
            });
        }
        setReady(true);

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        if (!hasSeenIntroThisSession) return;

        if (isBrainPage) {
            audioRef.current.play().catch(() => { });
        } else {
            audioRef.current.pause();
        }
    }, [isBrainPage]);

    const handleEnter = () => {
        hasSeenIntroThisSession = true;
        setShowIntro(false);
        audioRef.current?.play().catch((err) => console.error("Audio play failed:", err));
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <>
            {/* Intro overlay */}
            {ready && showIntro && isBrainPage && (
                <div
                    onClick={handleEnter}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer group overflow-y-auto"
                >
                    <div className="flex flex-col items-center gap-8 px-6 py-12 text-center max-w-2xl">
                        <div className="flex flex-col gap-2">
                            <p className="text-white/50 uppercase tracking-[0.3em] text-xs">Welcome</p>
                            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight">A brain of projects</h1>
                        </div>
                        <p className="text-white/60 text-sm max-w-md leading-relaxed">
                            The brain has two hemispheres — the right is often linked to intuition and expression, the left to logic and structure. I&apos;ve been trying to keep both awake.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-2 text-left w-full max-w-lg">
                            <div className="flex-1 flex flex-col gap-2 border-l-2 border-[#378ADD] pl-4">
                                <span className="text-[#378ADD] uppercase tracking-widest text-[10px] font-semibold">Left hemisphere · Engineering</span>
                                <p className="text-white/70 text-sm leading-relaxed">Where the code, systems, and tools live. The projects that answer directly.</p>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 border-l-2 border-[#9F7AEA] pl-4">
                                <span className="text-[#9F7AEA] uppercase tracking-widest text-[10px] font-semibold">Right hemisphere · Art</span>
                                <p className="text-white/70 text-sm leading-relaxed">Where the films, music, and photography live. The projects that speak sideways.</p>
                            </div>

                        </div>
                        <div className="flex items-center gap-6 text-white/50 text-xs uppercase tracking-widest mt-2">
                            <div className="flex items-center gap-2"><span className="text-lg">↻</span><span>Drag to rotate</span></div>
                            <div className="flex items-center gap-2"><span className="text-lg">⊕</span><span>Scroll to zoom</span></div>
                        </div>
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:border-orange-400 group-hover:scale-110 transition-all duration-500">
                                <span className="text-white text-2xl group-hover:text-orange-400 transition-colors">→</span>
                            </div>
                            <p className="text-white/60 text-xs uppercase tracking-widest">Click anywhere to enter</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-orange-400/40 bg-orange-400/5 shadow-[0_0_20px_rgba(251,146,60,0.15)] animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                            </svg>
                            <span className="text-orange-200 text-[10px] uppercase tracking-widest font-semibold">
                                 Sound recommended · Headphones on
    </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Brain scene */}
            <div className={isBrainPage ? "block" : "hidden"}>
                {projects.length > 0 && <BrainScene projects={projects} isPaused={!isBrainPage} />}
            </div>

            {/* Section title — mobile shows legends underneath, desktop only shows title */}
            {ready && !showIntro && isBrainPage && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 z-10 flex flex-col items-center md:items-start gap-3 pointer-events-none">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-white/40 uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-light">
                            Section
                        </span>
                        <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
                            Projects
                        </span>
                    </div>
                    {/* Legend on mobile only */}
                    <div className="flex md:hidden items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#9F7AEA]" />
                            <span className="text-white/60 uppercase tracking-widest text-[9px]">Art</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#378ADD]" />
                            <span className="text-white/60 uppercase tracking-widest text-[9px]">Engineering</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop-only legend at the bottom center */}
            {ready && !showIntro && isBrainPage && (
                <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-40 items-center gap-6 pointer-events-none">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#9F7AEA]" />
                        <span className="text-white/60 uppercase tracking-widest text-xs">Art</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#378ADD]" />
                        <span className="text-white/60 uppercase tracking-widest text-xs">Engineering</span>
                    </div>
                </div>
            )}

            {/* Mute button — mobile: inline with Amsterdam. Desktop: original spot */}
            {ready && !showIntro && isBrainPage && (
                <button
                    onClick={toggleMute}
                    className="fixed bottom-4 left-5  md:right-8 z-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-light"
                >
                    <span className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-colors ${muted ? "bg-white/30" : "bg-orange-400"}`} />
                    {muted ? "Sound off" : "Sound on"}
                </button>
            )}

            {!isBrainPage && children}
        </>
    );
}