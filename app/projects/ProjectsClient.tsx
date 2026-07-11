"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const BrainScene = dynamic(() => import("@/app/components/BrainScene"), { ssr: false });

// Module-level flag — survives navigation but resets on full page refresh
let hasSeenIntroThisSession = false;

type Project = {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[];
    type: "ART" | "ENGINEERING";
};

const ProjectsClient = ({ projects }: { projects: Project[] }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio("/sounds/Dont Be So Serious [Death Stranding OST]   Low Roar.mp3");
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;

        if (hasSeenIntroThisSession) {
            // User has already seen intro in this session — skip it and try autoplay
            setShowIntro(false);
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    const resumeAudio = () => {
                        audioRef.current?.play();
                        window.removeEventListener("click", resumeAudio);
                    };
                    window.addEventListener("click", resumeAudio);
                });
            }
        } else {
            setShowIntro(true);
        }

        setReady(true);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current = null;
            }
        };
    }, []);

    const handleEnter = () => {
        hasSeenIntroThisSession = true;
        setShowIntro(false);
        audioRef.current?.play().catch((err) => {
            console.error("Audio play failed:", err);
        });
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center relative">

            {ready && showIntro && (
                <div
                    onClick={handleEnter}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer group overflow-y-auto"
                >
                    <div className="flex flex-col items-center gap-8 px-6 py-12 text-center max-w-2xl">
                        <div className="flex flex-col gap-2">
                            <p className="text-white/50 uppercase tracking-[0.3em] text-xs">Welcome</p>
                            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight">
                                A brain of projects
                            </h1>
                        </div>

                        <p className="text-white/70 max-w-md text-base md:text-lg leading-relaxed">
                            Every idea, every experiment, every finished thing —
                            mapped as nodes across a brain. Click one to explore.
                        </p>

                        <div className="flex flex-col gap-3 mt-2 max-w-lg">
                            <p className="text-white/50 text-sm leading-relaxed">
                                The brain has two hemispheres — the right is often linked to intuition and expression, the left to logic and structure. <strong className="text-white">I've been trying to keep both awake.</strong>
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-2 text-left w-full max-w-lg">
                            <div className="flex-1 flex flex-col gap-2 border-l-2 border-[#378ADD] pl-4">
                                <span className="text-[#378ADD] uppercase tracking-widest text-[10px] font-semibold">
                                    Left hemisphere · Engineering
                                </span>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Where the code, systems, and tools live. The projects that answer directly.
                                </p>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 border-l-2 border-[#9F7AEA] pl-4">
                                <span className="text-[#9F7AEA] uppercase tracking-widest text-[10px] font-semibold">
                                    Right hemisphere · Art
                                </span>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Where the films, music, and photography live. The projects that speak sideways.
                                </p>
                            </div>

                        </div>


                        <div className="flex items-center gap-6 text-white/50 text-xs uppercase tracking-widest mt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">↻</span>
                                <span>Drag to rotate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg">⊕</span>
                                <span>Scroll to zoom</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-4">
                            <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:border-orange-400 group-hover:scale-110 transition-all duration-500">
                                <span className="text-white text-2xl group-hover:text-orange-400 transition-colors">→</span>
                            </div>
                            <p className="text-white/60 text-xs uppercase tracking-widest">Click anywhere to enter</p>
                        </div>

                        <p className="text-white/30 text-[10px] uppercase tracking-widest mt-4">
                            Sound recommended · Headphones on
                        </p>
                    </div>
                </div>
            )}

            <BrainScene projects={projects} />

            {ready && !showIntro && (
                <button
                    onClick={toggleMute}
                    className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-40 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[10px] uppercase tracking-[0.3em] font-light"
                >
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${muted ? "bg-white/30" : "bg-orange-400"}`} />
                    {muted ? "Sound off" : "Sound on"}
                </button>
            )}
        </div>
    );
};

export default ProjectsClient;