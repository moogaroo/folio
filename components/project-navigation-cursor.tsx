"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { projects } from "@/lib/projects-data"
import { useTheme } from "@/contexts/theme-context"
import { X } from "lucide-react"

interface ProjectNavigationCursorProps {
  currentProjectIndex: number
}

export default function ProjectNavigationCursor({ currentProjectIndex }: ProjectNavigationCursorProps) {
  const router = useRouter()
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isOverInteractive, setIsOverInteractive] = useState(false)
  const [isLeftSide, setIsLeftSide] = useState(false)
  const [isMiddle, setIsMiddle] = useState(false)
  const [isRightSide, setIsRightSide] = useState(false)

  // Get previous and next project
  const prevProjectIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : projects.length - 1
  const nextProjectIndex = (currentProjectIndex + 1) % projects.length
  const prevProject = projects[prevProjectIndex]
  const nextProject = projects[nextProjectIndex]

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Determine cursor position zones
      const windowWidth = window.innerWidth
      const leftThreshold = windowWidth * 0.3
      const rightThreshold = windowWidth * 0.7

      setIsLeftSide(e.clientX < leftThreshold)
      setIsMiddle(e.clientX >= leftThreshold && e.clientX <= rightThreshold)
      setIsRightSide(e.clientX > rightThreshold)

      // Check if cursor is over interactive elements
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element) {
        const isInteractive =
          element.tagName === "A" ||
          element.tagName === "BUTTON" ||
          element.closest("a") ||
          element.closest("button") ||
          element.closest(".carousel-item") ||
          element.closest(".image-carousel-container") ||
          element.closest("input") ||
          element.closest("textarea") ||
          element.closest("select") ||
          element.closest("[role='button']") ||
          element.closest(".interactive")

        setIsOverInteractive(isInteractive)
      }
    }

    // Smooth cursor movement with lerp (linear interpolation)
    const animateCursor = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.2,
        y: prev.y + (mousePosition.y - prev.y) * 0.2,
      }))
      requestAnimationFrame(animateCursor)
    }

    const animationId = requestAnimationFrame(animateCursor)
    window.addEventListener("mousemove", handleMouseMove)

    // Show cursor after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
      clearTimeout(timer)
    }
  }, [])

  // Handle navigation
  const handleNavigation = () => {
    if (isLeftSide) {
      router.push(`/project/${prevProject.id}`)
    } else if (isRightSide) {
      router.push(`/project/${nextProject.id}`)
    } else if (isMiddle) {
      router.push("/")
    }
  }

  // Don't render on mobile or when over interactive elements
  if ((typeof window !== "undefined" && window.innerWidth < 768) || isOverInteractive || !isVisible) {
    return null
  }

  return (
    <>
      {/* Custom cursor */}
      <div
        className="custom-project-cursor"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {isLeftSide && (
          <div className={`cursor-content cursor-prev ${theme === "brutalist" ? "brutalist" : "yellow"}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 12H5"
                stroke={theme === "brutalist" ? "#000000" : "#FFFCD2"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke={theme === "brutalist" ? "#000000" : "#FFFCD2"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="cursor-project-title">{prevProject.title}</span>
          </div>
        )}

        {isMiddle && (
          <div className={`cursor-content cursor-home ${theme === "brutalist" ? "brutalist" : "yellow"}`}>
            <X size={20} color={theme === "brutalist" ? "#000000" : "#FFFCD2"} />
            <span className="cursor-project-title">Home</span>
          </div>
        )}

        {isRightSide && (
          <div className={`cursor-content cursor-next ${theme === "brutalist" ? "brutalist" : "yellow"}`}>
            <span className="cursor-project-title">{nextProject.title}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12H19"
                stroke={theme === "brutalist" ? "#000000" : "#FFFCD2"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5L19 12L12 19"
                stroke={theme === "brutalist" ? "#000000" : "#FFFCD2"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Invisible overlay for click handling */}
      <div className="cursor-click-overlay" onClick={handleNavigation} />
    </>
  )
}
