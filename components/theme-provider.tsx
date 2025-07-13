"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Define theme types
type Theme = "yellow" | "brutalist"

// Create context
interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage if available, otherwise default to "yellow"
  const [theme, setTheme] = useState<Theme>("yellow")

  useEffect(() => {
    // Get theme from localStorage on client side
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme && (savedTheme === "yellow" || savedTheme === "brutalist")) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Update body class when theme changes
    document.body.classList.remove("yellow-theme", "brutalist-theme")
    document.body.classList.add(`${theme}-theme`)

    // Save theme to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
