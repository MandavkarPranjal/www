import { ViewTransition } from 'react'
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { mdxComponents, CodeBlock } from "@prose-ui/next"
import type React from "react"
import type { BundledLanguage } from "shiki"

const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
    const child = props.children as any
    const code = child && typeof child === "object" && "props" in child ? (child as any).props : undefined
    const className: string | undefined = code?.className
    const language: BundledLanguage | undefined =
        typeof className === "string" && className.startsWith("language-")
            ? (className.replace("language-", "") as BundledLanguage)
            : undefined
    const codeChildren = code?.children
    if (language && codeChildren) {
        return <CodeBlock language={language}>{codeChildren}</CodeBlock>
    }
    return <pre {...props} />
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    if (props.type === "checkbox") {
        return (
            <input
                {...props}
                disabled
                className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
        )
    }
    return <input {...props} />
}

const components = {
    ...mdxComponents,
    pre: Pre,
    input: Input,
}

export async function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return {}

    const title = post.frontmatter.title || slug
    const description = post.frontmatter.description

    return {
        title,
        description,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title,
            description: description || undefined,
            url: `/blog/${slug}`,
            type: "article",
            images: [
                {
                    url: `/blog/${slug}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: description || undefined,
            images: [`/blog/${slug}/opengraph-image`],
        },
        keywords: post.frontmatter.tags,
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return notFound()

    const { frontmatter, content } = post

    const processedContent = content
        .replace(/^(\s*)- \[x\] (.+)$/gm, '$1- <s>*$2*</s>')
        .replace(/^(\s*)- \[ \] (.+)$/gm, '$1- $2')

    return (
        <ViewTransition>
            <main className="min-h-screen px-6 py-16 md:py-24">
                <article className="mx-auto max-w-2xl">
                    <ViewTransition name={`title-${slug}`}>
                        <h1 className="mb-4 text-4xl font-serif font-medium tracking-tight text-foreground">
                            {frontmatter.title}
                        </h1>
                    </ViewTransition>
                    {frontmatter.date && (

                        <ViewTransition name={`date-${slug}`}>
                            <p className="mb-8 text-sm text-muted-foreground text-left justify-center">
                                Last Updated on {new Date(frontmatter.date).toLocaleDateString()}
                            </p>
                        </ViewTransition>
                    )}
                    <div className="prose-ui">
                        <MDXRemote source={processedContent} components={components as any} />
                    </div>
                </article>
            </main>
        </ViewTransition>
    )
}
