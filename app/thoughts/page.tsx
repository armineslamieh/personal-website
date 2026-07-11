import { prisma } from "@/lib/prisma"
import ThoughtsIntro from "@/app/components/ThoughtsIntro"
import ThoughtsCarousel from "@/app/components/ThoughtsCarousel"

const ThoughtsPage = async () => {
    const thoughts = await prisma.thought.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            comments: {
                take: 2,
                orderBy: { createdAt: "desc" },
            },
        },
    })

    return (
        <main>
            <ThoughtsIntro />
            <ThoughtsCarousel thoughts={thoughts} />
        </main>
    )
}

export default ThoughtsPage