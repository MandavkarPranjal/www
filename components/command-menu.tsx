"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import {
    IconFileText,
    IconBrandGithub,
    IconRocket,
    IconHome,
    IconSearch,
    IconTerminal,
} from "@tabler/icons-react"
import * as Dialog from "@radix-ui/react-dialog"
import type { PostWithMeta } from "@/lib/blog"
import type { Project } from "@/lib/projects"
import type { MiniApp } from "@/lib/mini-apps"

interface CommandMenuProps {
    posts: PostWithMeta[]
    projects: Project[]
    miniApps: MiniApp[]
}

export function CommandMenu({ posts, projects, miniApps }: CommandMenuProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runAction = useCallback(
        (action: () => void) => {
            setOpen(false)
            action()
        },
        []
    )

    return (
        <Command.Dialog open={open} onOpenChange={setOpen} label="Search">
            <Dialog.Title className="sr-only">Search</Dialog.Title>
            <Command.Input placeholder="Search..." />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>

                <Command.Group heading="Pages">
                    <Command.Item
                        value="home"
                        onSelect={() => runAction(() => router.push("/"))}
                    >
                        <IconHome className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span>Home</span>
                    </Command.Item>
                    <Command.Item
                        value="blog"
                        onSelect={() => runAction(() => router.push("/blog"))}
                    >
                        <IconFileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span>Blog</span>
                    </Command.Item>
                    <Command.Item
                        value="mini apps"
                        onSelect={() => runAction(() => router.push("/mini-apps"))}
                    >
                        <IconTerminal className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span>Mini Apps</span>
                    </Command.Item>
                </Command.Group>

                <Command.Separator />

                <Command.Group heading="Blog Posts">
                    {posts.map((post) => (
                        <Command.Item
                            key={post.slug}
                            value={`blog-${post.slug}`}
                            keywords={post.frontmatter.tags}
                            onSelect={() =>
                                runAction(() => router.push(`/blog/${post.slug}`))
                            }
                        >
                            <IconFileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <div className="flex min-w-0 flex-col">
                                <span className="truncate">{post.frontmatter.title}</span>
                                {post.frontmatter.description && (
                                    <span className="truncate text-xs text-muted-foreground">
                                        {post.frontmatter.description}
                                    </span>
                                )}
                            </div>
                        </Command.Item>
                    ))}
                </Command.Group>

                <Command.Separator />

                <Command.Group heading="Projects">
                    {projects.map((project) => (
                        <Command.Item
                            key={project.title}
                            value={`project-${project.title}`}
                            onSelect={() => runAction(() => window.open(project.href, "_blank"))}
                        >
                            <IconBrandGithub className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <div className="flex min-w-0 flex-col">
                                <span className="truncate">{project.title}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {project.description}
                                </span>
                            </div>
                        </Command.Item>
                    ))}
                </Command.Group>

                <Command.Separator />

                <Command.Group heading="Mini Apps">
                    {miniApps.map((app) => (
                        <Command.Item
                            key={app.title}
                            value={`mini-${app.title}`}
                            onSelect={() =>
                                runAction(() => {
                                    const url = app.live || app.code
                                    if (url) window.open(url, "_blank")
                                })
                            }
                        >
                            <IconRocket className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <div className="flex min-w-0 flex-col">
                                <span className="truncate">{app.title}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {app.description}
                                </span>
                            </div>
                        </Command.Item>
                    ))}
                </Command.Group>
            </Command.List>
        </Command.Dialog>
    )
}
