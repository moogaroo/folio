"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"

export default function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState("")
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.cursor ||
        target.closest("[data-cursor]")

      if (isClickable) {
        setIsHovering(true)
        // Get custom hover text if available
        const cursorText = target.dataset.cursor || target.closest("[data-cursor]")?.dataset.cursor
        setHoverText(cursorText || "")
      } else {
        setIsHovering(false)
        setHoverText("")
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
      }}
    >
      {/* Base cursor */}
      <div
        className={`w-6 h-6 rounded-full transition-all duration-200 ${
          isHovering
            ? theme === "yellow"
              ? "scale-150 bg-[#F9C657] mix-blend-difference"
              : "scale-150 bg-white mix-blend-difference"
            : theme === "yellow"
              ? "bg-[#444444] opacity-20"
              : "bg-black opacity-20"
        }`}
      ></div>

      {/* Hover text */}
      {isHovering && hoverText && (
        <div
          className="absolute whitespace-nowrap bg-white text-black text-xs py-1 px-2 rounded-md transform translate-y-8"
          style={{
            left: "50%",
            transform: "translateX(-50%) translateY(16px)",
          }}
        >
          {hoverText}
        </div>
      )}
    </div>
  )
}
