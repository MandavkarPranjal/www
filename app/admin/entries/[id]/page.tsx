import Link from "next/link"
import { notFound } from "next/navigation"

import { getEntryById } from "@/lib/entries"

import { updateEntryAction } from "../actions"

type AdminEditEntryPageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function AdminEditEntryPage({ params }: AdminEditEntryPageProps) {
  const { id } = await params
  const entry = await getEntryById(id)

  if (!entry) {
    notFound()
  }

  return (
    <main className="min-h-screen px-6 py-16 md:py-24 pb-24 md:pb-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">Edit entry</h1>
          <p className="mt-2 text-muted-foreground">
            <Link className="underline underline-offset-4" href="/admin/entries">
              Back to admin entries
            </Link>
          </p>
        </header>

        <form className="space-y-4" action={updateEntryAction}>
          <input type="hidden" name="id" value={entry.id} />

          <label className="block text-sm font-medium text-foreground" htmlFor="body">
            Body
          </label>
          <textarea
            className="w-full border-0 border-b border-border bg-transparent py-2 text-base placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0"
            id="body"
            name="body"
            defaultValue={entry.body}
            required
            rows={10}
          />

          <label className="block pt-2 text-sm font-medium text-foreground" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            className="w-full border-0 border-b border-border bg-transparent py-2 text-base placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0"
            id="tags"
            name="tags"
            defaultValue={entry.tags.join(", ")}
            type="text"
          />

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              type="submit"
            >
              Update entry
            </button>

            <Link
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              href={`/entries/${entry.id}`}
            >
              View permalink
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
