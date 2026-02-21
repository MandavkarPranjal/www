import { db } from "@/lib/db"

export const PAGE_SIZE = 50

export async function getEntries(cursor?: Date) {
  return db.entry.findMany({
    where: cursor
      ? {
          createdAt: {
            lt: cursor,
          },
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
  })
}

export async function getEntriesByTag(tag: string, cursor?: Date) {
  return db.entry.findMany({
    where: {
      tags: {
        has: tag,
      },
      ...(cursor
        ? {
            createdAt: {
              lt: cursor,
            },
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
  })
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
