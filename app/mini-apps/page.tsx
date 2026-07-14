import Link from "next/link"
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react"

interface MiniApp {
  title: string
  description: string
  tags?: string[]
  date?: string
  live?: string
  code?: string
}

const miniApps: MiniApp[] = [
  {
    title: "imgify",
    description: "turn messages into images inside pi",
    tags: ["productivity", "pi", "agent"],
    live: "https://www.npmjs.com/package/imgify-pi",
    code: "https://github.com/MandavkarPranjal/imgify/tree/main/pi",
  },
  {
    title: "clean-clone",
    description: "clone a git repo to a sandbox directory with clean working tree (no uncommitted changes) and copy .env file.",
    tags: ["dev", "sandbox", "git"],
    code: "https://github.com/MandavkarPranjal/clean-clone"
  },
  {
    title: "fzf-jj.sh",
    description: "bash and zsh key bindings for jj, powered by fzf",
    tags: ["jj"],
    code: "https://github.com/MandavkarPranjal/fzf-jj.sh"
  }
]

export const metadata = {
  title: "Mini Apps | Pranjal Mandavkar",
  description: "Side projects, fun experiments, and scripts I've built.",
}

export default function MiniAppsPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:py-24 max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← back
      </Link>

      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">
          mini apps
        </h1>
        <p className="text-muted-foreground">
          a growing collection of small things i built for quick use, fun, and cool stuff.
        </p>
      </section>

      {/* Apps List */}
      <section className="space-y-8">
        {miniApps.map((app) => (
          <article key={app.title} className="group space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <h2 className="text-lg font-medium text-foreground">
                {app.title}
              </h2>
              {app.tags && app.tags.map((tag, i) => (
                <span key={tag}>
                  {tag}{i < app.tags!.length - 1 ? "," : ""}
                </span>
              ))}
              {app.tags && app.date && <span>·</span>}
              {app.date && <span>{app.date}</span>}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {app.description}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {app.live && (
                <Link
                  href={app.live}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  live
                  <IconExternalLink className="h-3 w-3" />
                </Link>
              )}
              {app.code && (
                <Link
                  href={app.code}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  code
                  <IconBrandGithub className="h-3 w-3" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
