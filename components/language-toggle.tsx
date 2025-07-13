"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-gray-300 hover:border-gray-900 transition-colors bg-white"
      aria-label={language === "en" ? "Passer en français" : "Switch to English"}
    >
      <span className="text-xs font-bold">{language === "en" ? "FR" : "EN"}</span>
    </button>
  )
}
