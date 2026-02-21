"use client"

import { useEffect, useState } from "react"

type LocalTimeProps = {
  iso: string
}

export function LocalTime({ iso }: LocalTimeProps) {
  const [formatted, setFormatted] = useState(iso)

  useEffect(() => {
    const date = new Date(iso)
    setFormatted(
      new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date),
    )
  }, [iso])

  return (
    <time suppressHydrationWarning className="text-xs text-muted-foreground" dateTime={iso}>
      {formatted}
    </time>
  )
}
