import { prisma } from "@/lib/prisma";

export default async function Thoughts() {
    const thoughts = await prisma.thought.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="px-6 py-16 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Thoughts</h1>
            {thoughts.length === 0 ? (
                <p className="text-zinc-500">Nothing yet.</p>
            ) : (
                <ul className="space-y-8">
                    {thoughts.map((t) => (
                        <li key={t.id}>
                            <h2 className="text-xl font-semibold">{t.title}</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mt-2 whitespace-pre-wrap">
                                {t.body}
                            </p>
                            <time className="text-sm text-zinc-500 mt-2 block">
                                {t.createdAt.toLocaleDateString()}
                            </time>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
