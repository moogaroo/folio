"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/translations"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("portfolio-language")
    if (savedLanguage === "en" || savedLanguage === "fr") {
      setLanguage(savedLanguage as Language)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-language", language)
      document.documentElement.lang = language
      document.documentElement.classList.remove("en", "fr")
      document.documentElement.classList.add(language)
    }
  }, [language, mounted])

  const t = (key: string) => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
