import { create, insert, search } from '@orama/orama'
import type { PostWithMeta } from './blog'

export type { PostWithMeta }

export type PostSearchResult = {
    id: string
    slug: string
    title: string
    description: string
    date?: string
    readingTime: number
    tags?: string[]
}

export type DisplayablePost = PostWithMeta

interface OramaDocument {
    slug: string
    title: string
    description: string
    content: string
    date: string
    readingTime: number
    tags: string
}

interface OramaSearchParams {
    term: string
    limit: number
}

interface OramaHit {
    document: OramaDocument
}

interface OramaSearchResult {
    hits: OramaHit[]
}

let searchIndex: ReturnType<typeof create> | null = null

const postSchema = {
    slug: 'string',
    title: 'string',
    description: 'string',
    content: 'string',
    date: 'string',
    readingTime: 'number',
    tags: 'string',
} as const

let cachedPosts: PostWithMeta[] | null = null

export async function initializeSearch(posts: PostWithMeta[]) {
    const postsKey = posts.map(p => p.slug).join(',')

    if (searchIndex && cachedPosts && cachedPosts.map(p => p.slug).join(',') === postsKey) {
        return searchIndex
    }

    searchIndex = create({
        schema: postSchema,
    })

    for (const post of posts) {
        const dateValue = post.frontmatter.date as unknown
        const dateStr = dateValue && typeof dateValue === 'object' && 'toISOString' in dateValue
            ? (dateValue as Date).toISOString()
            : String(dateValue || '')

        await insert(searchIndex, {
            slug: post.slug,
            title: post.frontmatter.title || '',
            description: post.frontmatter.description || '',
            content: post.content,
            date: dateStr,
            readingTime: post.readingTime,
            tags: post.frontmatter.tags?.join(' ') || '',
        })
    }

    cachedPosts = posts
    return searchIndex
}

export async function searchPosts(
    query: string,
    posts: PostWithMeta[],
    limit: number = 10
): Promise<PostWithMeta[]> {
    if (!query.trim()) {
        return posts
    }

    const index = await initializeSearch(posts)

    const results: OramaSearchResult = await search(index, {
        term: query,
        limit,
    } as OramaSearchParams)

    return results.hits.map((hit: OramaHit): PostWithMeta => ({
        slug: hit.document.slug,
        frontmatter: {
            title: hit.document.title,
            description: hit.document.description,
            date: hit.document.date,
            tags: hit.document.tags?.split(' ').filter(Boolean),
        },
        content: '',
        readingTime: hit.document.readingTime,
    }))
}
