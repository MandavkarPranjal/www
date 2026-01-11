import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { BlogIndexClient } from "@/components/blog-index-client"

export const metadata: Metadata = {
    title: "Blog",
    description: "Notes and posts",
    openGraph: {
        title: "Blog",
        description: "Notes and posts",
        url: "https://pr5.dev/blog",
        siteName: "Pranjal;s blog",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog",
        description: "Notes and posts",
    },
}

export default function BlogIndex() {
    const posts = getAllPosts()
    return <BlogIndexClient posts={posts} />
}
