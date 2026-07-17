"use client";

import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";
import About from "@/app/about/page"
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";
import TimeTracker from "@/app/components/TimeTracker";
import dynamic from "next/dynamic";

const Astronaut = dynamic(() => import("@/app/components/Astronaut"), { ssr: false });

export default function Home() {
    return (
        <>
            <FadeIn>
                <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
                    <Image
                        src="/ChatGPT Image Jul 1, 2026, 07_58_42.png"
                        alt="Armin Eslamieh"
                        fill
                        className="object-cover object-[center_14%] scale-100"
                        priority
                    />

                    {/* Intro text */}
                    <div className="absolute h-1/2 left-4 lg:bottom-33 md:left-15 md:bottom-30 max-w-xs md:max-w-md bottom-40">
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-white/40 uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-light">
                                Hi, my name is
                            </span>
                            <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
                                Armin
                            </span>
                        </div>
                        <p className="text-base md:text-lg leading-relaxed text-white/80 mt-4">
                            This is not a portfolio. I just think too much<br />
                            so why not others hear them too?<br />
                            Ok, I have my projects here too, who cares?<br />
                            welcome here ANY WAYS...
                        </p>
                    </div>

                    {/* Astronaut — right side, smaller on mobile */}
                    <div className="absolute w-[220px] h-[330px] md:w-[400px] md:h-[600px] z-10 flex flex-col justify-center items-center -right-8 md:right-20 pointer-events-none md:pointer-events-auto opacity-60 md:opacity-100">
                        {/* Desktop-only text under astronaut */}
                        <p className="hidden md:block absolute top-140 left-45 -translate-x-1/2 z-20 text-gray-500 text-2xl text-[10px] text-center md:whitespace-nowrap">
                            Use the black spaces in the middle for being proud, can you see it?
                        </p>
                        <Astronaut />
                    </div>

                    {/* Scroll to explore cue — both mobile and desktop */}
                    <a href="#about-section" className="absolute bottom-32 md:bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
                        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
                        <HiOutlineChevronDoubleDown className="w-4 h-4 animate-bounce" />
                    </a>

                </div>
            </FadeIn>

            <section id="about-section">
                <About />
            </section>
        </>
    );
}