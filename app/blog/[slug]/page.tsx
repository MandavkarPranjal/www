import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { mdxComponents, CodeBlock } from "@prose-ui/next"
import type React from "react"

const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
    const child = props.children as any
    const code = child && typeof child === "object" && "props" in child ? (child as any).props : undefined
    const className: string | undefined = code?.className
    const language =
        typeof className === "string" && className.startsWith("language-")
            ? className.replace("language-", "")
            : undefined
    const codeChildren = code?.children
    if (language && codeChildren) {
        return <CodeBlock language={language}>{codeChildren}</CodeBlock>
    }
    return <pre {...props} />
}

const components = {
    ...mdxComponents,
    pre: Pre,
}

export async function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return {}
    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return notFound()

    const { frontmatter, content } = post

    return (
        <main className="min-h-screen px-6 py-16 md:py-24">
            <article className="mx-auto max-w-2xl">
                <h1 className="mb-4 text-4xl font-serif font-medium tracking-tight text-foreground">
                    {frontmatter.title}
                </h1>
                {frontmatter.date && (
                    <p className="mb-8 text-sm text-muted-foreground text-left justify-center">
                        Last Updated on {new Date(frontmatter.date).toLocaleDateString()}
                    </p>
                )}
                <div className="prose-ui">
                    <MDXRemote source={content} components={components as any} />
                </div>
            </article>
        </main>
    )
}
