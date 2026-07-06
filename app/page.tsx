import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";
import About from "@/app/about/page"
import {HiOutlineChevronDoubleDown} from "react-icons/hi2";
import TimeTracker from "@/app/components/TimeTracker";

export default function Home() {
  return (<>

      <FadeIn>
          <div className="relative w-full h-screen">
              <Image src="/ChatGPT Image Jul 1, 2026, 07_58_42 PM.png" alt="Armin Eslamieh" fill className="object-cover object-[center_14%] scale-100" priority />
              <p className="absolute bottom-78 left-320 -translate-x-1/2 z-20 text-gray-500 text-2xl text-[10px] text-center
      md:whitespace-nowrap">
                you can't find this on the internet
              </p>
              <p className="absolute bottom-150 left-319 -translate-x-1/2 z-20 text-gray-500 text-2xl text-[10px] text-center
                    md:whitespace-nowrap rotate-90">
                  Use the black spaces for you...
              </p>
              <div className="absolute h-1/3 left-4 lg:bottom-33 md:left-15 md:bottom-30 max-w-xs md:max-w-md">
              <h2 className="text-3xl font-semibold mb-1">I'm Armin</h2>
                <p className="text-lg leading-relaxed">
                  This is not a portfolio. I just think too much
                    <br />
                  so why not others hear them too?
                  <br />
                  Ok, I have my projects here too, who cares?
                  <br />
                  welcome here ANY WAYS...
                </p>

              </div>
          </div>
      </FadeIn>
      <section id="projects">
          <About/>
      </section>

      </>
  );
}
