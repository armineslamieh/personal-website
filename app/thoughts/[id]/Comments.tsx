"use client"

import { useState, useTransition } from "react"
import { addComment, deleteComment } from "./actions"

type Comment = {
    id: number
    author: string
    body: string
    createdAt: Date
}

type Props = {
    thoughtId: number
    comments: Comment[]
    isAdmin?: boolean
}

const Comments = ({ thoughtId, comments, isAdmin = false }: Props) => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [formKey, setFormKey] = useState(0)

    const handleSubmit = (formData: FormData) => {
        setError(null)
        startTransition(async () => {
            const result = await addComment(thoughtId, formData)
            if (result?.error) {
                setError(result.error)
            } else {
                setFormKey((k) => k + 1)
            }
        })
    }

    const handleDelete = (commentId: number) => {
        if (!confirm("Delete this comment?")) return
        startTransition(async () => {
            await deleteComment(commentId, thoughtId)
        })
    }

    return (
        <section className="mt-16 pt-8 border-t border-white/10">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Join the conversation
                </h2>
                <p className="text-white/70 text-sm">
                    {comments.length === 0
                        ? "No comments yet — share your thoughts below and start the discussion."
                        : `${comments.length} ${comments.length === 1 ? "person has" : "people have"} shared their thoughts. Add yours below.`}
                </p>
            </div>

            {/* Comment list */}
            {comments.length > 0 && (
                <div className="flex flex-col gap-6 mb-10">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex flex-col gap-2 pb-6 border-b border-white/5 last:border-b-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-white font-semibold text-sm">{comment.author}</span>
                                    <span className="text-white/40 text-xs">
                                        {new Date(comment.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                    </span>
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        disabled={isPending}
                                        className="text-xs text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{comment.body}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Comment form */}
            <form key={formKey} action={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-base font-semibold text-white">Leave a comment</h3>

                <input
                    name="author"
                    placeholder="Your name"
                    required
                    maxLength={60}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-400/50 transition-colors"
                />

                <textarea
                    name="body"
                    placeholder="Share your thoughts..."
                    required
                    maxLength={1000}
                    rows={4}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-400/50 transition-colors resize-none"
                />

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                    type="submit"
                    disabled={isPending}
                    className="self-start bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Posting..." : "Post comment"}
                </button>
            </form>
        </section>
    )
}

export default Comments