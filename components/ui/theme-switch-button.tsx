'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  // Check current theme on component mount
  React.useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    setTheme(savedTheme as 'light' | 'dark')
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  // Toggle theme with click-origin ripple
  const toggleTheme = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    const startViewTransition = (document as any).startViewTransition?.bind(document)

    // Store click coordinates for CSS reveal origin
    const x = e.clientX
    const y = e.clientY
    const root = document.documentElement
    if (x === 0 && y === 0) {
      // Keyboard activation: let CSS fall back to center
      root.style.removeProperty('--x')
      root.style.removeProperty('--y')
    } else {
      root.style.setProperty('--x', `${x}px`)
      root.style.setProperty('--y', `${y}px`)
    }

    if (startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startViewTransition(() => {
        root.classList.toggle('dark', newTheme === 'dark')
      })
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
    } else {
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
      root.classList.toggle('dark', newTheme === 'dark')
    }
  }, [theme])

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-color-primary)] hover:opacity-80 transition-opacity overflow-hidden ${className}`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'light' 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'dark' 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
    </button>
  )
}
