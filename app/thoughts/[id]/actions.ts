"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function addComment(thoughtId: number, formData: FormData) {
    const author = String(formData.get("author") || "").trim()
    const body = String(formData.get("body") || "").trim()

    if (!author || !body) return { error: "Name and comment are required." }
    if (author.length > 60) return { error: "Name is too long." }
    if (body.length > 1000) return { error: "Comment is too long." }

    await prisma.comment.create({
        data: { author, body, thoughtId },
    })

    revalidatePath(`/thoughts/${thoughtId}`)
    return { success: true }
}

export async function deleteComment(commentId: number, thoughtId: number) {
    await prisma.comment.delete({ where: { id: commentId } })
    revalidatePath(`/thoughts/${thoughtId}`)
}