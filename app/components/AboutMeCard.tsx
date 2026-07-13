"use client";
import FadeIn from "@/app/components/FadeIn";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaMediumM, FaSpotify } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi2';

const AboutMeCard = () => {
    return (
        <>
            <FadeIn>
                <div className="relative flex justify-center items-center min-h-screen py-8 md:py-0 bg-[radial-gradient(ellipse_at_bottom_left,_#ff4500_0%,_#c2410c_25%,_#3a2419_55%,_#1f1f23_85%)]">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl w-[92%] md:w-3/4 md:h-[600px] mt-20 md:mt-30 mb-20 rounded-3xl z-10 relative flex flex-col md:flex-row overflow-hidden">
                        <Image src="/armin.jpg" alt="Armin Eslamieh" width={1000} height={1000} className="h-[300px] w-full object-cover object-[center_14%] rounded-t-3xl [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] sm:h-[380px] lg:h-full lg:w-2/5 lg:rounded-l-3xl lg:rounded-tr-none lg:[mask-image:linear-gradient(to_right,black_60%,transparent_100%)]" priority />
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} className="flex flex-col justify-center h-full w-full md:w-3/5 px-6 md:px-15 py-8 md:py-0 relative">
                            <div className="flex flex-row gap-6 md:gap-10 md:absolute md:top-20 mb-6 md:mb-0">
                                <a href="https://linkedin.com/in/armineslamieh" target="_blank" rel="noopener noreferrer"><FaLinkedin className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-orange-400 transition-colors" /></a>
                                <a href="https://github.com/armineslamieh" target="_blank" rel="noopener noreferrer"><FaGithub className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-orange-400 transition-colors" /></a>
                                <a href="https://medium.com/@armineslamieh" target="_blank" rel="noopener noreferrer"><FaMediumM className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-orange-400 transition-colors" /></a>
                                <a href="https://x.com/armineslamieh" target="_blank" rel="noopener noreferrer"><SiX className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-orange-400 transition-colors" /></a>
                                <a href="https://open.spotify.com/artist/5iQFkugdyyhlp7CuqJPTVI" target="_blank" rel="noopener noreferrer"><FaSpotify className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-orange-400 transition-colors" /></a>
                            </div>
                            <div className="flex flex-col gap-4 md:gap-6 md:max-w-xl">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight lg:mt-10">Hi, I&apos;m Armin.</h2>
                                <p className="text-sm md:text-lg text-white/70 leading-relaxed">Somewhere in a folder called "About Me drafts" there are 14 versions of this paragraph. This is the 15th. It won't be the last.
                                    I build things for the web — mostly engineering, sometimes stranger things that don't fit on a resume. I care about the details most people scroll past: how a hover feels, why a paragraph breaks where it does, whether a page respects your attention or steals it.
                                    I live in Amsterdam. I keep the left side of my brain busy with code and the right side awake with everything else.
                                    You're on my site. That should tell you the rest.</p>
                                <a href="/contact" className="text-sm md:text-base text-orange-400 hover:text-orange-300 transition-colors w-fit">Get in touch →</a>
                            </div>
                        </motion.div>
                        <a href="/projects" className="hidden md:flex fixed bottom-8 right-8 flex-col items-center gap-2 text-white/60 hover:text-orange-400 transition-colors group">
                            <span className="text-sm tracking-wider uppercase">Projects</span>
                            <HiOutlineChevronDoubleDown className="w-6 h-6 animate-bounce group-hover:animate-none" />
                        </a>
                    </div>
                    <a href="/projects" className="md:hidden absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 hover:text-orange-400 transition-colors group z-20">
                        <span className="text-[10px] tracking-widest uppercase">Projects</span>
                        <HiOutlineChevronDoubleDown className="w-4 h-4 animate-bounce group-hover:animate-none" />
                    </a>
                </div>
            </FadeIn>
        </>
    );
};

export default AboutMeCard;