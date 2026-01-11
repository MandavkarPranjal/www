'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight - windowHeight
            const scrolled = window.scrollY

            if (documentHeight > 0) {
                const scrollPercent = (scrolled / documentHeight) * 100
                setProgress(Math.min(scrollPercent, 100))
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-foreground to-muted-foreground transition-all duration-300 z-50"
            style={{ width: `${progress}%` }}
        />
    )
}
