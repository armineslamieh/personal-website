import { prisma } from "@/lib/prisma";
import ThoughtsIntro from "@/app/components/ThoughtsIntro";
import FadeIn from "@/app/components/FadeIn";
import ThoughtsCarousel from "@/app/components/ThoughtsCarousel";

export default async function Thoughts() {
    const thoughts = await prisma.thought.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <ThoughtsIntro />
            <FadeIn>
                <section>
                    <div className="min-h-screen flex items-center overflow-hidden
                    bg-[radial-gradient(ellipse_at_bottom_left,_#ff4500_0%,_#c2410c_25%,_#3a2419_55%,_#1f1f23_85%)]">
                        <ThoughtsCarousel thoughts={thoughts} />
                    </div>
                </section>
            </FadeIn>
        </>
    );
}