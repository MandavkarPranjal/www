import Link from "next/link"

import { getEntries } from "@/lib/entries"

import { createEntryAction } from "./actions"
import { signOutAction } from "../login/actions"

export const dynamic = "force-dynamic"

export default async function AdminEntriesPage() {
  const recentEntries = await getEntries()

  return (
    <main className="min-h-screen px-6 py-16 md:py-24 pb-24 md:pb-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">Write entry</h1>
            <p className="mt-2 text-muted-foreground">Publish short notes to the public timeline.</p>
          </div>
          <form action={signOutAction}>
            <button
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </header>

        <form className="space-y-4" action={createEntryAction}>
          <label className="block text-sm font-medium text-foreground" htmlFor="body">
            Body
          </label>
          <textarea
            className="w-full border-0 border-b border-border bg-transparent py-2 text-base placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0"
            id="body"
            name="body"
            required
            rows={8}
          />

          <label className="block pt-2 text-sm font-medium text-foreground" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            className="w-full border-0 border-b border-border bg-transparent py-2 text-base placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0"
            id="tags"
            name="tags"
            placeholder="build, prisma, release"
            type="text"
          />

          <button
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            type="submit"
          >
            Save entry
          </button>
        </form>

        <section className="mt-12">
          <h2 className="text-xl font-serif text-foreground">Recent entries</h2>
          <ul className="mt-4 space-y-4">
            {recentEntries.map((entry: { id: string; body: string; createdAt: Date }) => (
              <li key={entry.id} className="border-b border-border pb-4">
                <p className="line-clamp-2 whitespace-pre-wrap text-sm text-foreground">{entry.body}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <time dateTime={entry.createdAt.toISOString()}>
                    {entry.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </time>
                  <Link
                    className="underline underline-offset-4 hover:text-foreground"
                    href={`/admin/entries/${entry.id}`}
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
