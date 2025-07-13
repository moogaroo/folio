"use client"

import { useEffect, useState } from "react"
import LanguageToggle from "./language-toggle"

export default function ClientLanguageSwitcher() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-gray-300"></div>
  }

  return <LanguageToggle />
}
