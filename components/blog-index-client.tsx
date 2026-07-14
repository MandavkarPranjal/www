'use client'

import { ViewTransition } from 'react'
import Link from "next/link"
import type { PostWithMeta } from '@/lib/blog'

interface BlogIndexClientProps {
    posts: PostWithMeta[]
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const currentYear = new Date().getFullYear()
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()

    if (year === currentYear) {
        return `${day} ${month}`
    }
    return `${day} ${month} ${year}`
}


export function BlogIndexClient({ posts }: BlogIndexClientProps) {
    return (
        <ViewTransition>
            <main className="min-h-screen px-6 py-16 md:py-24 pb-24 md:pb-24">
                <div className="mx-auto max-w-2xl">
                    <h1 className="mb-8 text-4xl font-serif font-medium tracking-tight text-foreground">
                        Blog
                    </h1>

                    {/* Posts List */}
                    <ul className="space-y-6">
                        {posts.map((post) => {
                            const slug = post.slug
                            const frontmatter = post.frontmatter
                            const readingTime = post.readingTime
                            return (
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
                                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                        {frontmatter.date && (
                                            <ViewTransition name={`date-${slug}`}>
                                                <span>
                                                    {formatDate(frontmatter.date)}
                                                </span>
                                            </ViewTransition>
                                        )}
                                        {readingTime && (
                                            <span>{readingTime} min read</span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        )})}
                    </ul>
                </div>
            </main>
        </ViewTransition>
    )
}
