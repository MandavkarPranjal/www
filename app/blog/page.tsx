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

            <main className="min-h-screen px-6 pb-20 pt-24 md:px-12">
                <div className="mx-auto w-full max-w-3xl space-y-10">
                    <header className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">Notebook</p>
                        <h1 className="text-balance text-4xl font-serif font-medium tracking-tight text-foreground sm:text-5xl">
                            Thoughts on engineering, taste, and working in public.
                        </h1>
                        <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                            A collection of notes, experiments, and essays. I post when something nags at me long enough to type it out.
                        </p>
                    </header>

                    <ul className="grid gap-4">
                        {posts.map(({ slug, frontmatter }) => (
                            <li key={slug}>
                                <Link
                                    href={`/blog/${slug}`}
                                    className="group flex flex-col gap-2 rounded-3xl border border-border/60 bg-card/50 px-6 py-5 transition hover:border-foreground/40 hover:bg-card"
                                >
                                    <ViewTransition name={`title-${slug}`}>
                                        <h2 className="text-balance text-2xl font-semibold text-foreground transition-colors group-hover:text-foreground/90">
                                            {frontmatter.title || slug}
                                        </h2>
                                    </ViewTransition>
                                    {frontmatter.description && (
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {frontmatter.description}
                                        </p>
                                    )}
                                    {frontmatter.date && (
                                        <ViewTransition name={`date-${slug}`}>
                                            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                                                {new Date(frontmatter.date).toLocaleDateString(undefined, {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </ViewTransition>
                                    )}
                                </Link>
                            </li>
                        ))}
                        {posts.length === 0 && (
                            <li className="rounded-3xl border border-dashed border-border/50 bg-card/40 px-6 py-8 text-center text-muted-foreground">
                                Nothing yet. Subscribe to the RSS feed?
                            </li>
                        )}
                    </ul>
                </div>
            </main>
        </ViewTransition>
    )
}
