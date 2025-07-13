"use client"

import { useEffect, useState } from "react"
import FontSwitcher from "./font-switcher"

export default function ClientFontSwitcher() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <FontSwitcher />
}
