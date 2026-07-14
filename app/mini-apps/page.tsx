import Image from "next/image"
import Link from "next/link"
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react"

interface MiniApp {
    title: string
    description: string
    tags?: string[]
    date?: string
    live?: string
    code?: string
}

const miniApps: MiniApp[] = [
    {
        title: "opennote",
        description: "turn claude into a note taking app",
        tags: ["productivity"],
        date: "mar 2026",
        live: "#",
        code: "#",
    },
    {
        title: "loli",
        description: "offline focus companion that helps you stay in the zone. no accounts, no cloud — just you and your focus.",
        tags: ["productivity"],
        date: "mar 2026",
        live: "#",
    },
    {
        title: "vocably",
        description: "ai vocab manager. learn new words every day. works with claude, chatgpt.",
        tags: ["learning"],
        date: "dec 2025",
        live: "#",
        code: "#",
    },
    {
        title: "jot it down",
        description: "quick and simple app for dumping todos and thoughts. no sign-up, all local.",
        tags: ["productivity"],
        date: "dec 2025",
        live: "#",
        code: "#",
    },
    {
        title: "obsidian auto title",
        description: "obsidian plugin that automatically generates titles for your notes so you can keep writing without pausing.",
        tags: ["plugin"],
        date: "dec 2025",
        code: "#",
    },
    {
        title: "marvel moonknight portfolio",
        description: "a portfolio website inspired by marvel's moon knight. dark, dramatic, and a little unhinged.",
        tags: ["web", "fun"],
        date: "aug 2022",
        code: "#",
    },
    {
        title: "denoise video",
        description: "remove background noise from your videos or audio using local ai, right from the command line.",
        tags: ["cli", "ai"],
        date: "feb 2026",
        code: "#",
    },
    {
        title: "agentic patterns playbook",
        description: "interactive reference for ai agentic design patterns. a quick playbook to understand how agents are built.",
        tags: ["ai", "reference"],
        date: "dec 2025",
        live: "#",
        code: "#",
    },
    {
        title: "typing tutor",
        description: "terminal-based typing tutor built in c++. practice your typing speed right in your terminal.",
        tags: ["cli"],
        date: "feb 2022",
        code: "#",
    },
]

export const metadata = {
    title: "Mini Apps | Pranjal Mandavkar",
    description: "Side projects, fun experiments, and scripts I've built.",
}

export default function MiniAppsPage() {
    return (
        <main className="min-h-screen px-6 py-16 md:py-24 max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500">
            {/* Back Link */}
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                ← back
            </Link>

            {/* Header */}
            <section className="space-y-3">
                <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">
                    mini apps
                </h1>
                <p className="text-muted-foreground">
                    a growing collection of small things i built for quick use, fun, and cool stuff.
                </p>
            </section>

            {/* Apps List */}
            <section className="space-y-8">
                {miniApps.map((app) => (
                    <article key={app.title} className="group space-y-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-medium text-foreground">
                                {app.title}
                            </h2>
                            {app.tags && app.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-muted-foreground bg-accent/50 rounded px-1.5 py-0.5"
                                >
                                    {tag}
                                </span>
                            ))}
                            {app.date && (
                                <span className="text-xs text-muted-foreground">
                                    {app.date}
                                </span>
                            )}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            {app.description}
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            {app.live && (
                                <Link
                                    href={app.live}
                                    target="_blank"
                                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                                >
                                    live
                                    <IconExternalLink className="h-3 w-3" />
                                </Link>
                            )}
                            {app.code && (
                                <Link
                                    href={app.code}
                                    target="_blank"
                                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                                >
                                    code
                                    <IconBrandGithub className="h-3 w-3" />
                                </Link>
                            )}
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}
