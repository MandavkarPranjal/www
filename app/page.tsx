import Link from "next/link"
import { ArrowUpRight, Mail, MoveRight } from "lucide-react"

import { GithubInfo } from "@/components/github-info"
import { getAllPosts } from "@/lib/blog"

const projects = [
    {
        name: "WhataDuck",
        href: "https://whataduck.pr5.dev",
        repo: "whataduck",
        description: "A lightning-fast meta search that keeps keyboard flow intact and ships with DuckDuckGo-style bangs.",
        tech: ["Next 16", "Cloudflare", "TanStack"],
    },
    {
        name: "OpenGraph CLI",
        href: "https://www.npmjs.com/package/opengraph-cli",
        repo: "opengraph-cli",
        description: "CLI to inspect OpenGraph metadata (even from localhost) so you can tweak previews without re-deploying.",
        tech: ["Node", "Commander", "Shiki"],
    },
]

const statusBadges = [
    "Full-stack engineer",
    "Mumbai → remote",
    "Design-infused shipping",
]

export default function Home() {
    const posts = getAllPosts().slice(0, 2)

    return (
        <main className="relative flex min-h-screen flex-col px-6 pb-24 pt-24 md:px-12">
            <BackgroundGlow />

            <div className="mx-auto w-full max-w-3xl space-y-20">
                <section className="space-y-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                        {statusBadges.map((badge) => (
                            <span
                                key={badge}
                                className="rounded-full border border-border/60 bg-background/50 px-3 py-1 text-[0.75rem] font-medium backdrop-blur"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-balance text-4xl font-serif font-medium tracking-tight text-foreground sm:text-5xl">
                            I turn playful ideas into finely crafted products shipped from a terminal window.
                        </h1>
                        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                            I&apos;m Pranjal Mandavkar — a builder who likes quick feedback loops, strong taste, and shaving off the
                            annoying clicks that slow teams down. You&apos;ll find me obsessing over DX, shipping from Neovim, and
                            tinkering with React &amp; Rust-powered tooling.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="mailto:hello@pr5.dev"
                                className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:shadow-lg hover:shadow-foreground/10"
                            >
                                <Mail className="size-4 transition-transform group-hover:-translate-y-0.5" />
                                Say hi
                            </Link>
                            <Link
                                href="/blog"
                                className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-background/90"
                            >
                                Browse notes
                                <MoveRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-baseline justify-between">
                        <h2 className="text-lg font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
                            Selected projects
                        </h2>
                        <Link
                            href="https://github.com/mandavkarpranjal"
                            target="_blank"
                            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground/80"
                            rel="noreferrer noopener"
                        >
                            GitHub
                            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <div className="grid gap-4">
                        {projects.map((project) => (
                            <article
                                key={project.name}
                                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 px-6 py-5 shadow-sm transition hover:border-foreground/30 hover:bg-card/80"
                            >
                                <div className="pointer-events-none absolute -right-10 top-1/2 size-32 -translate-y-1/2 rounded-full bg-foreground/5 blur-2xl transition-opacity group-hover:opacity-80" />

                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground/70">Project</span>
                                            <div className="hidden h-px w-12 bg-border/80 md:block" />
                                        </div>
                                        <Link
                                            href={project.href}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 text-xl font-semibold text-foreground transition hover:text-foreground/90"
                                            rel="noreferrer noopener"
                                        >
                                            {project.name}
                                            <ArrowUpRight className="size-4" />
                                        </Link>
                                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
                                            {project.tech.map((tech) => (
                                                <span key={tech} className="rounded-full border border-border/70 px-2.5 py-1">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <GithubInfo
                                        owner="mandavkarpranjal"
                                        repo={project.repo}
                                        className="relative z-10 self-start bg-background/90 backdrop-blur"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {posts.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-lg font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
                                Fresh writing
                            </h2>
                            <Link
                                href="/blog"
                                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground/80"
                            >
                                See everything
                                <MoveRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <ul className="grid gap-4">
                            {posts.map(({ slug, frontmatter }) => (
                                <li key={slug}>
                                    <Link
                                        href={`/blog/${slug}`}
                                        className="group flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/40 px-5 py-4 transition hover:border-foreground/30 hover:bg-card/80"
                                    >
                                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                                            <span>Note</span>
                                            {frontmatter.date && (
                                                <span className="text-muted-foreground/50">
                                                    {new Date(frontmatter.date).toLocaleDateString(undefined, {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground transition group-hover:text-foreground/90">
                                            {frontmatter.title ?? slug}
                                        </h3>
                                        {frontmatter.description && (
                                            <p className="text-sm text-muted-foreground">
                                                {frontmatter.description}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </main>
    )
}

function BackgroundGlow() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[-20%] top-20 h-64 w-64 rounded-full bg-gradient-to-br from-foreground/10 via-transparent to-transparent blur-3xl" />
            <div className="absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-accent/15 via-transparent to-transparent blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
    )
}
