"use client";

import { motion } from "framer-motion";

export default function FadeIn({
                                   children,
                                   delay = 0,
                                   duration = 1.7,
                               }: {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1}}
            viewport={{amount: 0.1 }}
            transition={{ duration, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}