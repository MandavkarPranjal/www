'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Tooltip } from '@/components/ui/tooltip'

interface SocialLinkProps {
  href: string
  children: ReactNode
  label: string
}

export function SocialLink({ href, children, label }: SocialLinkProps) {
  return (
    <Tooltip content={label}>
      <Link
        href={href}
        target="_blank"
        aria-label={label}
        className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-md hover:bg-accent/50"
      >
        {children}
      </Link>
    </Tooltip>
  )
}
