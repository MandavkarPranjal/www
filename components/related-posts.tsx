'use client'

import Link from 'next/link'
import type { PostWithMeta } from '@/lib/blog'

interface RelatedPostsProps {
    posts: PostWithMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null

    return (
        <aside className="mt-16 border-t border-border pt-8">
            <h2 className="mb-6 text-2xl font-serif font-medium text-foreground">Related Posts</h2>
            <ul className="space-y-4">
                {posts.map(({ slug, frontmatter, readingTime }) => (
                    <li key={slug}>
                        <Link
                            href={`/blog/${slug}`}
                            className="group block text-foreground hover:underline underline-offset-4"
                        >
                            <h3 className="font-medium">{frontmatter.title}</h3>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                {frontmatter.date && (
                                    <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
                                )}
                                {readingTime && (
                                    <span>{readingTime} min read</span>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
