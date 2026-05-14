"use client";
import FadeIn from "@/app/components/FadeIn";
import { motion } from "framer-motion";
import Image from "next/image";


const AboutMeCard = () => {
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

                    </div>
                </div>
            </FadeIn>
        </>

    )
}

export default AboutMeCard