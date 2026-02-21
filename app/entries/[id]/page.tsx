import Link from "next/link"
import { notFound } from "next/navigation"

import { EntryBody } from "@/app/entries/entry-body"
import { LocalTime } from "@/app/entries/local-time"
import { getEntryById } from "@/lib/entries"

type EntryPermalinkPageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EntryPermalinkPage({ params }: EntryPermalinkPageProps) {
  const { id } = await params
  const entry = await getEntryById(id)

  if (!entry) {
    notFound()
  }

  return (
    <main className="min-h-screen px-6 py-16 md:py-24 pb-24 md:pb-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">Entry</h1>
          <p className="mt-2 text-muted-foreground">
            <Link className="underline underline-offset-4" href="/entries">
              Back to all entries
            </Link>
          </p>
        </header>

        <article className="space-y-2">
          <div className="flex items-center gap-2">
            <LocalTime iso={entry.createdAt.toISOString()} />
            <Link
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              href={`/entries/${entry.id}`}
            >
              #
            </Link>
          </div>
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
        </article>
      </div>
    </main>
  )
}
