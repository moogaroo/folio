"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface ProjectCursorProps {
  position: { x: number; y: number }
  project: {
    id: string
    title: string
    logo: string
  }
  direction: "prev" | "next"
  onClick: () => void
  isOverHeader: boolean
}

export default function ProjectCursor({ position, project, direction, onClick, isOverHeader }: ProjectCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOverClickable, setIsOverClickable] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState(position)

  // Smooth cursor position with lerp (linear interpolation)
  useEffect(() => {
    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const smoothCursor = () => {
      setCursorPosition((prev) => ({
        x: lerp(prev.x, position.x, 0.2),
        y: lerp(prev.y, position.y, 0.2),
      }))

      animationFrameId = requestAnimationFrame(smoothCursor)
    }

    animationFrameId = requestAnimationFrame(smoothCursor)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [position])

  useEffect(() => {
    // Show cursor after a short delay to prevent flickering
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Check if hovering over clickable elements
    const handleMouseMove = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element) {
        const isLink =
          element.tagName === "A" || element.tagName === "BUTTON" || element.closest("a") || element.closest("button")
        setIsOverClickable(isLink)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorPosition.x,
          y: cursorPosition.y,
          opacity: isOverClickable || isOverHeader ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <div className="w-8 h-8 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
          {direction === "prev" ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#607D8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 19L5 12L12 5"
                stroke="#607D8B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 5L19 12L12 19"
                stroke="#FF5722"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </motion.div>

      {/* Project info below cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: cursorPosition.x,
          y: cursorPosition.y + 30,
          opacity: isOverClickable || isOverHeader ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <div className="bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-md flex items-center gap-2 transform -translate-x-1/2">
          <span className="text-xs truncate max-w-[100px]">{project.title}</span>
          {project.logo && <img src={project.logo || "/placeholder.svg"} alt="" className="h-4 w-4 object-contain" />}
        </div>
      </motion.div>

      {/* Invisible clickable area that follows cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] w-screen h-screen cursor-none"
        style={{
          opacity: isOverClickable || isOverHeader ? 0 : 1,
          pointerEvents: isOverClickable || isOverHeader ? "none" : "auto",
        }}
        onClick={onClick}
      />
    </>
  )
}
