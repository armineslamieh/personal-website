"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Astronaut from './Astronaut'

const links = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/dpb', label: 'DPB' },
    { href: '/projects', label: 'Projects' },
    { href: '/thoughts', label: 'Thoughts' },
]

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <>
            <nav className="absolute top-2 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 md:mx-10">
                <Link href="/" className="font-extrabold text-2xl text-white">
                    Armin Eslamieh
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex gap-20 lg:gap-30">
                    {links.slice(0, 4).map((l) => (
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
                    className="hidden md:block text-white hover:scale-125 transition-all duration-300"
                >
                    Thoughts →
                </Link>

                {/* Modern animated burger button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 group"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <span
                        className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out ${
                            isOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6 group-hover:w-7'
                        }`}
                    />
                    <span
                        className={`block h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${
                            isOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-7'
                        }`}
                    />
                    <span
                        className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out ${
                            isOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5 group-hover:w-7'
                        }`}
                    />
                </button>
            </nav>

            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-30 transition-opacity duration-500 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* Drawer with 3D scene */}
            <div
                className={`md:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm z-40 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Base dark background */}
                <div className="absolute inset-0 bg-zinc-950" />

                {/* 3D scene layer */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="w-2/3 h-2/3">
                        <Astronaut />
                    </div>
                </div>

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-orange-950/30" />

                {/* Right edge glow */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-400/50 to-transparent" />

                {/* Menu content */}
                <div className="relative h-full flex flex-col p-8 pt-24">
                    {/* Staggered links */}
                    <div className="flex flex-col gap-1">
                        {links.map((l, i) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    transitionDelay: isOpen ? `${i * 80 + 200}ms` : '0ms',
                                }}
                                className={`group relative text-white text-3xl font-bold py-3 transition-all duration-500 ${
                                    isOpen
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-8'
                                }`}
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
                        style={{ transitionDelay: isOpen ? '700ms' : '0ms' }}
                        className={`mt-auto flex flex-col gap-2 transition-all duration-500 ${
                            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <span className="text-white/40 uppercase tracking-widest text-[10px] font-semibold">
                            Based in
                        </span>
                        <span className="text-white/70 text-sm">Amsterdam, NL</span>
                    </div>
                </div>
            </div>
        </>
    )
}