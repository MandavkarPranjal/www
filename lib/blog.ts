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

export type PostWithMeta = {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: number
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

export function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).filter((word) => word.length > 0).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export function getRelatedPosts(currentSlug: string, allPosts: PostWithMeta[], limit: number = 3): PostWithMeta[] {
  const currentPost = allPosts.find(p => p.slug === currentSlug)
  if (!currentPost) return []

  const currentTags = currentPost.frontmatter.tags || []
  
  const related = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(post => {
      const postTags = post.frontmatter.tags || []
      const commonTags = currentTags.filter(tag => postTags.includes(tag)).length
      return { post, relevance: commonTags }
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(({ post }) => post)

  // If not enough related posts by tags, fill with recent posts
  if (related.length < limit) {
    const recentPosts = allPosts
      .filter(p => p.slug !== currentSlug && !related.find(r => r.slug === p.slug))
      .slice(0, limit - related.length)
    related.push(...recentPosts)
  }

  return related
}

export function getAllPosts(): PostWithMeta[] {
  const items = getPostSlugs()
    .map((slug): PostWithMeta | null => {
      const post = getPostBySlug(slug)
      if (!post) return null
      const readingTime = calculateReadingTime(post.content)
      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
        content: post.content,
        readingTime,
      }
    })
    .filter((p): p is PostWithMeta => p !== null)
    .filter((p) => p.frontmatter?.published !== false)

  return items.sort((a, b) => {
    const ad = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0
    const bd = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0
    return bd - ad
  })
}
