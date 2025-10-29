"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    try {
      const t = (localStorage.getItem("theme") as "dark" | "light" | null) || "dark"
      const d = document.documentElement
      const dark = t === "dark"
      d.classList.toggle("dark", dark)
      setIsDark(dark)
    } catch {
      // ignore
    }
  }, [])

  const applyTheme = (dark: boolean) => {
    const d = document.documentElement
    d.classList.toggle("dark", dark)
    try {
      localStorage.setItem("theme", dark ? "dark" : "light")
    } catch {
      // ignore
    }
    setIsDark(dark)
  }

  const toggle = () => {
    const nextDark = !isDark
    const docAny = document as any
    if (docAny.startViewTransition) {
      docAny.startViewTransition(() => {
        applyTheme(nextDark)
      })
    } else {
      applyTheme(nextDark)
    }
  }

  if (!mounted) return null

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="fixed right-4 top-4 z-50 rounded-md border bg-background px-3 py-2 text-foreground shadow transition-colors hover:bg-secondary"
    >
      {isDark ? "Dark" : "Light"}
    </button>
  )
}
