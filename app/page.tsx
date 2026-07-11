"use client";

import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";
import About from "@/app/about/page"
import {HiOutlineChevronDoubleDown} from "react-icons/hi2";
import TimeTracker from "@/app/components/TimeTracker";
import dynamic from "next/dynamic";

const Astronaut = dynamic(() => import("@/app/components/Astronaut"), { ssr: false });

export default function Home() {
    return (
        <>
            <FadeIn>
                <div className="relative w-full h-screen flex flex-col justify-center items-center">
                    <Image src="/ChatGPT Image Jul 1, 2026, 07_58_42.png" alt="Armin Eslamieh" fill className="object-cover object-[center_14%] scale-100" priority />



                    <div className="absolute h-1/2 left-4 lg:bottom-33 md:left-15 md:bottom-30 max-w-xs md:max-w-md">
                        <h2 className="text-3xl font-semibold mb-1">I'm Armin</h2>
                        <p className="text-lg leading-relaxed">
                            This is not a portfolio. I just think too much<br />
                            so why not others hear them too?<br />
                            Ok, I have my projects here too, who cares?<br />
                            welcome here ANY WAYS...
                        </p>
                    </div>

                    {/* Astronaut — right side */}
                    <div className="absolute right-0  w-[400px] h-[600px] z-10 flex flex-col justify-center items-center right-20">
                        <p className="absolute top-140 left-45 -translate-x-1/2 z-20 text-gray-500 text-2xl text-[10px] text-center md:whitespace-nowrap">
                            you can't find this on the internet
                        </p>
                        <p className="absolute right-30 -translate-x-1/2 z-20 text-gray-500 text-2xl text-[10px] text-center md:whitespace-nowrap rotate-90">
                            Use the black spaces in the middle for being proud, can you see it?
                        </p>
                        <Astronaut />
                    </div>

                </div>
            </FadeIn>

            <section id="projects">
                <About/>
            </section>
        </>
    );
}