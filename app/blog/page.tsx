import { ViewTransition } from 'react'
import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
    title: "Blog",
    description: "Notes and posts",
}

export default function BlogIndex() {
    const posts = getAllPosts()
    return (
        <ViewTransition>

            <main className="min-h-screen px-6 py-16 md:py-24">
                <div className="mx-auto max-w-2xl">
                    <h1 className="mb-8 text-4xl font-serif font-medium tracking-tight text-foreground">
                        Blog
                    </h1>
                    <ul className="space-y-6">
                        {posts.map(({ slug, frontmatter }) => (
                            <li key={slug} className="group">
                                <Link
                                    href={`/blog/${slug}`}
                                    className="block text-foreground"
                                >
                                    <ViewTransition name={`title-${slug}`}>
                                        <h2 className="text-xl font-medium group-hover:underline underline-offset-4">
                                            {frontmatter.title || slug}
                                        </h2>
                                    </ViewTransition>
                                    {frontmatter.description && (
                                        <p className="mt-1 text-muted-foreground">
                                            {frontmatter.description}
                                        </p>
                                    )}
                                    {frontmatter.date && (
                                        <ViewTransition name={`date-${slug}`}>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {new Date(frontmatter.date).toLocaleDateString()}
                                            </p>
                                        </ViewTransition>
                                    )}
                                </Link>
                            </li>
                        ))}
                        {posts.length === 0 && (
                            <li className="text-muted-foreground">No posts yet.</li>
                        )}
                    </ul>
                </div>
            </main>
        </ViewTransition>
    )
}
