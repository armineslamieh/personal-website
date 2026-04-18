import Image from "next/image";

export default function Home() {
  return (
      <div>
          <Image src="/armin.jpg" alt="Armin Eslamieh" fill className="object-cover object-[center_14%] scale-100" priority />
          <h2 className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center
  md:whitespace-nowrap px-4 drop-shadow-lg">
              Welcome To One Of My Brain’s Rooms
          </h2>
          <div className="absolute h-1/2 left-4 md:left-15 bottom-40 md:bottom-30 max-w-xs md:max-w-md">
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
  );
}
