"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "brutalist"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "brutalist",
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("brutalist")
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage if available
  useEffect(() => {
    setMounted(true)
    // Always set to brutalist theme for now
    setTheme("brutalist")
  }, [])

  // Update localStorage and document class when theme changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme)
      document.documentElement.classList.remove("brutalist-theme", "yellow-theme")
      document.documentElement.classList.add(`${theme}-theme`)
    }
  }, [theme, mounted])

  // Prevent flash of unstyled content
  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
