"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { fontCombinations, type FontCombination } from "@/lib/font-data"

interface FontContextType {
  currentFont: FontCombination
  setCurrentFont: (font: FontCombination) => void
  cycleFont: () => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [currentFont, setCurrentFont] = useState<FontCombination>(fontCombinations[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Try to load saved font preference
    const savedFontId = localStorage.getItem("font-combination")
    if (savedFontId) {
      const savedFont = fontCombinations.find((font) => font.id === savedFontId)
      if (savedFont) {
        setCurrentFont(savedFont)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Save current font preference
      localStorage.setItem("font-combination", currentFont.id)

      // Apply font styles to document with proper fallbacks
      document.documentElement.style.setProperty("--h1-font", `${currentFont.h1}, system-ui, sans-serif`)
      document.documentElement.style.setProperty("--h2-font", `${currentFont.h2}, system-ui, sans-serif`)
      document.documentElement.style.setProperty("--h3-font", `${currentFont.h3}, system-ui, sans-serif`)
      document.documentElement.style.setProperty("--h4-font", `${currentFont.h4}, system-ui, sans-serif`)
      document.documentElement.style.setProperty("--body-font", `${currentFont.body}, system-ui, sans-serif`)
      document.documentElement.style.setProperty("--h1-weight", currentFont.h1Weight)
      document.documentElement.style.setProperty("--h2-weight", currentFont.h2Weight)
      document.documentElement.style.setProperty("--h3-weight", currentFont.h3Weight)
      document.documentElement.style.setProperty("--h4-weight", currentFont.h4Weight)
      document.documentElement.style.setProperty("--body-weight", currentFont.bodyWeight)
      document.documentElement.style.setProperty("--h1-transform", currentFont.h1Transform || "none")
      document.documentElement.style.setProperty("--h2-transform", currentFont.h2Transform || "none")
      document.documentElement.style.setProperty("--h3-transform", currentFont.h3Transform || "none")
      document.documentElement.style.setProperty("--h4-transform", currentFont.h4Transform || "none")
      document.documentElement.style.setProperty("--body-transform", currentFont.bodyTransform || "none")
    }
  }, [currentFont, mounted])

  const cycleFont = () => {
    const currentIndex = fontCombinations.findIndex((font) => font.id === currentFont.id)
    const nextIndex = (currentIndex + 1) % fontCombinations.length
    setCurrentFont(fontCombinations[nextIndex])
  }

  if (!mounted) {
    return <>{children}</>
  }

  return <FontContext.Provider value={{ currentFont, setCurrentFont, cycleFont }}>{children}</FontContext.Provider>
}

export function useFont() {
  const context = useContext(FontContext)
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider")
  }
  return context
}
