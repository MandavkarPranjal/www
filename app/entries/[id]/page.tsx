import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { EntryBody } from "@/app/entries/entry-body"
import { LocalTime } from "@/app/entries/local-time"
import { ShareButtons } from "@/components/share-buttons"
import { getEntryById } from "@/lib/entries"

type EntryPermalinkPageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

function getEntryDescription(body: string) {
  const normalizedBody = body.replace(/\s+/g, " ").trim()

  if (normalizedBody.length <= 160) {
    return normalizedBody
  }

  return `${normalizedBody.slice(0, 157)}...`
}

export async function generateMetadata({ params }: EntryPermalinkPageProps): Promise<Metadata> {
  const { id } = await params
  const entry = await getEntryById(id)

  if (!entry) {
    return {}
  }

  const description = getEntryDescription(entry.body)

  return {
    title: "Entry",
    description,
    openGraph: {
      title: "Entry",
      description,
      url: `https://pr5.dev/entries/${entry.id}`,
      type: "article",
      images: [
        {
          url: `/entries/${entry.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Entry - pr5.dev",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Entry",
      description,
      images: [`/entries/${entry.id}/twitter-image`],
    },
  }
}

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
          <ShareButtons url={`/entries/${entry.id}`} title="Entry" />
        </article>
      </div>
    </main>
  )
}
