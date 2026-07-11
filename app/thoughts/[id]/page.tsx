import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { prisma } from "@/lib/prisma"
import Comments from "./Comments"

type Params = { params: Promise<{ id: string }> }

const TAG_STYLES: Record<string, string> = {
    OVERTHINK: "bg-black/40 text-orange-200 border-orange-300/50",
    PROJECT: "bg-black/40 text-blue-200 border-blue-300/50",
    STORY: "bg-black/40 text-purple-200 border-purple-300/50",
    VENTING: "bg-black/40 text-red-200 border-red-300/50",
}

const ThoughtDetailPage = async ({ params }: Params) => {
    const { id } = await params
    const thoughtId = Number(id)

    if (isNaN(thoughtId)) notFound()

    const thought = await prisma.thought.findUnique({
        where: { id: thoughtId },
        include: { comments: { orderBy: { createdAt: "desc" } } },
    })
    if (!thought) notFound()

    const excerpt = thought.body.split(/[.!?]/)[0] + "."

    return (
        <main className="relative min-h-screen mt-20">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_#ff4500_0%,_#c2410c_25%,_#3a2419_55%,_#1f1f23_85%)]" />

            <div className="max-w-6xl mx-auto px-6 pt-20 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-[480px_1fr] gap-12 items-start">

                    <aside className="md:sticky md:top-20 flex flex-col gap-5">
                        {thought.coverImage ? (
                            <Image
                                src={thought.coverImage}
                                alt={thought.title}
                                width={600}
                                height={450}
                                sizes="280px"
                                className="w-full h-auto rounded-xl"
                                priority
                            />
                        ) : null}

                        <p className="text-white text-sm leading-relaxed">
                            {excerpt}
                        </p>

                        <div className="h-px bg-white/20" />

                        <div className="flex flex-col gap-1 text-xs text-white/80">
                            <span className="text-white uppercase tracking-widest text-[10px] font-semibold">Published</span>
                            <time dateTime={thought.createdAt.toISOString()}>
                                {thought.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                            </time>
                            <span>{thought.readMinutes} min read</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-white uppercase tracking-widest text-[10px] font-semibold">Tags</span>
                            <div className="flex flex-wrap gap-2">
                                {thought.tags.map((tag) => (
                                    <span key={tag} className="text-[11px] uppercase tracking-wider text-white">
                    #{tag.toLowerCase()}
                </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-white uppercase tracking-widest text-[10px] font-semibold">Contact</span>
                            <Link href="/contact" className="text-xs text-white hover:text-white/70 transition-colors w-fit underline underline-offset-4 decoration-white/40">
                                Get in touch →
                            </Link>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-white uppercase tracking-widest text-[10px] font-semibold">Join in</span>
                            <p className="text-xs text-white/80 leading-relaxed">
                                Scroll to the end to share your thoughts.
                            </p>
                        </div>

                        <div className="pt-3 border-t border-white/10">
                            <Link href="/thoughts#thoughts" className="text-xs text-white hover:text-orange-400 transition-colors">
                                ← All thoughts
                            </Link>
                        </div>
                    </aside>
                    <article className="flex flex-col pt-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-8">
                            {thought.title}
                        </h1>

                        <div className="text-white/80 text-base leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <p className="mb-4">{children}</p>,
                                    h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-8 mb-4">{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-lg font-bold text-white mt-6 mb-3">{children}</h3>,
                                    a: ({ href, children }) => <Link href={href || "#"} className="text-orange-400 hover:text-orange-300 underline">{children}</Link>,
                                    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                    em: ({ children }) => <em className="italic text-white/90">{children}</em>,
                                    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>,
                                    li: ({ children }) => <li className="text-white/80">{children}</li>,
                                    img: ({ src, alt }) => {
                                        if (typeof src !== "string") return null
                                        return <Image src={src} alt={alt || ""} width={1200} height={800} className="w-full h-auto rounded-xl my-6" />
                                    },
                                }}
                            >
                                {thought.body}
                            </ReactMarkdown>
                        </div>

                        <Comments thoughtId={thought.id} comments={thought.comments} isAdmin={true} />
                    </article>

                </div>
            </div>
        </main>
    )
}

export default ThoughtDetailPage