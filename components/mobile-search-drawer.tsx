'use client'

import { useState, useEffect } from 'react'
import { IconSearch, IconX } from '@tabler/icons-react'

interface MobileSearchDrawerProps {
    isOpen: boolean
    onClose: () => void
    query: string
    onQueryChange: (query: string) => void
    resultCount: number
}

export function MobileSearchDrawer({ isOpen, onClose, query, onQueryChange, resultCount }: MobileSearchDrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-50 md:hidden"
                onClick={onClose}
            />
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <div className="bg-background border-t border-border p-6 animate-in slide-in-from-bottom duration-200">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-medium">Search</h2>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="Close search"
                        >
                            <IconX className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="relative">
                        <IconSearch className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={query}
                            onChange={(e) => onQueryChange(e.target.value)}
                            autoFocus
                            className="w-full border-0 border-b border-border bg-transparent pl-6 pr-6 py-3 text-base placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0"
                        />
                    </div>
                    {query && (
                        <p className="mt-3 text-sm text-muted-foreground">
                            {resultCount} result{resultCount !== 1 ? 's' : ''} found
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}
