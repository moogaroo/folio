"use client"

import { useTheme } from "@/contexts/theme-context"
import { motion } from "framer-motion"
import { Palette } from "lucide-react"
import { useMobileDetector } from "@/components/mobile-detector"
import { usePathname } from "next/navigation"

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const isMobile = useMobileDetector()
  const pathname = usePathname()

  // Check if we're on a project page
  const isProjectPage = pathname?.startsWith("/project/")

  // Don't render the button on mobile project pages
  if (isMobile && isProjectPage) {
    return null
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center`}
      style={{
        backgroundColor: "white",
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#808080",
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "brutalist" ? "yellow" : "brutalist"} theme`}
    >
      <Palette size={24} color="#000000" strokeWidth={2.5} className="drop-shadow-sm" />
    </motion.button>
  )
}
