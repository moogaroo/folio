"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Type } from "lucide-react"
import { useMobileDetector } from "@/components/mobile-detector"
import { usePathname } from "next/navigation"
import { useFont } from "@/contexts/font-context"

export default function FontSwitcher() {
  // Add state to track if component is mounted
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobileDetector()
  const pathname = usePathname()
  const [fontName, setFontName] = useState("Default")

  // Initialize with default values
  const [currentFontName, setCurrentFontName] = useState("Default")
  const [cycleFunction, setCycleFunction] = useState(() => () => {})

  // Use the font context
  const { currentFont, cycleFont } = useFont()

  // Update the font name and cycle function when the font context changes
  useEffect(() => {
    setCurrentFontName(currentFont?.name || "Default")
    setCycleFunction(() => cycleFont)
  }, [currentFont, cycleFont])

  // Only access context after component is mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted yet, return null or a placeholder
  if (!mounted) return null

  // Check if we're on a project page
  const isProjectPage = pathname?.startsWith("/project/")

  // Always render the desktop version
  const desktopButton = (
    <motion.button
      onClick={cycleFunction}
      className="fixed bottom-6 left-6 z-[9999] w-12 h-12 rounded-full !block relative p-0 m-0"
      style={{
        backgroundColor: "white",
        border: "2px solid #000000",
        position: "fixed",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#F0F0F0",
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch font to ${currentFontName}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Type size={20} color="#000000" strokeWidth={2.5} />
      </div>
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-white px-2 py-1 rounded border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
        {currentFontName}
      </span>
    </motion.button>
  )

  // Return both desktop and mobile buttons
  return (
    <>
      {!isMobile && desktopButton}
      {isMobile && !isProjectPage && (
        <motion.button
          onClick={cycleFunction}
          className="w-12 h-12 rounded-full relative p-0 m-0"
          style={{
            backgroundColor: "white",
            border: "2px solid #000000",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch font to ${currentFontName}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Type size={20} color="#000000" strokeWidth={2.5} />
          </div>
        </motion.button>
      )}
      {isMobile && isProjectPage && (
        <motion.button
          onClick={cycleFunction}
          className="w-12 h-12 rounded-full relative p-0 m-0"
          style={{
            backgroundColor: "white",
            border: "2px solid #000000",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch font to ${currentFontName}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Type size={20} color="#000000" strokeWidth={2.5} />
          </div>
        </motion.button>
      )}
    </>
  )
}
