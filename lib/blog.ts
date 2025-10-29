import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type PostFrontmatter = {
  title: string
  description?: string
  date?: string
  published?: boolean
  tags?: string[]
}

export type Post = {
  slug: string
  content: string
  frontmatter: PostFrontmatter
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog")

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx?|MDX?)$/, ""))
}

export function getPostBySlug(slug: string): Post | null {
  const filePathMdx = path.join(POSTS_DIR, `${slug}.mdx`)
  const filePathMd = path.join(POSTS_DIR, `${slug}.md`)
  const filePath = fs.existsSync(filePathMdx)
    ? filePathMdx
    : fs.existsSync(filePathMd)
    ? filePathMd
    : null
  if (!filePath) return null
  const source = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(source)
  const frontmatter = (data || {}) as PostFrontmatter
  return {
    slug,
    content,
    frontmatter,
  }
}

export function getAllPosts(): Array<{ slug: string; frontmatter: PostFrontmatter }> {
  const items = getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug)
      return post ? { slug: post.slug, frontmatter: post.frontmatter } : null
    })
    .filter((p): p is { slug: string; frontmatter: PostFrontmatter } => Boolean(p))
    .filter((p) => p.frontmatter?.published !== false)

  return items.sort((a, b) => {
    const ad = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0
    const bd = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0
    return bd - ad
  })
}
