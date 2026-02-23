import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

export const PAGE_SIZE = 50

export type EntriesCursor = {
  createdAt: Date
  id: string
}

type EntryListItem = {
  id: string
  body: string
  tags: string[]
  createdAt: Date
}

function getNormalizedQuery(query?: string) {
  const normalizedQuery = query?.trim()

  if (!normalizedQuery) {
    return undefined
  }

  return normalizedQuery
}

function getCursorSql(cursor?: EntriesCursor) {
  if (!cursor) {
    return Prisma.empty
  }

  return Prisma.sql`AND ("createdAt" < ${cursor.createdAt} OR ("createdAt" = ${cursor.createdAt} AND id < ${cursor.id}))`
}

function getSearchSql(query?: string) {
  const normalizedQuery = getNormalizedQuery(query)

  if (!normalizedQuery) {
    return Prisma.empty
  }

  const likePattern = `%${normalizedQuery}%`

  return Prisma.sql`AND (body ILIKE ${likePattern} OR array_to_string(tags, ' ') ILIKE ${likePattern})`
}

export async function getEntries(cursor?: EntriesCursor, query?: string) {
  const rows = await db.$queryRaw<EntryListItem[]>`
    SELECT id, body, tags, "createdAt"
    FROM "Entry"
    WHERE TRUE
      ${getCursorSql(cursor)}
      ${getSearchSql(query)}
    ORDER BY "createdAt" DESC, id DESC
    LIMIT ${PAGE_SIZE}
  `

  return rows
}

export async function getEntriesByTag(tag: string, cursor?: EntriesCursor, query?: string) {
  const normalizedTag = tag.trim()
  const normalizedQuery = getNormalizedQuery(query)
  const likePattern = normalizedQuery ? `%${normalizedQuery}%` : undefined

  const rows = await db.$queryRaw<EntryListItem[]>`
    SELECT id, body, tags, "createdAt"
    FROM "Entry"
    WHERE tags @> ARRAY[${normalizedTag}]::text[]
      ${getCursorSql(cursor)}
      ${
        likePattern
          ? Prisma.sql`AND (body ILIKE ${likePattern} OR array_to_string(tags, ' ') ILIKE ${likePattern})`
          : Prisma.empty
      }
    ORDER BY "createdAt" DESC, id DESC
    LIMIT ${PAGE_SIZE}
  `

  return rows
}

export async function createEntry(body: string, tags: string[]) {
  return db.entry.create({
    data: {
      body,
      tags,
    },
  })
}

export async function getEntryById(id: string) {
  return db.entry.findUnique({
    where: { id },
  })
}

export async function updateEntry(id: string, body: string, tags: string[]) {
  return db.entry.update({
    where: { id },
    data: {
      body,
      tags,
    },
  })
}
