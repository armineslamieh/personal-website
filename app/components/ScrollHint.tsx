
"use client";
import { createPortal } from "react-dom";
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";
import { useEffect, useState } from "react";

export default function ScrollHint() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    return createPortal(
        <a href="#projects"
           className="fixed bottom-12 right-12 flex flex-col items-center gap-2 text-white/60 hover:text-orange-400 transition-colors group z-50"
        >
            <HiOutlineChevronDoubleDown className="w-6 h-6 animate-bounce group-hover:animate-none" />
        </a>,
        document.body
    );
}