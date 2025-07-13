"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function TransitionManager() {
  const pathname = usePathname()

  useEffect(() => {
    // Force scroll to top on page change
    window.scrollTo(0, 0)

    // Clear any transition flags
    sessionStorage.removeItem("isNavigatingFromCard")
    sessionStorage.removeItem("returning-from-project")

    // Remove any transition classes
    document.body.classList.remove("is-transitioning")
    document.body.classList.remove("transitioning")
  }, [pathname])

  return (
    <div className="transition-manager-styles">
      <div className="transition-overlay"></div>
    </div>
  )
}
