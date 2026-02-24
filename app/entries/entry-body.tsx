import Link from "next/link"
import type { ReactNode } from "react"

const URL_REGEX = /https?:\/\/[^\s)]+/g
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
const INLINE_QUOTE_REGEX = /"([^"\n]+)"/g

function pushRenderedText(nodes: ReactNode[], rendered: ReactNode | ReactNode[]) {
  if (Array.isArray(rendered)) {
    nodes.push(...rendered)
    return
  }

  nodes.push(rendered)
}

function renderQuotedText(text: string, keyPrefix: string) {
  const matches = Array.from(text.matchAll(INLINE_QUOTE_REGEX))
  if (matches.length === 0) {
    return text
  }

  const nodes: ReactNode[] = []
  let lastIndex = 0

  matches.forEach((match, index) => {
    const fullMatch = match[0]
    const quotedText = match[1]
    const start = match.index ?? 0

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start))
    }

    nodes.push(
      <span key={`${keyPrefix}-quote-${index}`} className="font-serif italic text-muted-foreground">
        {fullMatch[0]}
        {quotedText}
        {fullMatch[fullMatch.length - 1]}
      </span>,
    )

    lastIndex = start + fullMatch.length
  })

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function renderAutoLinks(text: string, keyPrefix: string) {
  const matches = Array.from(text.matchAll(URL_REGEX))
  if (matches.length === 0) {
    return renderQuotedText(text, `${keyPrefix}-plain`)
  }

  const nodes: ReactNode[] = []
  let lastIndex = 0

  matches.forEach((match, index) => {
    const url = match[0]
    const start = match.index ?? 0

    if (start > lastIndex) {
      pushRenderedText(nodes, renderQuotedText(text.slice(lastIndex, start), `${keyPrefix}-before-${index}`))
    }

    nodes.push(
      <Link
        key={`${keyPrefix}-url-${url}-${index}`}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 hover:text-foreground"
      >
        {url}
      </Link>,
    )

    lastIndex = start + url.length
  })

  if (lastIndex < text.length) {
    pushRenderedText(nodes, renderQuotedText(text.slice(lastIndex), `${keyPrefix}-tail`))
  }

  return nodes
}

function renderInlineLinks(text: string) {
  const markdownMatches = Array.from(text.matchAll(MARKDOWN_LINK_REGEX))
  if (markdownMatches.length === 0) {
    return renderAutoLinks(text, "plain")
  }

  const nodes: ReactNode[] = []
  let lastIndex = 0

  markdownMatches.forEach((match, index) => {
    const fullMatch = match[0]
    const label = match[1]
    const href = match[2]
    const start = match.index ?? 0

    if (start > lastIndex) {
      const segment = text.slice(lastIndex, start)
      const renderedSegment = renderAutoLinks(segment, `before-${index}`)
      if (Array.isArray(renderedSegment)) {
        nodes.push(...renderedSegment)
      } else {
        nodes.push(renderedSegment)
      }
    }

    nodes.push(
      <Link
        key={`md-${href}-${index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 hover:text-foreground"
      >
        {label}
      </Link>,
    )

    lastIndex = start + fullMatch.length
  })

  if (lastIndex < text.length) {
    const tail = text.slice(lastIndex)
    const renderedTail = renderAutoLinks(tail, "tail")
    if (Array.isArray(renderedTail)) {
      nodes.push(...renderedTail)
    } else {
      nodes.push(renderedTail)
    }
  }

  return nodes
}

type EntryBodyProps = {
  body: string
}

export function EntryBody({ body }: EntryBodyProps) {
  const lines = body.split("\n").filter((line) => line.trim().length > 0)

  return (
    <div className="mt-2 space-y-2 leading-relaxed text-foreground">
      {lines.map((line, index) => {
        if (line.startsWith(">")) {
          const quote = line.replace(/^>\s?/, "")
          return (
            <blockquote key={index} className="border-l-2 border-border pl-3 italic text-muted-foreground">
              {renderInlineLinks(quote)}
            </blockquote>
          )
        }

        return <p key={index}>{renderInlineLinks(line)}</p>
      })}
    </div>
  )
}
