import { getPostBySlug } from "@/lib/blog";
import { GenerateImage, size as ogSize, contentType as ogContentType } from "@/lib/og";

export const alt = "Pranjal Mandavkar"
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    return GenerateImage({
        title: `${post?.frontmatter.title} - pr5.dev`,
        description: post?.frontmatter.description,
    })
}
