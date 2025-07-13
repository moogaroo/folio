"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Language = "en" | "fr"

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("en")
  const router = useRouter()

  useEffect(() => {
    // Check if language is stored in localStorage
    const savedLanguage = localStorage.getItem("portfolio-language") as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
      document.documentElement.lang = savedLanguage
      document.documentElement.classList.toggle("fr", savedLanguage === "fr")
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "fr" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("portfolio-language", newLanguage)
    document.documentElement.lang = newLanguage
    document.documentElement.classList.toggle("fr", newLanguage === "fr")
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:opacity-50 transition-opacity"
      aria-label={language === "en" ? "Switch to French" : "Switch to English"}
    >
      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
        {language === "en" ? (
          <div className="w-full h-full bg-blue-900 flex items-center justify-center text-[8px] text-white">FR</div>
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center text-[8px] text-blue-900">EN</div>
        )}
      </div>
    </button>
  )
}
