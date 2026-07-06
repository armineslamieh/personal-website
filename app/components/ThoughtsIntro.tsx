"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ThoughtsIntro() {
    return (
        <section className="relative h-screen flex items-center overflow-hidden min-h-screen">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
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
                    alt=""
                    fill
                    priority
                    className="object-contain"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 2.3, ease: "easeOut" }}
                className="relative z-10 ml-20 max-w-md"
            >
                <h1 className="text-5xl font-bold mb-4">Thoughts</h1>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                    In my opinion, we people seem very far and strange from each other. However,
                    I think inside we have a lot of common things.
                    We are kind, we care about each other, but we are scared of each other at the same time,
                    because we do not know anyone, and this BLACK HOLE of emptiness about anything makes us scared.
                    We just need to be aware of each other's THOUGHTS.

                </p>
            </motion.div>
        </section>
    );
}