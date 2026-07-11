"use client";
import FadeIn from "@/app/components/FadeIn";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaMediumM,} from 'react-icons/fa';
import { SiX } from 'react-icons/si'
import { HiOutlineChevronDoubleDown } from 'react-icons/hi2'




const AboutMeCard = () => {

    const socialLinks = [
        {Icon: FaLinkedin, href: 'https://www.linkedin.com/in/armin-eslamieh', label: 'LinkedIn'},
        {Icon: FaGithub, href: 'https://github.com/ArminEslamieh', label: 'GitHub'},
        {Icon: FaMediumM, href: 'https://medium.com/@armin.eslamieh', label: 'Medium'},
        {Icon: SiX, href: 'https://x.com/ArminEslamieh', label: 'X'},
    ]




    return (
        <>
            <FadeIn>
                <div className=" relative flex justify-center items-center h-screen
              bg-[radial-gradient(ellipse_at_bottom_left,_#ff4500_0%,_#c2410c_25%,_#3a2419_55%,_#1f1f23_85%)]">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10
                    shadow-2xl h-[600px] w-3/4 mt-30 rounded-3xl z-10 relative flex flex-row">

                        <Image src="/armin.jpg"
                               alt="Armin Eslamieh"
                               width={1000}
                               height={1000}
                               className="object-cover object-[center_14%] w-2/5 h-full rounded-l-3xl
                               [mask-image:linear-gradient(to_right,black_60%,transparent_100%)]"
                               priority
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                            className="flex flex-col justify-center h-full"
                        >

                        <div className="flex flex-row gap-10 px-12 max-w-xl ml-15 absolute top-20">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                >
                                    <Icon className="w-8 h-8 text-white hover:text-orange-400 transition-colors" />
                                </a>
                                ))}
                        </div>

                        <div className="flex flex-col justify-center gap-6 px-12 max-w-xl ml-15">
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                Hi, I'm Armin.
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                A developer based in [city], building things for the web that feel as good as they work. I care about thoughtful interfaces, clean code, and the small details most people scroll past.
                                When I'm not in front of a screen, you'll probably find me [hobby], [hobby], or arguing about the right way to make coffee.
                            </p>
                            <a href="/contact" className="text-orange-400 hover:text-orange-300 transition-colors w-fit">
                                Get in touch →
                            </a>
                        </div>
                        </motion.div>

                        <a href="/projects"
                           className="fixed bottom-8 right-8 flex flex-col items-center gap-2 text-white/60 hover:text-orange-400 transition-colors group"
                        >
                            <span className="text-sm tracking-wider uppercase">Projects</span>
                            <HiOutlineChevronDoubleDown className="w-6 h-6 animate-bounce group-hover:animate-none" />
                        </a>

                    </div>
                </div>
            </FadeIn>
        </>

    )
}

export default AboutMeCard