import React from "react"
import Link from "next/link"
import Button from "@/components/mdx/button"

export const MDXComponents: Record<string, React.ComponentType<any>> = {
  a: (props: React.ComponentProps<typeof Link>) => (
    <Link
      {...(props as any)}
      className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
    />
  ),
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="mt-8 scroll-m-20 text-4xl font-bold tracking-tight" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="leading-7 [&:not(:first-child)]:mt-6" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="my-6 ml-6 list-disc" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="my-6 ml-6 list-decimal" />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className="rounded bg-muted px-1 py-0.5 font-mono text-sm" />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="my-6 overflow-x-auto rounded-lg bg-muted p-4" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} className="mt-6 border-l-2 pl-6 italic" />
  ),
  Button,
}

export default MDXComponents
