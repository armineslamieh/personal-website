"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const imageCaption = (
    <>
        <span className="font-medium text-white/70">M87*</span> — the first
        black hole ever imaged, captured in 2019 by the Event Horizon Telescope.
        You&apos;ll find this image throughout my work and almost everywhere
        connected to me.
    </>
);

const thoughtText = (
    <>
        In my opinion, we people seem very far and strange from each other.
        However, I think inside we have a lot of common things. We are kind, we
        care about each other, but we are scared of each other at the same time,
        because we do not know anyone, and this BLACK HOLE of emptiness about
        anything makes us scared. We just need to be aware of each
        other&apos;s THOUGHTS.
    </>
);

export default function ThoughtsIntro() {
    return (
        <>
            {/* Mobile */}
            <section
                className="
                    relative min-h-[100svh] overflow-hidden
                    bg-[#0A0505] md:hidden
                "
            >
                <div className="relative pt-8">
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.15,
                            y: 110,
                        }}
                        animate={{
                            opacity: [0, 1, 1],
                            scale: [0.15, 1.05, 1],
                            y: [110, 110, 20],
                        }}
                        transition={{
                            duration: 2.8,
                            times: [0, 0.55, 1],
                            ease: "easeInOut",
                        }}
                        className="
                            relative -ml-[10vw]
                            h-[56svh] w-[120vw]
                        "
                    >
                        <Image
                            src="/hires.jpg"
                            alt="M87 black hole captured by the Event Horizon Telescope"
                            fill
                            priority
                            unoptimized
                            sizes="120vw"
                            className="object-contain object-center"
                        />

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 2.35,
                                ease: "easeOut",
                            }}
                            className="
                                absolute left-1/2 top-[68%] z-10
                                w-[72%] -translate-x-1/2
                                text-center text-[9px] leading-4
                                tracking-[0.03em] text-white/45
                            "
                        >
                            {imageCaption}
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 2.6,
                        ease: "easeOut",
                    }}
                    className="relative z-10 px-6 pb-24 pt-2"
                >
                    <h1 className="mb-5 text-4xl font-bold text-white">
                        Thoughts
                    </h1>

                    <p className="text-base leading-8 text-white/90">
                        {thoughtText}
                    </p>
                </motion.div>
            </section>

            {/* Desktop — original layout */}
            <section
                className="
                    relative hidden h-screen min-h-screen
                    items-center overflow-hidden md:flex
                    bg-[#0A0505]
                "
            >
                <motion.div
                    initial={{
                        scale: 0,
                        opacity: 0,
                    }}
                    animate={{
                        scale: [0, 1.2, 1.5],
                        opacity: [0, 1, 1],
                        x: ["0%", "0%", "20%"],
                    }}
                    transition={{
                        duration: 3.2,
                        times: [0, 0.5, 1],
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/hires.jpg"
                        alt="M87 black hole captured by the Event Horizon Telescope"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-contain"
                    />
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -80,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 2.3,
                        ease: "easeOut",
                    }}
                    className="relative z-10 ml-20 max-w-md"
                >
                    <h1 className="mb-4 text-5xl font-bold text-white">
                        Thoughts
                    </h1>

                    <p className="text-lg leading-relaxed text-zinc-300">
                        {thoughtText}
                    </p>
                </motion.div>

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 2.7,
                        ease: "easeOut",
                    }}
                    className="
                        absolute left-[70%] top-[74%] z-10
                        w-[470px] max-w-[32vw]
                        -translate-x-1/2
                        text-center text-xs leading-5
                        tracking-[0.05em] text-white/45
                    "
                >
                    {imageCaption}
                </motion.p>
            </section>
        </>
    );
}