import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import MDXComponents from "@/components/mdx-components"

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
                <div>
                    <MDXRemote source={content} components={MDXComponents} />
                </div>
            </article>
        </main>
    )
}
