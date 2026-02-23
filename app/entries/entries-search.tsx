"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { parseAsString, useQueryStates } from "nuqs"

type EntriesSearchProps = {
  id: string
  label: string
  placeholder: string
}

export function EntriesSearch({ id, label, placeholder }: EntriesSearchProps) {
  const [params, setParams] = useQueryStates({
    q: parseAsString,
    cursor: parseAsString,
  })
  const [inputValue, setInputValue] = useState(params.q ?? "")

  useEffect(() => {
    setInputValue(params.q ?? "")
  }, [params.q])

  const normalizedInput = inputValue.trim()
  const currentQuery = params.q ?? ""
  const isUnchanged = useMemo(
    () => normalizedInput === currentQuery,
    [currentQuery, normalizedInput],
  )

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedQuery = inputValue.trim()

    if (normalizedQuery === currentQuery) {
      return
    }

    void setParams(
      {
        q: normalizedQuery ? normalizedQuery : null,
        cursor: null,
      },
      {
        history: "replace",
        shallow: false,
      },
    )
  }

  return (
    <form onSubmit={submitSearch} className="mt-4">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground"
        />
        <button
          type="submit"
          disabled={isUnchanged}
          className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Search
        </button>
      </div>
    </form>
  )
}
