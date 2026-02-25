import type { Metadata } from "next"
import Link from "next/link"

import { type EntriesCursor, getEntries } from "@/lib/entries"
import { EntryBody } from "@/app/entries/entry-body"
import { EntriesSearch } from "@/app/entries/entries-search"
import { LocalTime } from "@/app/entries/local-time"

type EntriesPageProps = {
  searchParams: Promise<{ cursor?: string; q?: string }>
}

type Entry = {
  id: string
  body: string
  createdAt: Date
  tags: string[]
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Entries",
  description: "Short notes, ordered by most recent first.",
  openGraph: {
    title: "Entries",
    description: "Short notes, ordered by most recent first.",
    url: "https://pr5.dev/entries",
    siteName: "Pranjal Mandavkar",
    images: [
      {
        url: "/entries/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Entries - pr5.dev",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entries",
    description: "Short notes, ordered by most recent first.",
    images: ["/entries/opengraph-image"],
  },
}

function getCursor(cursor?: string): EntriesCursor | undefined {
  if (!cursor) {
    return undefined
  }

  const separatorIndex = cursor.lastIndexOf("__")

  if (separatorIndex <= 0 || separatorIndex === cursor.length - 2) {
    return undefined
  }

  const createdAtText = cursor.slice(0, separatorIndex)
  const id = cursor.slice(separatorIndex + 2)
  const date = new Date(createdAtText)

  if (Number.isNaN(date.getTime())) {
    return undefined
  }

  return {
    createdAt: date,
    id,
  }
}

function toCursor(entry: Entry) {
  return `${entry.createdAt.toISOString()}__${entry.id}`
}

function getDayKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function groupEntriesByDay(entries: Entry[]) {
  const groups: Array<{ dayKey: string; entries: Entry[] }> = []

  for (const entry of entries) {
    const dayKey = getDayKey(entry.createdAt)
    const currentGroup = groups[groups.length - 1]

    if (!currentGroup || currentGroup.dayKey !== dayKey) {
      groups.push({ dayKey, entries: [entry] })
      continue
    }

    currentGroup.entries.push(entry)
  }

  return groups
}

export default async function EntriesPage({ searchParams }: EntriesPageProps) {
  const { cursor, q } = await searchParams
  const query = q?.trim() ?? ""
  const entries = await getEntries(getCursor(cursor), query)
  const entryGroups = groupEntriesByDay(entries)
  const hasNextPage = entries.length === 50
  const nextCursor = hasNextPage
    ? toCursor(entries[entries.length - 1])
    : null

  return (
    <main className="min-h-screen px-6 py-16 md:py-24 pb-24 md:pb-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">Entries</h1>
          <p className="mt-2 text-muted-foreground">Short notes, ordered by most recent first.</p>
          <EntriesSearch
            id="entries-search"
            label="Search entries"
            placeholder="Search body or tags"
          />
        </header>

        {entries.length === 0 ? (
          <p className="text-muted-foreground italic">
            {query ? "No entries matched your search." : "No entries yet."}
          </p>
        ) : (
          <ul className="space-y-6">
            {entryGroups.map((group) => {
              const anchorEntry = group.entries[0]

              return (
                <li key={group.dayKey} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <LocalTime iso={anchorEntry.createdAt.toISOString()} format="date" />
                    <Link
                      className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                      href={`/entries/${anchorEntry.id}`}
                    >
                      #
                    </Link>
                  </div>
                  <ul className="space-y-4">
                    {group.entries.map((entry) => (
                      <li
                        key={entry.id}
                        id={`entry-${entry.id}`}
                        className="group scroll-mt-24 border-l border-border/70 pl-4"
                      >
                        <EntryBody body={entry.body} />
                        <div className="mt-2 flex items-start gap-2">
                          {entry.tags.length > 0 ? (
                            <ul className="flex flex-wrap gap-2">
                              {entry.tags.map((tag) => (
                                <li key={tag}>
                                  <Link
                                    className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                                    href={`/entries/tags/${encodeURIComponent(tag)}`}
                                  >
                                    #{tag}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          <div className="ml-auto">
                            <LocalTime iso={entry.createdAt.toISOString()} format="time" />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        )}

        {nextCursor ? (
          <div className="mt-8">
            <Link
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              href={`/entries?cursor=${encodeURIComponent(nextCursor)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
            >
              Load older entries
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
