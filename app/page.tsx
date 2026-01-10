import { GithubInfo } from "@/components/github-info"
import Link from "next/link"
import Image from "next/image"
import { IconBrandX, IconBrandGithub, IconMail, IconCalendar } from "@tabler/icons-react"
import { getAllPosts } from "@/lib/blog"
import { projects } from "@/lib/projects"

export default function Home() {
    const allPosts = getAllPosts()
    const latestPosts = allPosts.slice(0, 3)

    return (
        <main className="min-h-screen px-6 py-16 md:py-24 max-w-3xl mx-auto space-y-20">
            {/* Hero Section */}
            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-4 md:max-w-lg">
                        <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">
                            Pranjal Mandavkar
                        </h1>
                        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                            <p>
                                tldr; i'm 22(age) dev who loves to build things that save some clicks or friction
                                & yeahhh, i'm a full-stack dev
                            </p>
                            <p>
                                i write code for web and terminals and make Zero mrr apps
                            </p>
                            <p>
                                Big fan of open source. I spend a lot of time on{" "}
                                <Link href="https://x.com/pr5dev" target="_blank" className="underline underline-offset-4 hover:text-foreground transition-colors">
                                    X (formerly Twitter)
                                </Link>{" "}
                                and watching{" "}
                                <Link href="https://www.youtube.com/@t3dotgg" target="_blank" className="underline underline-offset-4 hover:text-foreground transition-colors">
                                    Theo
                                </Link>.
                            </p>
                            <p>
                                if want to know more about me,&nbsp;
                                <Link href="blog/things-i-believe" className="underline underline-offset-4 text-foreground/85 cursor-pointer">
                                    here are something i believe in
                                </Link> and&nbsp;
                                <Link href="/blog/these-are-bullshits" className="underline underline-offset-4 text-foreground/85 cursor-pointer">
                                    some that i don't
                                </Link>
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-5 pt-2">
                            <SocialLink href="https://github.com/mandavkarpranjal" icon={IconBrandGithub} label="GitHub" />
                            <SocialLink href="https://x.com/pr5dev" icon={IconBrandX} label="Twitter" />
                            <SocialLink href="mailto:contact@pr5.dev" icon={IconMail} label="Email" />
                        </div>
                    </div>

                    <div className="relative shrink-0 hidden md:block">
                        <div className="relative h-32 w-32 overflow-hidden rounded-full border border-border/50 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                            <Image
                                src="https://github.com/mandavkarpranjal.png"
                                alt="Pranjal Mandavkar"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact / CTA */}
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-backwards">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-accent/30 p-6 border border-border/50">
                    <div className="space-y-1">
                        <h3 className="font-medium">Want to discuss a project?</h3>
                        <p className="text-muted-foreground text-sm">
                            Always open to new ideas and tech chats.
                        </p>
                    </div>
                    <Link
                        href="https://cal.com/lossstheaven/15min"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm w-fit"
                    >
                        <IconCalendar className="h-4 w-4" />
                        Book a call
                    </Link>
                </div>
            </section>

            {/* Projects Section - Minimal List View */}
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-backwards">
                <h1 className="text-xl font-serif font-medium tracking-tight text-foreground italic">
                    some cool projects :)
                </h1>
                <div className="space-x-6 divide-y divide-border/80 text-base leading-relaxed text-foreground/60">
                    {projects.map((project) => (
                        <div key={project.title} className="flex flex-col space-y-2 tracking-tight pt-6 first:pt-0">
                            <Link
                                href={project.href}
                                className="text-lg font-medium hover:text-foreground/85 cursor-pointer"
                                target="_blank"
                            >
                                <span className="underline underline-offset-4">{project.title}</span> - {project.description}
                            </Link>
                            <GithubInfo
                                owner={project.owner}
                                repo={project.repo}
                                className="hover:text-foreground/85 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Latest Writing Section */}
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards">
                <div className="flex items-baseline justify-between">
                    <h1 className="text-xl font-serif font-medium tracking-tight text-foreground italic">
                        Latest Writing
                    </h1>
                    <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                        View all
                    </Link>
                </div>
                <div className="flex flex-col space-y-6 text-base leading-relaxed text-foreground/60">
                    {latestPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col space-y-1.5"
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-medium group-hover:text-primary transition-colors">
                                    {post.frontmatter.title}
                                </span>
                                {post.frontmatter.description && (
                                    <>
                                        <span className="text-border">•</span>
                                        <span className="line-clamp-1 text-muted-foreground">{post.frontmatter.description}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>{post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) : ''}</span>
                            </div>
                        </Link>
                    ))}
                    {latestPosts.length === 0 && (
                        <p className="text-muted-foreground italic">No posts yet.</p>
                    )}
                </div>
            </section>
        </main >
    )
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            aria-label={label}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-md hover:bg-accent/50"
        >
            <Icon className="h-5 w-5" />
        </Link>
    )
}


