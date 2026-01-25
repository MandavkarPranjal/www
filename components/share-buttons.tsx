'use client'

import { useEffect, useState } from 'react'
import { IconShare2, IconBrandX, IconBrandLinkedin, IconLink } from '@tabler/icons-react'

interface ShareButtonsProps {
    url: string
    title: string
    description?: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url
    const shareText = `${title}${description ? ` - ${description}` : ''}`

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl)
        // TODO: Show toast notification
    }

    if (!isClient) return null

    return (
        <div className="mt-8 border-t border-border pt-8">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconShare2 className="h-4 w-4" />
                    Share
                </span>
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Share on Twitter"
                    title="Share on Twitter"
                >
                    <IconBrandX className="h-4 w-4" />
                </a>
                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                >
                    <IconBrandLinkedin className="h-4 w-4" />
                </a>
                <button
                    onClick={copyToClipboard}
                    className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Copy link"
                    title="Copy link to clipboard"
                >
                    <IconLink className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
