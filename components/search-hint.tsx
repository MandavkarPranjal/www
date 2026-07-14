"use client"

import { IconSearch } from "@tabler/icons-react"

export function SearchHint() {
    const openSearch = () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))

    return (
        <>
            <button
                onClick={openSearch}
                className="md:hidden flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors cursor-pointer"
                aria-label="Search"
            >
                <IconSearch className="h-4 w-4" />
            </button>
            <button
                onClick={openSearch}
                className="hidden md:inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm hover:bg-accent/20 hover:text-foreground transition-colors cursor-pointer"
            >
                <IconSearch className="h-3.5 w-3.5" />
                <span className="font-mono text-xs font-semibold bg-muted/60 rounded px-1.5 py-0.5">⌘K</span>
            </button>
        </>
    )
}
