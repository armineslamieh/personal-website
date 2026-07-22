"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Astronaut = dynamic(() => import("@/app/components/Astronaut"), { ssr: false });

const links = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/projects", label: "Projects" },
    { href: "/thoughts", label: "Thoughts" },
];

const Nav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showDrawerAstronaut, setShowDrawerAstronaut] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const isThoughtsPage = pathname.startsWith("/thoughts");

    // Wait one frame after mount before enabling transitions (prevents drawer slide-in on refresh)
    useEffect(() => {
        const t = setTimeout(() => setHasMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    // Mount astronaut only after drawer first opens — then keep it mounted to avoid WebGL context churn
    useEffect(() => {
        if (isOpen && !showDrawerAstronaut) {
            const t = setTimeout(() => setShowDrawerAstronaut(true), 350);
            return () => clearTimeout(t);
        }
    }, [isOpen, showDrawerAstronaut]);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* Top nav bar */}
            <nav className={`absolute top-2 md:top-2 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 md:mx-10 ${isOpen ? "pointer-events-none" : ""}`}>
                <Link href="/" className="flex items-center gap-2 pointer-events-auto">
                    <span className=" text-2xl font-bold text-white">Armin Eslamieh</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex gap-20 lg:gap-30 pointer-events-auto">
                    {links.slice(0, 3).map((l) => (
                        <Link
                            href={l.href}
                            key={l.href}
                            className="text-white hover:scale-125 transition-all duration-300"
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>

                <Link
                    href="/thoughts"
                    className={`hidden md:block pointer-events-auto ${isThoughtsPage ? "text-orange-400" : "text-white"} hover:scale-125 transition-all duration-300`}
                >
                    Thoughts →
                </Link>

                {/* Modern animated burger button — always clickable */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 group pointer-events-auto"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <span
                        className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out ${isOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6 group-hover:w-7"}`}
                    />
                    <span
                        className={`block h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? "w-0 opacity-0" : "w-4 group-hover:w-7"}`}
                    />
                    <span
                        className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out ${isOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-5 group-hover:w-7"}`}
                    />
                </button>
            </nav>

            {/* Backdrop — clicking closes the menu */}
            <div
                onClick={() => setIsOpen(false)}
                className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-30 ${hasMounted ? "transition-opacity duration-500" : ""} ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />

            {/* Drawer */}
            <div
                className={`md:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm z-40 transform ${hasMounted ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""} ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Glassy dark background */}
                <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-2xl" />

                {/* Astronaut layer — smaller, stays mounted once loaded */}
                {showDrawerAstronaut && (
                    <div
                        className="absolute pointer-events-none overflow-visible flex items-center justify-center"
                        style={{
                            top: "15%",
                            left: "10%",
                            width: "80%",
                            height: "55%",
                            opacity: 0.3,
                        }}
                    >
                        <Astronaut />
                    </div>
                )}

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-orange-950/20" />

                {/* Right edge glow */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-400/50 to-transparent" />

                {/* Menu content */}
                <div className="relative h-full flex flex-col p-8 pt-24">
                    {/* Armin Eslamieh — now a Link to home */}
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
                        className={`group relative text-white text-3xl font-bold pb-3 mb-6 transition-all duration-500 border-b border-orange-400/60 w-fit ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                    >
                        <span className="group-hover:text-orange-400 transition-colors duration-300">
                            Armin Eslamieh
                        </span>
                    </Link>

                    {/* Staggered links */}
                    <div className="flex flex-col gap-1">
                        {links.map((l, i) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    transitionDelay: isOpen ? `${i * 80 + 250}ms` : "0ms",
                                }}
                                className={`group relative text-white text-3xl font-bold py-3 transition-all duration-500 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                            >
                                <span className="relative inline-block">
                                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-orange-400 opacity-0 group-hover:opacity-100 group-hover:-left-8 transition-all duration-300">
                                        →
                                    </span>
                                    <span className="group-hover:text-orange-400 transition-colors duration-300">
                                        {l.label}
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Footer info */}
                    <div
                        style={{ transitionDelay: isOpen ? "800ms" : "0ms" }}
                        className={`mt-auto flex flex-col gap-2 transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <span className="text-white/40 uppercase tracking-widest text-[10px] font-semibold">
                            Based in
                        </span>
                        <span className="text-white/70 text-sm">Amsterdam, NL</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;