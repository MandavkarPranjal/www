'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

interface BackButtonProps {
    className?: string
}

export function BackButton({ className = '' }: BackButtonProps) {
    const pathname = usePathname()
    const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog'

    return (
        <div className={`fixed left-4 top-4 z-50 ${className}`}>
            {isBlogPost ? (
                <Link
                    href="/blog"
                    className="flex items-center font-medium gap-2 rounded-md px-3 py-1 text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground/90"
                    aria-label="Go back to blog"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back
                </Link>
            ) : (
                <button
                    onClick={() => {
                        if (typeof window !== 'undefined' && window.history.length > 1) {
                            window.history.back()
                        }
                    }}
                    className="flex items-center font-medium gap-2 rounded-md px-3 py-1 text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground/90"
                    aria-label="Go back"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back
                </button>
            )}
        </div>
    )
}
