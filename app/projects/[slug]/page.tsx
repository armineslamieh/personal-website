import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ slug: string }> };

const TYPE_CONFIG = {
    ART: {
        gradient: "bg-[radial-gradient(ellipse_at_top_right,_#4a1a5c_0%,_#2d0f3e_25%,_#1a0e2a_55%,_#0a0714_85%)]",
        accent: "text-fuchsia-300",
        accentHover: "hover:text-fuchsia-200",
        accentBorder: "border-fuchsia-400/40",
        accentBg: "bg-fuchsia-500/10",
        label: "Art",
    },
    ENGINEERING: {
        gradient: "bg-[radial-gradient(ellipse_at_top_right,_#0f4c5c_0%,_#0a3d4a_25%,_#0f1f2e_55%,_#050a14_85%)]",
        accent: "text-cyan-300",
        accentHover: "hover:text-cyan-200",
        accentBorder: "border-cyan-400/40",
        accentBg: "bg-cyan-500/10",
        label: "Engineering",
    },
};

const ProjectDetailPage = async ({ params }: Params) => {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) notFound();

    const config = TYPE_CONFIG[project.type];

    return (
        <main className="relative min-h-screen">
            <div className={`fixed inset-0 -z-10 ${config.gradient}`} />

            <div className="max-w-7xl mx-auto px-6 pt-20 pb-20">

                <Link href="/projects" className="text-xs text-white/50 hover:text-white transition-colors mb-12 inline-block uppercase tracking-widest">← All projects</Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

                    <div className="flex flex-col gap-6 lg:pt-8">
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] uppercase tracking-[0.3em] ${config.accent} font-semibold`}>{config.label}</span>
                            {project.year ? (
                                <>
                                    <span className="text-white/30">·</span>
                                    <span className="text-white/60 text-sm">{project.year}</span>
                                </>
                            ) : null}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">{project.title}</h1>

                        <p className="text-white/70 text-lg leading-relaxed max-w-md">{project.shortDescription}</p>

                        {project.role ? (
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="text-white/40 uppercase tracking-widest text-[10px] font-semibold">Role</span>
                                <span className="text-white/80 text-sm">{project.role}</span>
                            </div>
                        ) : null}

                        {project.techStack.length > 0 ? (
                            <div className="flex flex-col gap-2 mt-2">
                                <span className="text-white/40 uppercase tracking-widest text-[10px] font-semibold">Built with</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className={`text-xs px-3 py-1 rounded-full border ${config.accentBorder} ${config.accentBg} text-white/80`}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {project.links.length > 0 ? (
                            <div className="flex flex-col gap-2 mt-2">
                                <span className="text-white/40 uppercase tracking-widest text-[10px] font-semibold">Links</span>
                                <div className="flex flex-wrap gap-3">
                                    {project.links.map((link, i) => {
                                        let label = link;
                                        try {
                                            const url = new URL(link);
                                            label = url.hostname.replace(/^www\./, "");
                                        } catch { }
                                        return (
                                            <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={`text-sm ${config.accent} ${config.accentHover} transition-colors underline underline-offset-4 decoration-white/30`}>
                                                {label} ↗
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                        <Image src={project.coverImage} alt={project.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
                    </div>
                </div>

                <article className="max-w-3xl mx-auto">
                    <div className="text-white/80 text-base leading-relaxed">
                        <ReactMarkdown
                            components={{
                                p: ({ children }) => <p className="mb-4">{children}</p>,
                                h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-lg font-bold text-white mt-8 mb-3">{children}</h3>,
                                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className={`${config.accent} ${config.accentHover} underline underline-offset-4 decoration-white/30`}>{children}</a>,
                                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                em: ({ children }) => <em className="italic text-white/90">{children}</em>,
                                ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>,
                                li: ({ children }) => <li className="text-white/80">{children}</li>,
                                img: ({ src, alt }) => {
                                    if (typeof src !== "string") return null;
                                    return <Image src={src} alt={alt || ""} width={1200} height={800} className="w-full h-auto rounded-xl my-8" />;
                                },
                                blockquote: ({ children }) => <blockquote className={`border-l-2 ${config.accentBorder} pl-6 my-6 italic text-white/70`}>{children}</blockquote>,
                            }}
                        >
                            {project.description}
                        </ReactMarkdown>
                    </div>
                </article>

            </div>
        </main>
    );
};

export default ProjectDetailPage;