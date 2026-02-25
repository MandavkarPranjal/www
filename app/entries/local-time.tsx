"use client"

import { useEffect, useState } from "react"

type LocalTimeProps = {
  iso: string
  format?: "dateTime" | "date" | "time"
}

function getFormatOptions(format: NonNullable<LocalTimeProps["format"]>): Intl.DateTimeFormatOptions {
  if (format === "date") {
    return { dateStyle: "medium" }
  }

  if (format === "time") {
    return { timeStyle: "short" }
  }

  return {
    dateStyle: "medium",
    timeStyle: "short",
  }
}

export function LocalTime({ iso, format = "dateTime" }: LocalTimeProps) {
  const [formatted, setFormatted] = useState(() => {
    const date = new Date(iso)
    return new Intl.DateTimeFormat(undefined, getFormatOptions(format)).format(date)
  })

  useEffect(() => {
    const date = new Date(iso)
    setFormatted(new Intl.DateTimeFormat(undefined, getFormatOptions(format)).format(date))
  }, [format, iso])

  return (
    <time suppressHydrationWarning className="text-xs text-muted-foreground" dateTime={iso}>
      {formatted}
    </time>
  )
}
