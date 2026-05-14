import { prisma } from "@/lib/prisma";
import ThoughtsIntro from "@/app/components/ThoughtsIntro";
import FadeIn from "@/app/components/FadeIn";
import ThoughtCard from "@/app/components/ThoughtCard";

export default async function Thoughts() {
    const thoughts = await prisma.thought.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <ThoughtsIntro />
            <FadeIn>
                <main className="px-6 py-16 mx-auto min-h-screen w-full max-w-7xl">
                    {thoughts.length === 0 ? (
                        <p className="text-zinc-500 text-center">Nothing yet.</p>
                    ) : (
                        <ul className="grid grid-cols-1 gap-15">
                            {thoughts.map((t) => (
                                <li key={t.id}>
                                    <ThoughtCard thought={t} />
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
            </FadeIn>
        </>
    );
}