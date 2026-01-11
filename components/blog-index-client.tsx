'use client'

import { ViewTransition } from 'react'
import Link from "next/link"
import { useState } from 'react'
import { IconSearch, IconX } from '@tabler/icons-react'
import type { PostWithMeta } from '@/lib/blog'

interface BlogIndexClientProps {
    posts: PostWithMeta[]
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
    const [query, setQuery] = useState('')

    const filteredPosts = posts.filter(({ slug, frontmatter }) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        const title = (frontmatter.title || '').toLowerCase()
        const description = (frontmatter.description || '').toLowerCase()
        return title.includes(q) || description.includes(q) || slug.includes(q)
    })

    const handleClear = () => {
        setQuery('')
    }

    return (
        <ViewTransition>
            <main className="min-h-screen px-6 py-16 md:py-24">
                <div className="mx-auto max-w-2xl">
                    <h1 className="mb-8 text-4xl font-serif font-medium tracking-tight text-foreground">
                        Blog
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative">
                            <IconSearch className="absolute left-0 top-1.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full border-0 border-b border-border bg-transparent pl-6 pr-6 py-2 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Posts List */}
                    <ul className="space-y-6">
                        {filteredPosts.map(({ slug, frontmatter, readingTime }) => (
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
                                                    {new Date(frontmatter.date).toLocaleDateString()}
                                                </span>
                                            </ViewTransition>
                                        )}
                                        {readingTime && (
                                            <span>{readingTime} min read</span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                        {filteredPosts.length === 0 && (
                            <li className="text-muted-foreground">No posts found.</li>
                        )}
                    </ul>
                </div>
            </main>
        </ViewTransition>
    )
}
