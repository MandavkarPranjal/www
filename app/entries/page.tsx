import Link from "next/link"

import { getEntries } from "@/lib/entries"
import { EntryBody } from "@/app/entries/entry-body"
import { LocalTime } from "@/app/entries/local-time"

type EntriesPageProps = {
  searchParams: Promise<{ cursor?: string }>
}

type Entry = {
  id: string
  body: string
  createdAt: Date
  tags: string[]
}

export const dynamic = "force-dynamic"

function getCursorDate(cursor?: string) {
  if (!cursor) {
    return undefined
  }

  const date = new Date(cursor)
  if (Number.isNaN(date.getTime())) {
    return undefined
  }

  return date
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
  const { cursor } = await searchParams
  const entries = await getEntries(getCursorDate(cursor))
  const entryGroups = groupEntriesByDay(entries)
  const hasNextPage = entries.length === 50
  const nextCursor = hasNextPage
    ? entries[entries.length - 1]?.createdAt.toISOString()
    : null

  return (
    <main className="min-h-screen px-6 py-16 md:py-24 pb-24 md:pb-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">Entries</h1>
          <p className="mt-2 text-muted-foreground">Short notes, ordered by most recent first.</p>
        </header>

        {entries.length === 0 ? (
          <p className="text-muted-foreground italic">No entries yet.</p>
        ) : (
          <ul className="space-y-6">
            {entryGroups.map((group) => {
              const anchorEntry = group.entries[0]

              return (
                <li key={group.dayKey} className="space-y-3">
                <div className="flex items-center gap-2">
                    <LocalTime iso={anchorEntry.createdAt.toISOString()} />
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
                        {entry.tags.length > 0 ? (
                          <ul className="mt-2 flex flex-wrap gap-2">
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
              href={`/entries?cursor=${encodeURIComponent(nextCursor)}`}
            >
              Load older entries
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
