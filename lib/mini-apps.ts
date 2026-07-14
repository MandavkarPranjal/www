export interface MiniApp {
  title: string
  description: string
  tags?: string[]
  date?: string
  live?: string
  code?: string
}

export const miniApps: MiniApp[] = [
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
    code: "https://github.com/MandavkarPranjal/clean-clone",
  },
  {
    title: "fzf-jj.sh",
    description: "bash and zsh key bindings for jj, powered by fzf",
    tags: ["jj"],
    code: "https://github.com/MandavkarPranjal/fzf-jj.sh",
  },
]
