'use client'

import { useEffect, useRef } from 'react'

interface SpoilerProps {
  children: React.ReactNode
}

export function Spoiler({ children }: SpoilerProps) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!spanRef.current) return

    const span = spanRef.current

    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const isRevealed = span.getAttribute('data-revealed') === 'true'
      span.setAttribute('data-revealed', isRevealed ? 'false' : 'true')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const isRevealed = span.getAttribute('data-revealed') === 'true'
        span.setAttribute('data-revealed', isRevealed ? 'false' : 'true')
      }
    }

    const handleFocus = () => {
      span.setAttribute('data-revealed', 'true')
    }

    const handleBlur = () => {
      span.setAttribute('data-revealed', 'false')
    }

    const handleMouseLeave = () => {
      // Check if element still has focus, if not, hide again
      if (document.activeElement !== span) {
        span.setAttribute('data-revealed', 'false')
      }
    }

    span.addEventListener('click', handleClick)
    span.addEventListener('keydown', handleKeyDown)
    span.addEventListener('focus', handleFocus)
    span.addEventListener('blur', handleBlur)
    span.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      span.removeEventListener('click', handleClick)
      span.removeEventListener('keydown', handleKeyDown)
      span.removeEventListener('focus', handleFocus)
      span.removeEventListener('blur', handleBlur)
      span.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <span
      ref={spanRef}
      className="spoiler"
      role="button"
      tabIndex={0}
      aria-label={`Spoiler: ${typeof children === 'string' ? children : 'hidden content'}`}
      data-revealed="false"
    >
      {children}
    </span>
  )
}


